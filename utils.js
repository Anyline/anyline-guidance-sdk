const COLORS = {
  BLUE: "#0099FF",
};
const FPS = 30;
const BLUR_THRESHOLD = 100; // change this after input from others
const OVERLAY_DIMENSIONS = {
  WIDTH: 0.8,
  HEIGHT: 0.6,
};
const OVERLAY_OPACITY = 0.7;

function Utils(errorOutputId) {
  let self = this;
  this.errorOutput = document.getElementById(errorOutputId);
  const OPENCV_URL = "opencv.js";
  this.loadOpenCv = function (onloadCallback) {
    let script = document.createElement("script");
    script.setAttribute("async", "");
    script.setAttribute("type", "text/javascript");
    script.addEventListener("load", async () => {
      if (cv.getBuildInformation) {
        onloadCallback();
      } else {
        if (cv instanceof Promise) {
          cv = await cv;
          onloadCallback();
        } else {
          cv["onRuntimeInitialized"] = () => {
            onloadCallback();
          };
        }
      }
    });
    script.addEventListener("error", () => {
      self.printError("Failed to load " + OPENCV_URL);
    });
    script.src = OPENCV_URL;
    let node = document.getElementsByTagName("script")[0];
    node.parentNode.insertBefore(script, node);
  };
  this.clearError = function () {
    this.errorOutput.innerHTML = "";
  };
  this.printError = function (err) {
    if (typeof err === "undefined") {
      err = "";
    } else if (typeof err === "number") {
      if (!isNaN(err)) {
        if (typeof cv !== "undefined") {
          err = "Exception: " + cv.exceptionFromPtr(err).msg;
        }
      }
    } else if (typeof err === "string") {
      let ptr = Number(err.split(" ")[0]);
      if (!isNaN(ptr)) {
        if (typeof cv !== "undefined") {
          err = "Exception: " + cv.exceptionFromPtr(ptr).msg;
        }
      }
    } else if (err instanceof Error) {
      err = err.stack.replace(/\n/g, "<br>");
    }
    this.errorOutput.innerHTML = err;
  };
  function onVideoCanPlay() {
    if (self.onCameraStartedCallback) {
      self.onCameraStartedCallback(self.stream, self.video);
    }
  }
  this.startCamera = function (resolution, callback, videoId) {
    const constraints = {
      qvga: { width: { exact: 320 }, height: { exact: 240 } },
      vga: { width: { exact: 640 }, height: { exact: 480 } },
    };
    let video = document.getElementById(videoId);
    if (!video) {
      video = document.createElement("video");
    }
    let videoConstraint = constraints[resolution];
    if (!videoConstraint) {
      videoConstraint = true;
    }
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraint, audio: false })
      .then(function (stream) {
        video.srcObject = stream;
        video.play();
        self.video = video;
        self.stream = stream;
        self.onCameraStartedCallback = callback;
        video.addEventListener("canplay", onVideoCanPlay, false);
      })
      .catch(function (err) {
        self.printError("Camera Error: " + err.name + " " + err.message);
      });
  };
  this.stopCamera = function () {
    if (this.video) {
      this.video.pause();
      this.video.srcObject = null;
      this.video.removeEventListener("canplay", onVideoCanPlay);
    }
    if (this.stream) {
      this.stream.getVideoTracks()[0].stop();
    }
  };
  this.processVideo = function (
    src,
    dst,
    cap,
    cv,
    canvasOutput,
    canvasContext
  ) {
    try {
      if (!streaming) {
        // clean and stop.
        src.delete();
        dst.delete();
        return;
      }

      let begin = Date.now();
      // start processing.
      cap.read(src);
      cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY); // convert to grayscale for variance computation

      let laplace = new cv.Mat();
      cv.Laplacian(dst, laplace, cv.CV_8U);
      let varianceLap = this.computeVariance(cv, laplace); // compute variance on the Laplacian map
      laplace.delete();

      cv.cvtColor(src, dst, cv.COLOR_RGBA2RGB); // convert back to rgb
      cv.imshow("canvasOutput", dst);
      this.drawOverLay(canvasOutput, canvasContext); // add an overlay on the output

      // check for blurriness using variance on Laplacian map
      if (varianceLap < BLUR_THRESHOLD) {
        this.displayMessageOnCanvas(
          canvasContext,
          canvasOutput,
          "Blur detected"
        );
      }

      // schedule next frame
      let delay = 1000 / FPS - (Date.now() - begin);
      setTimeout(() => {
        this.processVideo(src, dst, cap, cv, canvasOutput, canvasContext);
      }, delay);
    } catch (err) {
      this.printError(err);
    }
  };

  this.computeVariance = function (cv, mat) {
    let mean = new cv.Mat();
    let stdDev = new cv.Mat();
    cv.meanStdDev(mat, mean, stdDev);
    let variance = Math.pow(stdDev.data64F[0], 2);
    mean.delete();
    stdDev.delete();
    return variance;
  };

  this.displayMessageOnCanvas = function (
    canvasContext,
    canvasOutput,
    message
  ) {
    canvasContext.font = "16px Arial";
    canvasContext.fillStyle = "white";

    const textWidth = canvasContext.measureText(message).width;
    const x = (canvasOutput.width - textWidth) / 2;
    const y = canvasOutput.height / 2;

    canvasContext.strokeText(message, x, y);
    canvasContext.fillText(message, x, y);
  };

  this.drawOverLay = function (canvasOutput, canvasContext) {
    const { WIDTH, HEIGHT } = OVERLAY_DIMENSIONS;
    let rectWidth = WIDTH * canvasOutput.width;
    let rectHeight = HEIGHT * canvasOutput.height;
    let x = (canvasOutput.width - rectWidth) / 2;
    let y = (canvasOutput.height - rectHeight) / 2;

    canvasContext.globalAlpha = OVERLAY_OPACITY;
    canvasContext.fillStyle = COLORS.BLUE;

    // draw the overlay on the entire canvas except for the clear rectangle
    canvasContext.fillRect(0, 0, canvasOutput.width, y);
    canvasContext.fillRect(0, y, x, rectHeight);
    canvasContext.fillRect(x + rectWidth, y, x, rectHeight);
    canvasContext.fillRect(0, y + rectHeight, canvasOutput.width, y);

    canvasContext.globalAlpha = 1.0;
  };
}
