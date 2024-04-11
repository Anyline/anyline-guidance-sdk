# Anyline User Guidance App

Anyline guidance sdk to retrieve high resolution image from a video stream with tire overlay that helps to point accurately to the tire.

## Usage

```js
const blob = await init();
```

## Installation


```shell
yarn add @anyline/anyline-guidance
```


## Usage

1. For ESM:
   - Import the sdk using `import init from '@anyline/anyline-guidance'` 
   - Import required css `import '@anyline/anyline-guidance/index.css'`
   - Call the `init()` function whenever you'd want the sdk to start.

2. For CJS:
   Same as ESM

WIP: Provide CDN for IIFE
3. For direction script tag inclusions:
   - Include the SDK using `<script src="node_modules/@anyline/anyline-guidance/dist/iife/index.js"></script>` 
   - Include the css in style tag using `<link rel="stylesheet" href="node_modules/@anyline/anyline-guidance/dist/iife/index.css">`
   - Call `Anyline.default()` function from within your code whenever you'd want the sdk to start.

### SDK return types

The SDK will resolve or reject a promise as its return type. If everything goes well, it will resolve to a Blob containing the image that was captured. If there was en error, it will reject an error specifying the type of error.


## Demo
Run `yarn` followed by `yarn dev` (uses [esbuild.demo.config.js](./esbuild.dev.config.js)).  
This will build [demo/index.html](public/index.html) and serve [public/index.html](public/index.html) in a local server running on http://localhost:8000.  
Hot-reload is not supported on index.html at the moment, so you will have to manually refresh the page after every change.


### Build process

1. When you run `yarn build` (uses esbuild.config.js), it generates 3 files for 3 different integration environments
   i. esm (for ESM)
   ii. cjs (for commonjs)
   iii. iife (for direct script tag inclusions)
