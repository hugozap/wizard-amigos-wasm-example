//Because we are not using ES6 modules, we need to use the global wasm_bindgen variable
console.log("wasm_bindgen", { wasm_bindgen });
const { greet, factorial, add_effect, Wizard, Spell } = wasm_bindgen;
const loadedWasmResponse = await fetch("./rust_wasm_js_interop_bg.wasm");
await wasm_bindgen(loadedWasmResponse);

document.querySelector("#btnProcess").addEventListener("click", () => {
  const num = document.querySelector("#inputNumber").value;
  //Sync
  const result = factorial(num);
  console.log("result", result);
  document.querySelector("#result").innerText = result;
});

//when clicking button load image bytes
document.querySelector("#btnLoadImage").addEventListener("click", () => {
  console.log("will load image");

  //show original image
  document.querySelector("#originalImage").src = URL.createObjectURL(
    document.querySelector("#inputImage").files[0]
  );
  //create Image from input file
  const image = new Image();
  image.src = URL.createObjectURL(
    document.querySelector("#inputImage").files[0]
  );
  image.onload = () => {
    addEffectToImage(image);
  };
});

function addEffectToImage(image) {
  //create canvas
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0);

  //get image data
  const imageData = ctx.getImageData(0, 0, image.width, image.height);

  console.log("will apply effect");
  //load image bytes

  const result = add_effect(imageData.data, image.width, image.height);
  console.log("result", result);
  //create new image data from result
  const newImageData = new ImageData(
    Uint8ClampedArray.from(result),
    image.width,
    image.height
  );
  //draw new image data
  ctx.putImageData(newImageData, 0, 0);
  //show image
  document.querySelector("#resultImage").src = canvas.toDataURL();
}

const wizard = new Wizard("Merlin");

document.querySelector("#btnCastSpell").addEventListener("click", () => {
  wizard.cast_spell();
  const spells = wizard.get_spells();
  console.log("spells", spells);

  document.querySelector("#resultSpells").innerText = spells;
});
