# Changelog

## [2.0.1] - 06-09-2024

-   (fix): skip pre-processing step if opencv did not load

## [2.0.0] - 10-06-2024

-   (feat): `init` is now initialised with config and callbacks to retrieve image blob
-   (feat): add `onComplete` and `onPreProcessingChecksFailed` callbacks
-   (refactor): `init` no longer returns a promise
-   (refactor): sdk no longer returns image `metadata`

## [1.5.1] - 11-06-2024

-   (chore): load demo gif asynchronously before init is called
-   (chore): reduce demo gif size
-   (fix): race condition when environment loads its own opencv

## [1.5.0] - 05-06-2024

-   (feat): pre-process image for quality check using opencv before resolving `init` promise
-   (feat): add gif in onboarding instructions screen which shows how to use the sdk
-   (chore): onboarding instructions screen is now full screen
-   (chore): split code to reduce sdk size for esm environments
-   (chore): update tire overlay image
-   (chore): update back icon image

## [1.4.0] - 15-05-2024

-   (feat): add onboarding instructions to describe how to take better tire picture
-   (feat): make sdk configurable for the number of times onboarding instructions are shown
-   (chore): add routing mechanism to help navigate within sdk screens
-   (chore): explicitly initiate stream with aspect ratio of 4/3
-   (fix): stream is zoomed in after user cancels taking picture from native camera

## [1.3.01] - 02-05-2024

-   (feat): first public release

## [1.2.31] - 30-04-2024

-   (feat): add background overlay outside the tire section
-   (chore): remove top and bottom border shadow around the video stream

## [1.2.3] - 28-04-2024

-   (feat): remove need to additionally import css when importing sdk

## [1.0.23] - 22-04-2024

-   (feat): sdk switches to native camera upon "Capture" button click on non desktop environments

## [1.0.19] - 22-04-2024

-   (feat): Update return type of `init()` to include image `metadata`(`width`(px), `height`(px), `fileSize`(kb)). With this new change, the usage of `init()` changes to:
    -   `const { blob, metadata } = init()`
    -   No default return type of `blob`
-   (fix): Longer processing time of "Capture" action on low-mid range devices.
-   (chore): Video is no more full screen. This ensures we crop as less stream as possible from the final image.
