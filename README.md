# WASM and JS interop

This project consists of 2 projects
- Rust library with a single method
- Static html site (no bundlers)


## Generating the wasm package.

If you update the rust code, you need to re-generate the package and copy the files to the web-app folder:

Build with:

```
wasm-pack build --target no-modules 
```

`no-modules` is important because we'll also use the wasm code in a Web Worker (and currently there's no good support for ES Modules inside web workers)

