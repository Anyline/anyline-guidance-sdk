# Changelog

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
