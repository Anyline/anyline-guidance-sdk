### Developing locally

1. Clone the repo
2. Run `yarn` followed by `yarn dev` (uses esbuild.dev.config.js)
3. This will start a local server running on http://localhost:8000
4. Update code, go to http://localhost:8000 to see the changes, hot-reload is not supported on index.html at the moment, so you will have to manually refresh the page after every change

### Build process

1. When you run `yarn build` (uses esbuild.config.js), it generates 3 files for 3 different integration environments
   i. esm (for ESM)
   ii. cjs (for commonjs)
   iii. iife (for direct script tag inclusions)

### Installing and running the SDK

1. For ESM:
   You can import the SDK using `import init from 'user-guidance-app'` and call `init()` function from within your code whenever you want to start the SDK

2. For CJS:
   Import the SDK using `const init = require('user-guidance-app')` and call `init()` function from within your code whenever you want to start the SDK

3. For direction script tag inclusions:
   Include the SDK using `<script src="dist/iife/index.js"></script>` and call `Anyline.init()` function from within your code whenever you want to start the SDK

### SDK return types

The SDK will resolve or reject a promise as its return type. If everything goes well, it will resolve to a Blob containing the image that was captured. If there was en error, it will reject an error specifying the type of error.
