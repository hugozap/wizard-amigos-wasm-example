//Because we are not using ES6 modules, we need to use the global wasm_bindgen variable
const {greet} = wasm_bindgen;
const wasm = await fetch('./rust_wasm_js_interop_bg.wasm');
await wasm_bindgen(wasm);

document.querySelector('#btnGreet').addEventListener('click', () => {
  const name = document.querySelector('#inputName').value;
  //Sync
  const result = greet(name || 'Folks');
  console.log('result', result);
  document.querySelector('#resultGreet').innerText = result;
});

