// Inspired by https://medium.com/revolut/canvas-based-javascript-blur-detection-b92ab1075acf

const MIN_EDGE_INTENSITY = 20;
const BLUR_BEFORE_EDGE_DETECTION_MIN_WIDTH = 360; // pixels
const BLUR_BEFORE_EDGE_DETECTION_DIAMETER = 5.0; // pixels

const NUMBER_EDGES_THRESHOLD = 4000;
const AVERAGE_EDGES_WIDTH_THRESHOLD = 5;
const AVERAGE_EDGES_WIDTH_PERC_THRESHOLD = 0.6;

const CONTRAST_THRESHOLD = 30;

const defaultMetrics = {
	isBlurDetected: false,
	isContrastLow: false,
};

interface ImageData {
	width: number;
	height: number;
	data: Uint8ClampedArray;
	colorSpace?: string;
}

interface BlurredData {
	width: number;
	height: number;
	num_edges: number;
	avg_edge_width: number;
	avg_edge_width_perc: number;
}

interface ImageFilter {
	convertToGrayscale: (imageData: ImageData) => Uint8ClampedArray;
	computeContrast: (data: Uint8ClampedArray) => number;
	gaussianBlur: (pixels: ImageData, diameter: number) => ImageData;
	identity: (pixels: ImageData) => ImageData;
	createImageData: (width: number, height: number) => ImageData;
	separableConvolve: (
		pixels: ImageData,
		horizontalWeights: Float32Array,
		vertWeights: Float32Array,
		opaque: boolean
	) => ImageData;
	horizontalConvolve: (
		pixels: ImageData,
		weightsVector: Float32Array,
		opaque: boolean
	) => ImageData;
	verticalConvolveFloat32: (
		pixels: ImageData,
		weightsVector: Float32Array,
		opaque: boolean
	) => ImageData;
	luminance: (pixels: ImageData) => ImageData;
	convolve: (
		pixels: ImageData,
		weights: Float32Array,
		opaque: boolean
	) => ImageData;
	reducePixels: (imageData: ImageData) => Uint8ClampedArray[];
	detectEdges: (imageData: ImageData) => ImageData;
	detectBlur: (pixels: Uint8ClampedArray[]) => BlurredData;
}

