//import script from webworker
//important: the wasm package was generated with target no-modules
//so it can be loaded in a WebWorker (Firefox doesn't support ES modules in web workers)
importScripts("./rust_wasm_js_interop.js");

(async function () {
  let wasm = fetch("/rust_wasm_js_interop_bg.wasm");
  await wasm_bindgen(wasm);
  const { factorial } = wasm_bindgen;

  // listen for messages from the main thread
  self.addEventListener("message", (event) => {
    console.log("Message received from main thread" + event.data);
    const result = factorial(event.data);
    postMessage(result);
  });
})();
