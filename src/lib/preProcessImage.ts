/* eslint-disable @typescript-eslint/no-unsafe-argument */
const BLUR_THRESHOLD = 30;
const CONTRAST_THRESHOLD = 30;
const CANNY_LOWER_THRESHOLD = 50;
const CANNY_UPPER_THRESHOLD = 300;

const defaultMetrics = {
	isBlurDetected: false,
	isEdgeDetected: true,
	isContrastLow: false,
};

export default async function preProcessImage(blob: Blob): Promise<{
	isBlurDetected: boolean;
	isEdgeDetected: boolean;
	isContrastLow: boolean;
}> {
	return await new Promise((resolve, reject) => {
		const img = new Image();
		let blobUrl = '';
		blobUrl = URL.createObjectURL(blob);
		img.src = blobUrl;

		img.onload = function () {
			try {
				const canvas = document.createElement('canvas');
				const ctx = canvas.getContext('2d');
				if (ctx == null) {
					resolve(defaultMetrics);
					return;
				}
				const fixedWidth = 800;
				const scaleFactor = fixedWidth / img.width;
				canvas.width = fixedWidth;
				canvas.height = img.height * scaleFactor;
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
				const imgData = ctx.getImageData(
					0,
					0,
					canvas.width,
					canvas.height
				);

				const gamma = 2.2;
				for (let i = 0; i < imgData.data.length; i += 4) {
					for (let c = 0; c < 3; c++) {
						let intensity = imgData.data[i + c];
						intensity = Math.pow(intensity / 255, gamma) * 255;
						imgData.data[i + c] = intensity;
					}
				}

				let { isBlurDetected, isEdgeDetected, isContrastLow } =
					defaultMetrics;

				if (cv !== undefined) {
					const src = cv.matFromImageData(imgData);
					const dst = new cv.Mat();
					cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
					const laplaceMat = new cv.Mat();
					const edgeMat = new cv.Mat();
					cv.Laplacian(
						dst,
						laplaceMat,
						cv.CV_8U,
						1,
						1,
						0,
						cv.BORDER_DEFAULT
					);

					// blur
					const varianceLap = computeVarianceOrContrast(
						laplaceMat,
						true
					);
					isBlurDetected = varianceLap < BLUR_THRESHOLD;

					cv.Canny(
						dst,
						edgeMat,
						CANNY_LOWER_THRESHOLD,
						CANNY_UPPER_THRESHOLD,
						3,
						false
					);
					// edge
					isEdgeDetected = cv.countNonZero(edgeMat) > 0;

					// contrast
					const contrastValue = computeVarianceOrContrast(dst, false);
					isContrastLow = contrastValue < CONTRAST_THRESHOLD;

					laplaceMat.delete();
					edgeMat.delete();
					src.delete();
					dst.delete();
				}
				resolve({ isBlurDetected, isEdgeDetected, isContrastLow });
			} catch (error) {
				reject(error);
			}
		};

		img.onerror = function (error) {
			reject(error);
		};
	});
}

function computeVarianceOrContrast(mat: any, isVariance: boolean): any {
	const mean = new cv.Mat();
	const stdDev = new cv.Mat();
	cv.meanStdDev(mat, mean, stdDev);
	const result = isVariance
		? Math.pow(stdDev.data64F[0], 2)
		: stdDev.data64F[0];
	mean.delete();
	stdDev.delete();
	return result;
}
