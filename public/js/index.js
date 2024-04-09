"use strict";
(() => {
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // node_modules/image-capture/src/imagecapture.js
  var ImageCapture = window.ImageCapture;
  if (typeof ImageCapture === "undefined") {
    ImageCapture = class {
      /**
       * TODO https://www.w3.org/TR/image-capture/#constructors
       *
       * @param {MediaStreamTrack} videoStreamTrack - A MediaStreamTrack of the 'video' kind
       */
      constructor(videoStreamTrack) {
        if (videoStreamTrack.kind !== "video")
          throw new DOMException("NotSupportedError");
        this._videoStreamTrack = videoStreamTrack;
        if (!("readyState" in this._videoStreamTrack)) {
          this._videoStreamTrack.readyState = "live";
        }
        this._previewStream = new MediaStream([videoStreamTrack]);
        this.videoElement = document.createElement("video");
        this.videoElementPlaying = new Promise((resolve) => {
          this.videoElement.addEventListener("playing", resolve);
        });
        if (HTMLMediaElement) {
          this.videoElement.srcObject = this._previewStream;
        } else {
          this.videoElement.src = URL.createObjectURL(this._previewStream);
        }
        this.videoElement.muted = true;
        this.videoElement.setAttribute("playsinline", "");
        this.videoElement.play();
        this.canvasElement = document.createElement("canvas");
        this.canvas2dContext = this.canvasElement.getContext("2d");
      }
      /**
       * https://w3c.github.io/mediacapture-image/index.html#dom-imagecapture-videostreamtrack
       * @return {MediaStreamTrack} The MediaStreamTrack passed into the constructor
       */
      get videoStreamTrack() {
        return this._videoStreamTrack;
      }
      /**
       * Implements https://www.w3.org/TR/image-capture/#dom-imagecapture-getphotocapabilities
       * @return {Promise<PhotoCapabilities>} Fulfilled promise with
       * [PhotoCapabilities](https://www.w3.org/TR/image-capture/#idl-def-photocapabilities)
       * object on success, rejected promise on failure
       */
      getPhotoCapabilities() {
        return new Promise(function executorGPC(resolve, reject) {
          const MediaSettingsRange = {
            current: 0,
            min: 0,
            max: 0
          };
          resolve({
            exposureCompensation: MediaSettingsRange,
            exposureMode: "none",
            fillLightMode: "none",
            focusMode: "none",
            imageHeight: MediaSettingsRange,
            imageWidth: MediaSettingsRange,
            iso: MediaSettingsRange,
            redEyeReduction: false,
            whiteBalanceMode: "none",
            zoom: MediaSettingsRange
          });
          reject(new DOMException("OperationError"));
        });
      }
      /**
       * Implements https://www.w3.org/TR/image-capture/#dom-imagecapture-setoptions
       * @param {Object} photoSettings - Photo settings dictionary, https://www.w3.org/TR/image-capture/#idl-def-photosettings
       * @return {Promise<void>} Fulfilled promise on success, rejected promise on failure
       */
      setOptions(photoSettings = {}) {
        return new Promise(function executorSO(resolve, reject) {
        });
      }
      /**
       * TODO
       * Implements https://www.w3.org/TR/image-capture/#dom-imagecapture-takephoto
       * @return {Promise<Blob>} Fulfilled promise with [Blob](https://www.w3.org/TR/FileAPI/#blob)
       * argument on success; rejected promise on failure
       */
      takePhoto() {
        const self = this;
        return new Promise(function executorTP(resolve, reject) {
          if (self._videoStreamTrack.readyState !== "live") {
            return reject(new DOMException("InvalidStateError"));
          }
          self.videoElementPlaying.then(() => {
            try {
              self.canvasElement.width = self.videoElement.videoWidth;
              self.canvasElement.height = self.videoElement.videoHeight;
              self.canvas2dContext.drawImage(self.videoElement, 0, 0);
              self.canvasElement.toBlob(resolve);
            } catch (error) {
              reject(new DOMException("UnknownError"));
            }
          });
        });
      }
      /**
       * Implements https://www.w3.org/TR/image-capture/#dom-imagecapture-grabframe
       * @return {Promise<ImageBitmap>} Fulfilled promise with
       * [ImageBitmap](https://www.w3.org/TR/html51/webappapis.html#webappapis-images)
       * argument on success; rejected promise on failure
       */
      grabFrame() {
        const self = this;
        return new Promise(function executorGF(resolve, reject) {
          if (self._videoStreamTrack.readyState !== "live") {
            return reject(new DOMException("InvalidStateError"));
          }
          self.videoElementPlaying.then(() => {
            try {
              self.canvasElement.width = self.videoElement.videoWidth;
              self.canvasElement.height = self.videoElement.videoHeight;
              self.canvas2dContext.drawImage(self.videoElement, 0, 0);
              resolve(window.createImageBitmap(self.canvasElement));
            } catch (error) {
              reject(new DOMException("UnknownError"));
            }
          });
        });
      }
    };
  }
  window.ImageCapture = ImageCapture;

  // src/constants/cameraLabels.ts
  var backCameraKeywords = [
    "rear",
    "back",
    "r\xFCck",
    "arri\xE8re",
    "trasera",
    "tr\xE1s",
    "traseira",
    "posteriore",
    "\u540E\u9762",
    "\u5F8C\u9762",
    "\u80CC\u9762",
    "\u540E\u7F6E",
    "\u5F8C\u7F6E",
    "\u80CC\u7F6E",
    "\u0437\u0430\u0434\u043D\u0435\u0439",
    "\u0627\u0644\u062E\u0644\u0641\u064A\u0629",
    "\uD6C4",
    "arka",
    "achterzijde",
    "\u0E2B\u0E25\u0E31\u0E07",
    "baksidan",
    "bagside",
    "sau",
    "bak",
    "tylny",
    "takakamera",
    "belakang",
    "\u05D0\u05D7\u05D5\u05E8\u05D9\u05EA",
    "\u03C0\u03AF\u03C3\u03C9",
    "spate",
    "h\xE1ts\xF3",
    "zadn\xED",
    "darrere",
    "zadn\xE1",
    "\u0437\u0430\u0434\u043D\u044F",
    "stra\u017Enja",
    "belakang",
    "\u092C\u0948\u0915"
  ];
  var iosWideBackCameraLabels = [
    "Back Camera",
    "R\xFCckkamera",
    "Cam\xE9ra arri\xE8re",
    "C\xE1mara trasera",
    "C\xE2mera Traseira",
    "C\xE2mara traseira",
    "Fotocamera (posteriore)",
    "\u540E\u7F6E\u76F8\u673A",
    "\u5F8C\u7F6E\u76F8\u6A5F",
    "\u80CC\u9762\u30AB\u30E1\u30E9",
    "\u041A\u0430\u043C\u0435\u0440\u0430 \u043D\u0430 \u0437\u0430\u0434\u043D\u0435\u0439 \u043F\u0430\u043D\u0435\u043B\u0438",
    "Arka Kamera",
    "Camera aan achterzijde",
    "\u0627\u0644\u0643\u0627\u0645\u064A\u0631\u0627 \u0627\u0644\u062E\u0644\u0641\u064A\u0629",
    "\u0E01\u0E25\u0E49\u0E2D\u0E07\u0E14\u0E49\u0E32\u0E19\u0E2B\u0E25\u0E31\u0E07",
    "Kamera p\xE5 baksidan",
    "Bagsidekamera",
    "Camera m\u1EB7t sau",
    "Kamera bak",
    "Tylny aparat",
    "Takakamera",
    "Kamera Belakang",
    "\u05DE\u05E6\u05DC\u05DE\u05D4 \u05D0\u05D7\u05D5\u05E8\u05D9\u05EA",
    "\u03A0\u03AF\u03C3\u03C9 \u03BA\u03AC\u03BC\u03B5\u03C1\u03B1",
    "Camer\u0103 spate",
    "H\xE1ts\xF3 kamera",
    "Zadn\xED fotoapar\xE1t",
    "C\xE0mera posterior",
    "Zadn\xE1 kamera",
    "\u0417\u0430\u0434\u043D\u044F \u043A\u0430\u043C\u0435\u0440\u0430",
    "Stra\u017Enja kamera",
    "Kamera Belakang",
    "\u092C\u0948\u0915 \u0915\u0948\u092E\u0930\u093E"
  ];

  // src/constants/cameraResolutions.ts
  var cameraResolutions = [
    { name: "Highest Resolution", width: 99999, height: 99999 },
    { name: "8K Ultra HD", width: 7680, height: 4320 },
    { name: "5K", width: 5120, height: 2880 },
    { name: "4K Ultra HD", width: 3840, height: 2160 },
    { name: "1440p QHD", width: 2560, height: 1440 },
    { name: "2K", width: 2048, height: 1080 },
    { name: "720p HD", width: 1280, height: 720 },
    { name: "1080p Full HD", width: 1920, height: 1080 },
    { name: "Default", width: 640, height: 480 }
  ];
  var cameraResolutions_default = cameraResolutions;

  // src/modal/index.module.css
  var modal_default = {
    modal: "modal_modal"
  };

  // src/modal/index.ts
  function createModal(containerElement) {
    const modal = document.createElement("div");
    modal.className = modal_default.modal;
    document.body.appendChild(modal);
    modal.appendChild(containerElement);
    return modal;
  }

  // src/instruction/index.module.css
  var instruction_default = {
    instructionWrapper: "instruction_instructionWrapper",
    instruction: "instruction_instruction"
  };

  // src/instruction/index.ts
  function createInstructionElement(container) {
    const instructionWrapper = document.createElement("div");
    instructionWrapper.className = instruction_default.instructionWrapper;
    const instruction = document.createElement("div");
    instruction.className = instruction_default.instruction;
    instruction.innerText = "Position the entire sidewall to match the blue overlay";
    instructionWrapper.appendChild(instruction);
    container.appendChild(instructionWrapper);
    return instructionWrapper;
  }

  // src/overlay/overlay.svg
  var overlay_default = 'data:image/svg+xml,<svg width="335" height="335" viewBox="0 0 335 335" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<g filter="url(%23filter0_d_1200_1784)">%0A<path fill-rule="evenodd" clip-rule="evenodd" d="M162.936 45.0308C148.493 45.7007 136.132 48.2952 123.426 53.3242C93.3197 65.2391 69.1814 89.3774 57.2665 119.483C52.7874 130.801 50.2433 141.882 49.2122 154.564C48.9301 158.033 48.929 168.114 49.2103 171.546C50.9486 192.748 57.4197 211.566 68.8505 228.66C87.9939 257.287 118.681 276.152 152.784 280.257C158.019 280.887 161.181 281.067 166.997 281.067C172.813 281.067 175.975 280.887 181.21 280.257C213.04 276.425 241.812 259.839 261.267 234.105C273.801 217.528 281.718 197.904 284.198 177.268C284.834 171.98 285 169.034 285 163.055C285 157.076 284.834 154.129 284.198 148.842C281.717 128.201 273.804 108.586 261.267 92.0044C240.647 64.7308 209.742 47.8675 175.673 45.3005C172.939 45.0945 165.128 44.9291 162.936 45.0308ZM176.965 46.9448C204.721 49.5651 229.226 60.8737 248.737 80.066C268.678 99.6809 280.574 125.061 283.136 153.456C283.457 157.013 283.457 169.097 283.136 172.653C280.574 201.048 268.678 226.429 248.737 246.044C229.137 265.323 204.414 276.684 176.595 279.194C173.039 279.515 160.955 279.515 157.399 279.194C131.364 276.845 108.173 266.808 89.0102 249.596C68.5251 231.195 55.2222 206.011 51.549 178.674C50.7671 172.854 50.6167 170.335 50.6167 163.055C50.6167 155.774 50.7671 153.255 51.549 147.435C57.5006 103.143 88.4484 66.0554 130.994 52.2283C139.415 49.4917 149.021 47.5748 157.399 46.959C158.871 46.8508 160.407 46.7305 160.814 46.6915C162.277 46.5513 174.89 46.7489 176.965 46.9448ZM161.829 51.0147C137.156 52.1872 114.217 61.0965 95.1916 76.8956C73.3617 95.0238 59.067 121.201 55.7024 149.211C55.0805 154.388 54.9072 157.405 54.9072 163.055C54.9072 168.705 55.0805 171.721 55.7024 176.899C59.2955 206.811 75.2015 234.306 99.5315 252.664C108.929 259.754 120.371 265.78 131.418 269.457C143.092 273.343 154.365 275.145 166.997 275.145C172.647 275.145 175.664 274.971 180.841 274.35C208.85 270.985 235.028 256.69 253.156 234.86C267.051 218.129 275.748 198.072 278.292 176.899C278.914 171.721 279.087 168.705 279.087 163.055C279.087 157.405 278.914 154.388 278.292 149.211C276.722 136.144 272.812 123.482 266.691 111.648C248.704 76.8718 214.058 53.9821 175.211 51.2098C171.278 50.9292 165.426 50.8438 161.829 51.0147ZM177.242 52.939C178.663 53.089 179.93 53.2153 180.056 53.2196C180.24 53.2256 180.288 58.9764 180.29 81.3301C180.293 112.206 180.234 110.548 181.417 112.893C183.264 116.55 188.19 118.689 192.113 117.537C194.728 116.769 193.907 117.526 215.358 96.1186L235.386 76.1324L236.678 77.1742C242.186 81.616 248.432 87.8706 252.977 93.4981C253.606 94.277 254.121 94.981 254.121 95.0628C254.121 95.1444 245.166 104.184 234.22 115.151C212.298 137.116 213.497 135.789 212.868 138.782C212.528 140.396 212.528 140.861 212.868 142.474C213.261 144.335 214.11 145.927 215.426 147.267C216.574 148.436 217.38 148.942 219.226 149.649L220.25 150.042L248.527 150.092L276.803 150.142L276.909 150.922C277.714 156.842 277.742 166.876 276.974 174.73L276.763 176.899H248.776C218.195 176.899 219.923 176.84 217.606 177.961C216.276 178.605 214.514 180.359 213.759 181.79C212.217 184.711 212.21 187.872 213.736 190.82C214.235 191.782 217.131 194.761 234.066 211.728L253.814 231.513L252.998 232.571C249.256 237.427 242.034 244.643 236.414 249.141L234.858 250.387L215.094 230.646C201.828 217.395 195.035 210.736 194.431 210.391C192.346 209.2 189.492 208.883 187.182 209.586C185.572 210.077 184.504 210.695 183.292 211.841C182.106 212.961 181.371 214.093 180.809 215.661L180.379 216.861L180.329 244.849L180.278 272.836L179.406 272.945C173.956 273.628 162.309 273.757 156.888 273.194C155.237 273.023 153.804 272.882 153.704 272.882C153.586 272.882 153.521 263.332 153.519 245.426C153.516 215.3 153.562 216.587 152.41 214.242C150.6 210.556 145.767 208.396 141.733 209.469C139.16 210.154 140.126 209.266 118.91 230.452C108.046 241.302 99.0891 250.179 99.0066 250.179C98.8082 250.179 96.5348 248.336 93.9017 246.041C89.8278 242.49 83.9371 236.34 80.9396 232.509L80.0679 231.395L99.705 211.821C111.152 200.411 119.541 191.908 119.819 191.434C121.505 188.557 121.605 185.277 120.098 182.266C118.872 179.817 116.781 178.134 114.114 177.453C112.702 177.091 112.071 177.083 85.0064 177.083C63.0398 177.083 57.3265 177.036 57.2649 176.852C57.222 176.726 57.0411 175.127 56.8628 173.299C56.3091 167.624 56.4499 154.106 57.0971 150.832L57.1964 150.33L85.2859 150.278L113.375 150.226L114.588 149.814C120.234 147.894 122.789 141.649 120.077 136.401C119.576 135.432 116.716 132.492 99.5681 115.314C85.28 101.002 79.6837 95.2824 79.7906 95.1021C80.073 94.6264 82.1644 92.0779 84.0109 89.9594C87.5553 85.893 93.9056 79.8085 97.4819 77.0523L98.5418 76.2356L118.603 96.2783C134.809 112.47 138.849 116.413 139.629 116.801C142.4 118.178 145.417 118.168 148.323 116.772C149.637 116.141 151.647 114.181 152.298 112.896C153.392 110.738 153.338 112.362 153.338 81.5468V53.2766L155.655 53.0488C156.929 52.9235 158.902 52.7525 160.039 52.6691C163.094 52.4445 174.209 52.6189 177.242 52.939ZM188.132 54.5277C200.356 56.8583 212.919 61.6646 223.757 68.1572C227.323 70.2936 234.001 74.8759 234.001 75.1866C234.001 75.2429 225.051 84.2273 214.112 95.1521C192.484 116.753 193.594 115.741 191.011 116.196C188.611 116.619 185.886 115.712 184.087 113.891C182.89 112.68 182.173 111.199 181.949 109.481C181.769 108.094 181.683 53.7388 181.861 53.561C181.982 53.4399 184.302 53.7977 188.132 54.5277ZM151.861 81.3672C151.861 100.985 151.801 109.425 151.656 110.116C150.825 114.091 146.699 116.876 142.679 116.176C140.032 115.715 141.018 116.61 119.513 95.144C108.675 84.3263 99.8084 75.4182 99.8084 75.3484C99.8084 75.0082 106.608 70.3294 110.422 68.0444C121.057 61.6741 133.772 56.8254 145.862 54.5301C150.165 53.7131 150.6 53.6397 151.261 53.617L151.861 53.5963V81.3672ZM256.361 97.9427C257.757 99.8219 260.53 104.013 262.009 106.48C268.911 117.989 273.862 131.535 276.076 144.966C276.285 146.235 276.501 147.544 276.557 147.875L276.658 148.477L248.361 148.429L220.065 148.38L218.824 147.792C217.1 146.975 215.872 145.77 215.031 144.069C214.362 142.716 214.343 142.621 214.343 140.634C214.343 136.97 212.532 139.074 235.36 116.217C246.234 105.328 255.153 96.4198 255.18 96.4198C255.208 96.4198 255.739 97.105 256.361 97.9427ZM118.775 137.305C119.459 138.584 119.467 138.619 119.467 140.73C119.467 142.819 119.453 142.89 118.779 144.253C117.938 145.955 116.71 147.16 114.985 147.977L113.745 148.565L85.5493 148.614C70.0418 148.641 57.354 148.596 57.354 148.515C57.354 148.144 58.3124 142.608 58.7356 140.535C61.7829 125.611 68.5747 110.279 77.571 98.0158L78.6346 96.566L98.3594 116.29C116.175 134.104 118.151 136.138 118.775 137.305ZM165.407 122.327C163.369 122.845 161.613 124.389 160.894 126.295C160.573 127.149 160.516 127.623 160.58 128.907C160.708 131.43 161.743 133.108 163.891 134.273C165.001 134.874 165.151 134.905 166.905 134.903C168.489 134.902 168.882 134.837 169.674 134.448C172.271 133.172 173.816 130.169 173.265 127.467C172.52 123.811 168.896 121.44 165.407 122.327ZM168.843 124.122C171.407 125.281 172.533 128.279 171.319 130.716C169.794 133.775 165.878 134.45 163.494 132.066C160.393 128.965 162.533 123.746 166.905 123.746C167.623 123.746 168.304 123.878 168.843 124.122ZM164.044 144.142C157.75 145.137 152.325 149.228 149.641 155.003C145.833 163.198 148.272 172.872 155.536 178.391C157.041 179.535 159.99 180.991 161.823 181.497C166.421 182.764 171.072 182.326 175.396 180.216C187.007 174.551 189.766 159.339 180.888 149.929C176.531 145.31 170.268 143.158 164.044 144.142ZM171.849 146.143C174.792 147.025 176.948 148.282 179.154 150.399C181.461 152.614 182.953 155.056 183.922 158.202C184.384 159.703 184.422 160.066 184.422 163.055C184.422 166.043 184.384 166.406 183.922 167.907C182.953 171.053 181.461 173.496 179.154 175.711C176.96 177.817 174.828 179.063 171.849 179.98C170.349 180.442 169.986 180.479 166.997 180.479C164.009 180.479 163.645 180.442 162.145 179.98C159.166 179.063 157.034 177.817 154.841 175.711C152.533 173.496 151.041 171.053 150.072 167.907C149.61 166.406 149.573 166.043 149.573 163.055C149.573 160.066 149.61 159.703 150.072 158.202C151.041 155.056 152.533 152.614 154.841 150.399C156.409 148.893 157.349 148.223 159.152 147.323C161.997 145.904 163.894 145.508 167.459 145.592C169.795 145.646 170.481 145.732 171.849 146.143ZM131.212 156.786C129.255 157.189 127.46 158.609 126.607 160.43C126.185 161.33 126.112 161.731 126.112 163.147C126.112 164.59 126.179 164.946 126.625 165.854C127.254 167.134 128.373 168.282 129.61 168.918C130.336 169.29 130.889 169.413 132.111 169.473C134.299 169.581 135.486 169.125 137.03 167.583C137.989 166.625 138.225 166.253 138.553 165.194C139.033 163.64 139.041 162.674 138.589 161.22C138.025 159.409 136.922 158.158 135.156 157.325C133.917 156.741 132.421 156.537 131.212 156.786ZM199.115 156.992C198.421 157.265 197.74 157.751 196.964 158.527C196.006 159.485 195.769 159.856 195.442 160.916C194.962 162.469 194.953 163.436 195.406 164.89C195.977 166.725 197.063 167.944 198.919 168.83C199.936 169.316 200.312 169.397 201.504 169.386C203.131 169.372 204.148 169.043 205.397 168.126C209.207 165.33 208.656 159.389 204.384 157.191C203.058 156.508 200.58 156.415 199.115 156.992ZM203.925 158.74C205.08 159.368 205.846 160.351 206.242 161.715C206.614 162.995 206.455 164.178 205.741 165.427C204.777 167.115 203.141 167.966 201.147 167.815C199.88 167.719 198.871 167.246 197.98 166.327C196.996 165.314 196.658 164.303 196.743 162.626C196.803 161.43 196.893 161.134 197.435 160.34C198.948 158.123 201.591 157.471 203.925 158.74ZM134.585 158.714C136.32 159.554 137.269 161.112 137.275 163.135C137.28 164.596 136.902 165.569 135.951 166.541C134.94 167.575 134.044 167.937 132.48 167.942C131.283 167.946 130.96 167.871 130.094 167.393C128.913 166.739 128.149 165.762 127.752 164.395C127.064 162.027 128.422 159.381 130.772 158.509C131.7 158.165 133.669 158.271 134.585 158.714ZM276.456 178.703C276.456 179.198 275.598 183.986 275.068 186.445C271.838 201.452 265.18 216.237 256.146 228.463L254.802 230.282L235.19 210.651C213.742 189.182 214.715 190.254 214.249 187.581C213.537 183.49 216.506 179.256 220.561 178.582C221.1 178.492 233.897 178.409 248.999 178.397C275.182 178.376 276.456 178.39 276.456 178.703ZM114.996 179.337C116.367 179.979 118.073 181.608 118.686 182.862C119.404 184.326 119.614 185.401 119.524 187.13C119.457 188.392 119.331 188.909 118.839 189.94C118.268 191.134 117.159 192.276 98.731 210.624C88.0041 221.305 79.182 230.047 79.1268 230.051C78.9698 230.063 76.8535 227.15 75.0005 224.371C66.334 211.375 60.772 197.39 57.9929 181.61C57.7431 180.191 57.5386 178.965 57.5386 178.885C57.5386 178.805 70.2264 178.762 85.7339 178.788L113.929 178.837L114.996 179.337ZM164.968 191.409C162.672 192.242 161.248 193.928 160.706 196.456C160.139 199.098 161.82 202.191 164.473 203.39C167.037 204.548 169.975 203.907 171.897 201.769C173.08 200.453 173.512 199.153 173.414 197.203C173.286 194.675 172.245 192.99 170.103 191.846C169.085 191.303 168.734 191.216 167.366 191.165C166.255 191.125 165.555 191.196 164.968 191.409ZM168.647 192.879C169.349 193.087 169.875 193.418 170.5 194.044C173.601 197.144 171.464 202.356 167.089 202.365C162.576 202.375 160.475 196.727 163.901 193.796C165.25 192.64 166.821 192.337 168.647 192.879ZM146.756 211.236C148.259 211.799 149.697 212.922 150.551 214.202C151.958 216.309 151.861 214.035 151.861 244.859V272.513H151.441C150.183 272.513 143.23 271.119 138.94 270.006C125.89 266.621 112.351 260.192 101.857 252.398L100.306 251.246L119.946 231.632C140.897 210.708 140.214 211.338 142.456 210.868C143.607 210.627 145.578 210.796 146.756 211.236ZM191.154 210.858C193.624 211.326 192.417 210.222 213.743 231.515C224.581 242.336 233.447 251.247 233.447 251.317C233.447 251.626 227.235 255.871 223.572 258.065C211.622 265.223 197.752 270.191 183.564 272.396L181.948 272.647V245.004C181.948 217.812 181.955 217.342 182.321 216.157C183.449 212.503 187.384 210.143 191.154 210.858Z" fill="%230099FF"/>%0A<circle cx="167.498" cy="163.498" r="159.498" stroke="%230099FF" stroke-width="8"/>%0A</g>%0A<defs>%0A<filter id="filter0_d_1200_1784" x="0" y="0" width="334.996" height="334.997" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">%0A<feFlood flood-opacity="0" result="BackgroundImageFix"/>%0A<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>%0A<feOffset dy="4"/>%0A<feGaussianBlur stdDeviation="2"/>%0A<feComposite in2="hardAlpha" operator="out"/>%0A<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>%0A<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1200_1784"/>%0A<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1200_1784" result="shape"/>%0A</filter>%0A</defs>%0A</svg>%0A';

  // src/overlay/index.module.css
  var overlay_default2 = {
    overlayWrapper: "overlay_overlayWrapper",
    overlay: "overlay_overlay"
  };

  // src/overlay/index.ts
  function createOverlayElement(container, instructionElement) {
    const overlayWrapper = document.createElement("div");
    overlayWrapper.className = overlay_default2.overlayWrapper;
    const overlay = document.createElement("img");
    overlay.src = overlay_default;
    overlay.className = overlay_default2.overlay;
    overlayWrapper.appendChild(overlay);
    overlayWrapper.appendChild(instructionElement);
    container.appendChild(overlayWrapper);
  }

  // src/video/index.module.css
  var video_default = {
    video: "video_video"
  };

  // src/video/index.ts
  function createVideoElementWithStream(container, stream) {
    const video = document.createElement("video");
    video.className = video_default.video;
    video.autoplay = true;
    video.playsInline = true;
    video.muted = true;
    video.srcObject = stream;
    container.appendChild(video);
  }

  // src/container/index.module.css
  var container_default = {
    container: "container_container"
  };

  // src/container/index.ts
  function createContainerElemenet(stream) {
    const container = document.createElement("div");
    container.className = container_default.container;
    createVideoElementWithStream(container, stream);
    const instructionElement = createInstructionElement(container);
    createOverlayElement(container, instructionElement);
    return container;
  }

  // src/button/index.module.css
  var button_default = {
    button: "button_button",
    buttonInner: "button_buttonInner",
    spinner: "button_spinner",
    rotation: "button_rotation"
  };

  // src/button/index.ts
  function createButtonElement(container, stream, modal) {
    return __async(this, null, function* () {
      const button = document.createElement("button");
      button.className = button_default.button;
      button.innerHTML = `<div class=${button_default.buttonInner}><div>Capture</div></div>`;
      container.appendChild(button);
      return yield new Promise((resolve, reject) => {
        button.addEventListener("click", () => {
          button.innerHTML = `<div class=${button_default.buttonInner}><div>Please wait...</div><div class=${button_default.spinner}></div></div>`;
          button.disabled = true;
          button.style.cursor = "not-allowed";
          getImageBlob(stream).then((blob) => {
            stream.getTracks().forEach((track) => {
              track.stop();
            });
            modal.remove();
            resolve(blob);
          }).catch((error) => {
            reject(error);
          });
        });
      });
    });
  }

  // src/index.ts
  function isBackCameraLabel(label) {
    const lowercaseLabel = label.toLowerCase();
    return backCameraKeywords.some((keyword) => lowercaseLabel.includes(keyword));
  }
  function isNotIosWideAngleCamera(label) {
    const lowercaseLabel = label.toLowerCase();
    return !iosWideBackCameraLabels.some(
      (iosLabel) => lowercaseLabel.includes(iosLabel.toLowerCase())
    );
  }
  function getHighResolutionNonWideAngleCamera() {
    return __async(this, null, function* () {
      yield navigator.mediaDevices.getUserMedia({ video: true });
      const allDevices = yield navigator.mediaDevices.enumerateDevices();
      const videoDevices = allDevices.filter(
        (device) => device.kind === "videoinput"
      );
      if ((videoDevices == null ? void 0 : videoDevices.length) === 0) {
        return yield Promise.reject(new Error("No video device found"));
      }
      let backCameras = videoDevices.filter(
        (device) => isBackCameraLabel(device.label) && isNotIosWideAngleCamera(device.label)
      );
      backCameras = backCameras.reverse();
      let chosenCamera;
      if (backCameras.length > 0)
        chosenCamera = backCameras[0];
      else
        chosenCamera = videoDevices[0];
      return chosenCamera;
    });
  }
  function getHighestResolutionStream(device) {
    return __async(this, null, function* () {
      const constraintsList = cameraResolutions_default.map((resolution) => ({
        video: {
          deviceId: device !== void 0 && device !== null ? { exact: device.deviceId } : void 0,
          width: { ideal: resolution.width },
          height: { ideal: resolution.height },
          facingMode: {
            ideal: "environment"
          }
        }
      }));
      for (let i = 0; i < constraintsList.length; i++) {
        try {
          const stream = yield navigator.mediaDevices.getUserMedia(
            constraintsList[i]
          );
          if (stream !== null && stream !== void 0) {
            return stream;
          }
        } catch (error) {
          console.log(
            `Attempt for resolution ${constraintsList[i].video.width.ideal}x${constraintsList[i].video.height.ideal} failed:`,
            error
          );
        }
      }
      return yield Promise.reject(Error("No suitable constraints found"));
    });
  }
  function getImageBlob(stream) {
    return __async(this, null, function* () {
      const track = stream.getVideoTracks()[0];
      const imageCaptureInstance = new ImageCapture(track);
      const photoCapabilities = yield imageCaptureInstance.getPhotoCapabilities();
      const maxImageWidth = photoCapabilities.imageWidth.max;
      const maxImageHeight = photoCapabilities.imageHeight.max;
      const blob = yield imageCaptureInstance.takePhoto({
        imageHeight: maxImageHeight,
        imageWidth: maxImageWidth
      });
      return blob;
    });
  }
  function init() {
    return __async(this, null, function* () {
      if (navigator.mediaDevices === null || navigator.mediaDevices === void 0) {
        yield Promise.reject(new Error("Unsupported device"));
      }
      const device = yield getHighResolutionNonWideAngleCamera();
      const stream = yield getHighestResolutionStream(device);
      const container = createContainerElemenet(stream);
      const modal = createModal(container);
      return yield createButtonElement(container, stream, modal);
    });
  }
  window.Anyline = { init };
  var src_default = init;
})();
/*! Bundled license information:

image-capture/src/imagecapture.js:
  (**
   * MediaStream ImageCapture polyfill
   *
   * @license
   * Copyright 2018 Google Inc.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
