console.log("main.js Initialised");
import {shaders, simulationShader, WORKGROUP_SIZE} from './shader.js'

const GRID_SIZE = Math.floor(1024 * 5.6);
const UPDATE_INTERVAL = 33;
let step = 0;

async function init() {
    if (!navigator.gpu) {
        throw Error("WebGPU not supported");
    }

    const adapter = await navigator.gpu.requestAdapter()
    if (!adapter) {
        throw new Error("Couldn't req WebGPU adaptor");
    }

    // Get Device
    const device = await adapter.requestDevice()

    //Initialise Canvas
    const canvas = document.createElement("canvas");
    canvas.id = "mainCanvas";
    canvas.width = 8192
    canvas.height = 8192
    document.getElementById("CanvasContainer").appendChild(canvas);

    const context = canvas.getContext("webgpu");
    const canvasFormat = navigator.gpu.getPreferredCanvasFormat();
    context.configure({
        device: device,
        format: canvasFormat,
    })

    // Define vertices
    const vertices = new Float32Array([
    //   X,    Y,
        -1, -1, // Triangle 1 (Blue)
        1, -1,
        1,  1,
    
        -1, -1, // Triangle 2 (Red)
        1,  1,
        -1,  1,
    ])

    const vertexBufferLayout = {
        arrayStride: 8, // Each vertex of the square is two 32-bit floats, therefore 2 4 bytes are 8 bytes
        attributes: [{
            format: "float32x2",
            offset: 0,
            shaderLocation: 0, // Position, see vertex shader
        }]
    }

    // A buffer to hold the vertices
    const vertexBuffer = device.createBuffer({
        label: "Cell vertices",
        size: vertices.byteLength,
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    })

    // Now we can copy the vertex dawta into the buffer's memory
    device.queue.writeBuffer(vertexBuffer, /*bufferOffset=*/0, vertices)

    // Create a uniform buffer that describes the grid.
    const uniformArray = new Float32Array([GRID_SIZE, GRID_SIZE]);
    const uniformBuffer = device.createBuffer({
        label: "Grid Uniforms",
        size: uniformArray.byteLength,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    })
    device.queue.writeBuffer(uniformBuffer, /*bufferOffset=*/0, uniformArray)

    // Create an array representing the active state of each cell
    const cellStateArray = new Uint32Array(GRID_SIZE * GRID_SIZE)
    
    //Create a storage buffer to hold the cell state.
    const cellStateStorage = [
        device.createBuffer({
            label: "Cell State A",
            size: cellStateArray.byteLength,
            usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
        }),
        device.createBuffer({
            label: "Cell State B",
            size: cellStateArray.byteLength,
            usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
        })
    ]

    // Mark every other cell of the second grid as active.
    for (let i = 0; i < cellStateArray.length; i++) {
        cellStateArray[i] = Math.random() > 0.6 ? 1 : 0;
    }
    device.queue.writeBuffer(cellStateStorage[0], 0, cellStateArray);

    //Get Shaders
    const cellShaderModule = device.createShaderModule({
        label: "Cell shader",
        code: shaders, // Vertex shader
    })

    const simulationShaderModule = device.createShaderModule({
        label: "Game of Life simulation shader",
        code: simulationShader,
    })


	const bindGroupLayout = device.createBindGroupLayout({
		label: "Cell Bind Group Layout",
		entries: [{
			binding: 0,
			// Add GPUShaderStage.FRAGMENT here if you are using the `grid` uniform in the fragment shader.
			visibility: GPUShaderStage.VERTEX | GPUShaderStage.COMPUTE | GPUShaderStage.FRAGMENT,
			buffer:{} ,// GRID uniform buffer
		},{
			binding: 1,
			visibility: GPUShaderStage.VERTEX | GPUShaderStage.COMPUTE,
			buffer:{ type: "read-only-storage"} ,// Cell state input buffer
		},{
			binding: 2,
			visibility: GPUShaderStage.COMPUTE,
			buffer:{ type: "storage" } ,// Cell state input buffer
		}]
	})

	const pipelineLayout = device.createPipelineLayout({
		label: "Cell Pipeline Layout",
		bindGroupLayouts: [ bindGroupLayout ],
	})

    const cellPipeline = device.createRenderPipeline({
        label: "Cell pipeline",
        layout: pipelineLayout,
        vertex: {
            module: cellShaderModule,
            entryPoint: "vertexMain",
            buffers: [vertexBufferLayout]
        },
        fragment: {
            module: cellShaderModule,
            entryPoint: "fragmentMain",
            targets: [{
                format: canvasFormat
            }]
        }
    })

	const simulationPipeline = device.createComputePipeline({
		label: "Simulation Pipeline",
		layout: pipelineLayout,
		compute: {
			module: simulationShaderModule,
			entryPoint: "computeMain",
		}
	})


    const bindGroups = [
        device.createBindGroup({
            label: "Cell renderer bind group A",
            layout: bindGroupLayout,
            entries: [{
                binding: 0,
                resource: { buffer: uniformBuffer }
            },
            {
                binding: 1,
                resource: { buffer: cellStateStorage[0] }
            },
            {
                binding: 2,
                resource: { buffer: cellStateStorage[1] }
            }]
        }),
        device.createBindGroup({
            label: "Cell renderer bind group B",
            layout: bindGroupLayout,
            entries: [{
                binding: 0,
                resource: { buffer: uniformBuffer }
            },
            {
                binding: 1,
                resource: { buffer: cellStateStorage[1] }
            },
            {
                binding: 2,
                resource: { buffer: cellStateStorage[0] }
            }]
        }),
    ]

    function updateGrid() {

        // Show an encode for recording GPU commands
        const encoder = device.createCommandEncoder();

		const computePass = encoder.beginComputePass();

		computePass.setPipeline(simulationPipeline);
		computePass.setBindGroup(0, bindGroups[step % 2]);

		const workgroupCount = Math.ceil(GRID_SIZE / WORKGROUP_SIZE);
		computePass.dispatchWorkgroups(workgroupCount, workgroupCount);

		computePass.end();

        step++;

        const pass = encoder.beginRenderPass({
            colorAttachments: [{
                view: context.getCurrentTexture().createView(),
                loadOp: "clear",
                clearValue: [ 0, 0, 0, 1 ], // New line
                storeOp: "store"
            }]
        })

        //Draw the group
        pass.setPipeline(cellPipeline);
        pass.setBindGroup(0, bindGroups[step%2]);
        pass.setVertexBuffer(0, vertexBuffer)
        pass.draw(vertices.length / 2, GRID_SIZE * GRID_SIZE);; // 6 vertices

        //End the render pass
        pass.end();
        // The commandBuffer is 'encoder.finish()', immediately sumbit it after finishing the command buffer
        device.queue.submit([encoder.finish()])
    }

    setInterval(updateGrid, UPDATE_INTERVAL);

}

init()