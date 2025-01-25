// Inform the shader on the workgroup size
export const WORKGROUP_SIZE = 8;

export const shaders = /* wgsl */ `

  struct VertexInput {
    @location(0) pos: vec2f,
    @builtin(instance_index) instance: u32,
  }

  struct VertexOutput {
    @builtin(position) pos: vec4f,
    @location(0) cell: vec2f,
  }

  @group(0) @binding(0) var<uniform> grid: vec2f;
  @group(0) @binding(1) var<storage> cellState: array<u32>;

  @vertex
  fn vertexMain(input: VertexInput) -> VertexOutput {
    let i = f32(input.instance); // Save the instance)index as a float
    let cell = vec2f(i % grid.x, floor(i / grid.y)); // Last grid.y might need to be grid.x, but i dont see how that makes sense...
    let state = f32(cellState[input.instance]);

    let cellOffset = cell / grid * 2;
    // Add 1 ti tge position before dividing by the grid size
    // Scale the position by the cell's active state, if state is 0, the gpu will discard it as it falls in a single point
    let gridPos = (input.pos*state + 1) / grid - 1 + cellOffset;
    
    var output: VertexOutput;
    output.pos = vec4f(gridPos, 0, 1);
    output.cell = cell;
    return output; // (X, Y, Z, W) The W if so that matrix multiplication can work
  }

  struct FragInput {
    @location(0) cell: vec2f,
  }

  @fragment
  fn fragmentMain(input: FragInput) -> @location(0) vec4f {
    let c = input.cell / grid;
    // Basically returns a colour for every pixel
    return vec4f(c.x, c.y, 1 - c.x, 1); // (r, g, b, a)
    // return vec4f(1, 0, 0, 1);
  }
`;

export const simulationShader = /* wgsl */ `
  @group(0) @binding(0) var<uniform> grid: vec2f;
  @group(0) @binding(1) var<storage> cellStateIn: array<u32>;
  @group(0) @binding(2) var<storage, read_write> cellStateOut: array<u32>;

  fn cellIndex(cell: vec2u) -> u32 {
    return (cell.y % u32(grid.y)) * u32(grid.x) +
           (cell.x % u32(grid.x));
  }

  fn cellActive(x: u32, y: u32) -> u32 {
    return cellStateIn[cellIndex(vec2(x, y))];
  }

  struct ComputeInput {
    @builtin(global_invocation_id) cell: vec3u
  }

  @compute @workgroup_size(${WORKGROUP_SIZE}, ${WORKGROUP_SIZE})
  fn computeMain(input: ComputeInput) {
    let activeNeighbors = cellActive(input.cell.x+1, input.cell.y+1) +
                cellActive(input.cell.x+1, input.cell.y) +
                cellActive(input.cell.x+1, input.cell.y-1) +
                cellActive(input.cell.x, input.cell.y-1) +
                cellActive(input.cell.x-1, input.cell.y-1) +
                cellActive(input.cell.x-1, input.cell.y) +
                cellActive(input.cell.x-1, input.cell.y+1) +
                cellActive(input.cell.x, input.cell.y+1);
    let i = cellIndex(input.cell.xy);

  // Conway's game of life rules:
  switch activeNeighbors {
    case 2: { // Active cells with 2 neighbors stay active.
      cellStateOut[i] = cellStateIn[i];
    }
    case 3: { // Cells with 3 neighbors become or stay active.
      cellStateOut[i] = 1;
    }
    default: { // Cells with < 2 or > 3 neighbors become inactive.
      cellStateOut[i] = 0;
    }
  }
  }
`;