const filters: ImageFilter = {
	convertToGrayscale(imageData) {
		const grayData = new Uint8ClampedArray(
			imageData.width * imageData.height
		);
		const data = imageData.data;
		for (let i = 0; i < data.length; i += 4) {
			const r = data[i];
			const g = data[i + 1];
			const b = data[i + 2];
			grayData[i / 4] = 0.299 * r + 0.587 * g + 0.114 * b;
		}
		return grayData;
	},

	computeContrast(data) {
		const mean = data.reduce((a, b) => a + b, 0) / data.length;
		return Math.sqrt(
			data.reduce((a, b) => a + (b - mean) ** 2, 0) / data.length
		);
	},

	gaussianBlur(pixels, diameter) {
		diameter = Math.abs(diameter);
		if (diameter <= 1) return this.identity(pixels);
		const radius = diameter / 2;
		const len = Math.ceil(diameter) + (1 - (Math.ceil(diameter) % 2));
		const weights = new Float32Array(len);
		const rho = (radius + 0.5) / 3;
		const rhoSq = rho * rho;
		const gaussianFactor = 1 / Math.sqrt(2 * Math.PI * rhoSq);
		const rhoFactor = -1 / (2 * rho * rho);
		let weightSum = 0;
		const middle = Math.floor(len / 2);
		for (let i = 0; i < len; i++) {
			const x = i - middle;
			const gx = gaussianFactor * Math.exp(x * x * rhoFactor);
			weights[i] = gx;
			weightSum += gx;
		}
		for (let i = 0; i < weights.length; i++) {
			weights[i] /= weightSum;
		}
		return this.separableConvolve(pixels, weights, weights, false);
	},

	identity(pixels) {
		const output = this.createImageData(pixels.width, pixels.height);
		const dst = output.data;
		const d = pixels.data;
		for (let i = 0; i < d.length; i++) {
			dst[i] = d[i];
		}
		return output;
	},

	createImageData(width, height) {
		return {
			width,
			height,
			data: new Uint8ClampedArray(width * height * 4),
		};
	},

	separableConvolve(pixels, horizontalWeights, vertWeights, opaque) {
		return this.horizontalConvolve(
			this.verticalConvolveFloat32(pixels, vertWeights, opaque),
			horizontalWeights,
			opaque
		);
	},

	horizontalConvolve(pixels, weightsVector, opaque) {
		const side = weightsVector.length;
		const halfSide = Math.floor(side / 2);

		const src = pixels.data;
		const sw = pixels.width;
		const sh = pixels.height;

		const w = sw;
		const h = sh;
		const output = this.createImageData(w, h);
		const dst = output.data;

		const alphaFac = opaque ? 1 : 0;

		for (let y = 0; y < h; y++) {
			for (let x = 0; x < w; x++) {
				const sy = y;
				const sx = x;
				const dstOff = (y * w + x) * 4;
				let r = 0;
				let g = 0;
				let b = 0;
				let a = 0;
				for (let cx = 0; cx < side; cx++) {
					const scy = sy;
					const scx = Math.min(
						sw - 1,
						Math.max(0, sx + cx - halfSide)
					);
					const srcOff = (scy * sw + scx) * 4;
					const wt = weightsVector[cx];
					r += src[srcOff] * wt;
					g += src[srcOff + 1] * wt;
					b += src[srcOff + 2] * wt;
					a += src[srcOff + 3] * wt;
				}
				dst[dstOff] = r;
				dst[dstOff + 1] = g;
				dst[dstOff + 2] = b;
				dst[dstOff + 3] = a + alphaFac * (255 - a);
			}
		}
		return output;
	},

	verticalConvolveFloat32(
		pixels: ImageData,
		weightsVector: Float32Array,
		opaque: boolean
	): ImageData {
		const side = weightsVector.length;
		const halfSide = Math.floor(side / 2);

		const src = pixels.data;
		const sw = pixels.width;
		const sh = pixels.height;

		const w = sw;
		const h = sh;
		const output = this.createImageData(w, h);
		const dst = output.data;

		const alphaFac = opaque ? 1 : 0;

		for (let y = 0; y < h; y++) {
			for (let x = 0; x < w; x++) {
				const sy = y;
				const sx = x;
				const dstOff = (y * w + x) * 4;
				let r = 0;
				let g = 0;
				let b = 0;
				let a = 0;
				for (let cy = 0; cy < side; cy++) {
					const scy = Math.min(
						sh - 1,
						Math.max(0, sy + cy - halfSide)
					);
					const scx = sx;
					const srcOff = (scy * sw + scx) * 4;
					const wt = weightsVector[cy];
					r += src[srcOff] * wt;
					g += src[srcOff + 1] * wt;
					b += src[srcOff + 2] * wt;
					a += src[srcOff + 3] * wt;
				}
				dst[dstOff] = r;
				dst[dstOff + 1] = g;
				dst[dstOff + 2] = b;
				dst[dstOff + 3] = a + alphaFac * (255 - a);
			}
		}
		return output;
	},

	luminance(pixels) {
		const output = this.createImageData(pixels.width, pixels.height);
		const dst = output.data;
		const d = pixels.data;
		for (let i = 0; i < d.length; i += 4) {
			const r = d[i];
			const g = d[i + 1];
			const b = d[i + 2];
			// CIE luminance for the RGB
			const v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
			dst[i] = dst[i + 1] = dst[i + 2] = v;
			dst[i + 3] = d[i + 3];
		}
		return output;
	},

	convolve(pixels, weights, opaque) {
		const side = Math.round(Math.sqrt(weights.length));
		const halfSide = Math.floor(side / 2);

		const src = pixels.data;
		const sw = pixels.width;
		const sh = pixels.height;

		const w = sw;
		const h = sh;
		const output = this.createImageData(w, h);
		const dst = output.data;

		const alphaFac = opaque ? 1 : 0;

		for (let y = 0; y < h; y++) {
			for (let x = 0; x < w; x++) {
				const sy = y;
				const sx = x;
				const dstOff = (y * w + x) * 4;
				let r = 0;
				let g = 0;
				let b = 0;
				let a = 0;
				for (let cy = 0; cy < side; cy++) {
					for (let cx = 0; cx < side; cx++) {
						const scy = Math.min(
							sh - 1,
							Math.max(0, sy + cy - halfSide)
						);
						const scx = Math.min(
							sw - 1,
							Math.max(0, sx + cx - halfSide)
						);
						const srcOff = (scy * sw + scx) * 4;
						const wt = weights[cy * side + cx];
						r += src[srcOff] * wt;
						g += src[srcOff + 1] * wt;
						b += src[srcOff + 2] * wt;
						a += src[srcOff + 3] * wt;
					}
				}
				dst[dstOff] = r;
				dst[dstOff + 1] = g;
				dst[dstOff + 2] = b;
				dst[dstOff + 3] = a + alphaFac * (255 - a);
			}
		}
		return output;
	},

	reducePixels(imageData) {
		const { data: pixels, width } = imageData;
		const rowLen = width * 4;
		let i;
		let x;
		let y;
		let row;
		const rows = [];

		for (y = 0; y < pixels.length; y += rowLen) {
			row = new Uint8ClampedArray(imageData.width);
			x = 0;
			for (i = y; i < y + rowLen; i += 4) {
				row[x] = pixels[i];
				x += 1;
			}
			rows.push(row);
		}
		return rows;
	},

	detectEdges(imageData) {
		const preBlurredImageData =
			imageData.width >= BLUR_BEFORE_EDGE_DETECTION_MIN_WIDTH
				? filters.gaussianBlur(
						imageData,
						BLUR_BEFORE_EDGE_DETECTION_DIAMETER
					)
				: imageData;

		const grayscale = filters.luminance(preBlurredImageData);
		const sobelKernel = new Float32Array([1, 0, -1, 2, 0, -2, 1, 0, -1]);

		return filters.convolve(grayscale, sobelKernel, true);
	},

	detectBlur(pixels) {
		const width = pixels[0].length;
		const height = pixels.length;

		let x;
		let y;
		let value;
		let oldValue;
		let edgeStart;
		let edgeWidth;
		let bm;
		let percWidth;
		let numEdges = 0;
		let sumEdgeWidths = 0;

		for (y = 0; y < height; y += 1) {
			// Reset edge marker, none found yet
			edgeStart = -1;
			for (x = 0; x < width; x += 1) {
				value = pixels[y][x];
				// Edge is still open
				if (edgeStart >= 0 && x > edgeStart) {
					oldValue = pixels[y][x - 1];
					// Value stopped increasing => edge ended
					if (value < oldValue) {
						// Only count edges that reach a certain intensity
						if (oldValue >= MIN_EDGE_INTENSITY) {
							edgeWidth = x - edgeStart - 1;
							numEdges += 1;
							sumEdgeWidths += edgeWidth;
						}
						edgeStart = -1; // Reset edge marker
					}
				}
				// Edge starts
				if (value === 0) {
					edgeStart = x;
				}
			}
		}

		if (numEdges === 0) {
			bm = 0;
			percWidth = 0;
		} else {
			bm = sumEdgeWidths / numEdges;
			percWidth = (bm / width) * 100;
		}

		return {
			width,
			height,
			num_edges: numEdges,
			avg_edge_width: bm,
			avg_edge_width_perc: percWidth,
		};
	},
};

