# WASM and JS interop

This project consists of 2 projects
- Rust library `src/lib.rs`
- Static html site (no bundlers) `web-app`

## Examples

- Calculate a number factorial in rust
- Same operation but in a Web Worker
- Load an image and apply a blur filter (using Rust photon library)

## Running the app

- Start an http server from the `web-app` with `npm run start`


## Generating the wasm package and updating the webapp

If you update the rust code, you need to re-generate the package and copy the files to the web-app folder:

Build with:

```
wasm-pack build --target no-modules 
```

`no-modules` is important because we'll also use the wasm code in a Web Worker (and currently there's no good support for ES Modules inside web workers)

Note: Because we are not using any bundler, you'll have to copy the files inside the pkg folder to the `web-app` folder in order to update the web site with the latest wasm code and wrappers.