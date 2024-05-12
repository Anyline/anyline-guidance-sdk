# Changelog

## [1.4.0] - 12-05-2024

-   (feat): add onboarding instructions to describe how to take better tire picture
-   (chore): add routing mechanism
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