function measureBlur(imageData: ImageData): BlurredData {
	const edgeData = filters.detectEdges(imageData);
	const reducedPixelsData = filters.reducePixels(edgeData);

	return filters.detectBlur(reducedPixelsData);
}

// Convert to imageData
function convertToImageData(img: HTMLImageElement): ImageData | undefined {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	if (ctx == null) {
		return undefined;
	}
	const fixedWidth = 800;
	const scaleFactor = fixedWidth / img.width;
	canvas.width = fixedWidth;
	canvas.height = img.height * scaleFactor;
	ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
	return ctx.getImageData(0, 0, canvas.width, canvas.height);
}

export default async function preProcessImage(blob: Blob): Promise<{
	isBlurDetected: boolean;
	isContrastLow: boolean;
}> {
	return await new Promise((resolve, reject) => {
		const img = new Image();
		let blobUrl = '';
		blobUrl = URL.createObjectURL(blob);
		img.src = blobUrl;

		img.onload = function () {
			try {
				const imgData = convertToImageData(img);
				if (imgData == null) {
					resolve(defaultMetrics);
					return;
				}

				const blurResult = measureBlur(imgData);

				const isBlurDetected =
					blurResult.num_edges < NUMBER_EDGES_THRESHOLD ||
					blurResult.avg_edge_width > AVERAGE_EDGES_WIDTH_THRESHOLD ||
					blurResult.avg_edge_width_perc >
						AVERAGE_EDGES_WIDTH_PERC_THRESHOLD;

				const grayData = filters.convertToGrayscale(imgData);

				// Perform contrast detection
				const contrastValue = filters.computeContrast(grayData);

				const isContrastLow = contrastValue < CONTRAST_THRESHOLD;

				resolve({ isBlurDetected, isContrastLow });
			} catch (error) {
				reject(error);
			}
		};

		img.onerror = function (error) {
			reject(error);
		};
	});
}
