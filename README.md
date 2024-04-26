# Anyline Guidance SDK

Anyline guidance sdk to retrieve high resolution image from a video stream with tire overlay that helps to point accurately to the tire.

## Installation

```shell
npm install @anyline/anyline-guidance-sdk
```

The next step varies based on which environment you are working on.

### ESM

```js
import init from '@anyline/anyline-guidance-sdk';
```

Call the `init()` (refer [Code Example](#code-example)) function whenever you'd want the sdk to start.

### Direction script tag inclusions

Refer [index.html](./public/index.html) for demo implementation.

```js
<script src="anyline-guidance-sdk.js"></script>
```

You can get `anyline-guidance-sdk.js` files in the following ways:

By [installing the package](https://github.com/Anyline/anyline-guidance-sdk) and copying `index.js` from `dist/iife/` folder into your project.

(OR)

You can also build the sdk by yourself and copy `index.js` from `dist/iife` folder (refer [To Build](#to-build) section).

[//]: # "Call `Anyline.default()` function from within your code whenever you'd want the sdk to start."

### Code Example

```js
const { blob, metadata } = await init();
```

### SDK return types

The SDK will resolve or reject a promise as its return type. If everything goes well, it will resolve to a Blob containing the image that was captured. If there was en error, it will reject an error specifying the type of error.

## Developers / Contributors

### To start

-   Make sure you are using the correct node version by running `nvm use`
-   If you don't have the required node version, install the required node version by running `nvm install`
-   (skip if the previous step is done) If you don't have nvm installed, install nvm (on MacOS) via `brew install nvm`
-   install yarn `npm install -g yarn`
-   run `yarn` to install the project dependencies

### To Build

-   run `yarn build` (uses esbuild.config.js), it generates 3 files for 3 different integration environments
    -   ESM (for ESM)
    -   CJS (for commonJS)
    -   IIFE (for direct script tag inclusions)

### To Try

-   run `yarn dev` (uses [esbuild.demo.config.js](./esbuild.demo.config.js))

This will build [public/index.html](public/index.html) and serve [public/index.html](public/index.html)
in a local server running on http://localhost:8000.

```text
  Hot-reload is not supported on "index.html" at the moment, so you will have to manually refresh the page after every change.
```
