# WASM and JS interop

This project consists of 2 projects
- Rust library
- Static html site (no bundlers)

# Concepts

- Call a Rust function and use result from Js
- Manipulate an image (loaded from input file and sent to wasm)



## Generating the wasm package.

If you update the rust code, you need to re-generate the package and copy the files to the web-app folder:

Build with:

```
wasm-pack build --target no-modules 
```

`no-modules` is important because we'll also use the wasm code in a Web Worker (and currently there's no good support for ES Modules inside web workers)

Note: Because we are not using any bundler, you'll have to copy the files inside the pkg folder to the `web-app` folder in order to update the web site with the latest wasm code and wrappers.