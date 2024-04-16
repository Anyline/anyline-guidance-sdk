// @ts-expect-error - No type definitions available for image-capture.
import { ImageCapture } from 'image-capture';

export async function getImageBlob(stream: MediaStream): Promise<Blob> {
	const track = stream.getVideoTracks()[0];
	const imageCaptureInstance = new ImageCapture(track);
	const photoCapabilities = await imageCaptureInstance.getPhotoCapabilities();

	const maxImageWidth = photoCapabilities.imageWidth.max;
	const maxImageHeight = photoCapabilities.imageHeight.max;

	const blob = await imageCaptureInstance.takePhoto({
		imageHeight: maxImageHeight,
		imageWidth: maxImageWidth,
	});

	return blob;
}
