# Anyline Guidance SDK

Anyline guidance sdk to retrieve high resolution image from a video stream with tire overlay that helps to point accurately to the tire.

See [Migrating from v1 to v2](#migrating-from-v1-to-v2)

## Installation

```shell
npm install @anyline/anyline-guidance-sdk
```

### SDK Config and Callbacks

```js
import init from '@anyline/anyline-guidance-sdk';
// ...
// call init when you want to start the sdk
init(config, callbacks);
```

#### 1. `config` (**required**)

The `config` value is used to apply developer specific settings to the SDK.
Currently, `config` can be used to control the number of times onboarding instructions are shown.
For example:

```js
const config = { 
  onboardingInstructions: { 
    timesShown: 3, 
  },
};
```

In this example, onboarding instructions will be shown for a total of 3 times, after which the onboarding instructions will be skipped and sdk will start directly at the Video Stream screen.

> **_NOTE:_** `timesShown` is stored in the localStorage. Clearing the localStorage will reset the setting.

If you wish to show the onboarding instructions everytime the sdk is initialised, set `config` like so

```js
const config = {};
```

#### 2. `callbacks` (**required**)

The `callbacks` object consists of two functions: `onComplete` and `onPreProcessingChecksFailed`

-   `onComplete` (**required**) is called once the SDK has finished processing the image.
-   `onPreProcessingChecksFailed` (**optional**) is called when the image captured by an end-user has failed to pass image quality checks. The user has the option to either proceed with the image or take a new picture.
    Example:

```js
const callbacks = { 
  onComplete: ({ blob }) => {
    // final returned image
  }, 
  onPreProcessingChecksFailed: ({ blob, message }) => {
    // intermediate image
  },
};
```

---

### Migrating from v1 to v2

#### Key changes
1. Initialisation
  - v1: `init` called with a single `config` object and returned a promise
  - v2: `init` called with two arguments: `config` and `callbacks` and no longer returns a promise (use `callbacks` to retrieve blob).
2. Config
  - v1: can be empty
  - v2: for empty config use `{}`
3. Callbacks (v2 only)
  - `onComplete` **required**
  - `onPreProcessingChecksFailed` **optional**

#### Example
v1:
```ts
const { blob } = await init({
  onboardingInstructions: {
    timesShown: 3
  }
})
```

v2:
```ts
const config = {
  onboardingInstructions: {
    timesShown: 3
  }
};
const callbacks = {
  onComplete: ({ blob }) => {
    // ...
  }
}
init(config, callbacks)
```

See [SDK Config and Callbacks](#sdk-config-and-callbacks) for detailed implementation about `config` and `callbacks`.

---

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
