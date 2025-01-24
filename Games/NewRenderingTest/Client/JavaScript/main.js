console.log("main.js Initialised");

console.log(navigator.requestAdaptor);
async function init() {
    if (!navigator.gpu) {
        throw Error("WebGPU not supported");
    }

    const adapter = await navigator.gpu.requestAdaptor()
    if (!adapter) {
        throw new Error("Couldn't req WebGPU adaptor");
    }

    //Initialise Canvas
    const canvas = document.createElement("canvas");
    canvas.id = "mainCanvas"
    canvas.parentElement = document.getElementById("CanvasContainer")

    //Get context
    const context = canvas.getContext("webgpu")

    // Get Device
    const device = await adapter.requestDevice()
    
    context.configure({
        device: device,
        format: navigator.gpu.getPreferredCanvasFormat(),
        alphaMode: "premultiplied",
    });

}

init()