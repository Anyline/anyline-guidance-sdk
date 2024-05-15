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
// blob represents the image captured by SDK in Blob format
blob: Blob
// other metadata related to image viz. width, height and fileSize
metadata: {
  width: number,
  height: number,
  fileSize: number,
}
```

### SDK Config

By default, we show onboarding instructions screen everytime the SDK opens, this informs users how to capture a better tire image. You can configure this setting to limit the number of times this onboarding instructions screen is shown.

To achieve this, call sdk `init` method like so:

```js
const { blob } = init({
  onboardingInstructions: {
    timesShown: 3
  }
})
```
where `3` is the number of times you'd want to show the onboarding instructions screen everytime a user opens the SDK. When they open the SDK for the 4th time, they will not see the onboarding instructions screen and will be taken directly to the video stream screen.

This feature comes in handy when we assume that after the user has seen onboarding instruction for a certain number of times, they understand the instructions already and thus do not need to read it again. 

If you do not want to show the instructions at all, you can set `timesShown` to `0`.

Note: This config works by storing a variable in `localStorage`. If you have a functionality within your website/web app that clears the `localStorage`, then this configuration will not be enforced and the onboarding instructions will be shown everytime regardless of what you set `timesShown` to.

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
