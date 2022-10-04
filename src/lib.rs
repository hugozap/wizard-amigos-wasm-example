use wasm_bindgen::prelude::*;
//use photon_rs
use photon_rs::transform::fliph;
use photon_rs::PhotonImage;
use photon_rs::to_raw_pixels;
use photon_rs::effects::color_vertical_strips;
use photon_rs::conv::gaussian_blur;
use photon_rs::Rgb;
mod wizard;

#[wasm_bindgen]
pub fn greet(name: &str) -> String {
    return format!("Hello, {}!", name);
}

// Return the factorial of the given number
#[wasm_bindgen]
pub fn factorial(n: f64) -> f64 {
    if n == 0. {
        1.
    } else {
        n * factorial(n - 1.0)
    }
}

//wasm function that rotates image 90 degrees using photon_rs
#[wasm_bindgen]
pub fn add_effect(mut image:&[u8], width:u32, height: u32) -> Vec<u8> {
    
    println!("width: {}", width);
    println!("height: {}", height);

    //create Vec<u8> from &[u8]
    let imgBuffer: Vec<u8> = Vec::from(image);
    let mut img = PhotonImage::new(imgBuffer, width, height);
    //color_vertical_strips(&mut img, 8u8, color);
    gaussian_blur(&mut img, 5);
    //return the image buffer
    img.get_raw_pixels()
}
//Run after initialization
#[wasm_bindgen(start)]
pub fn main() -> Result<(), JsValue> {

    //improve debugging
    console_error_panic_hook::set_once();
    Ok(())
}