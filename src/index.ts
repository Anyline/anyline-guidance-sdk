// TODOs
// 1. DONE Make video element parameterized
// 3. Add config to getImage function
// 4. Introduce sonarcloud, eslint, ci pipeline, yarn
// 5. Ship typescript module
// 6. DONE Remove vite
// 7. DONE Use ImageCapture polyfill from npm
// 8. DONE Check why importing the function doesn't work on browser

// @ts-expect-error - No type definitions available for image-capture.
import { ImageCapture } from 'image-capture';

import {
	backCameraKeywords,
	iosWideBackCameraLabels,
} from './constants/cameraLabels';
import cameraResolutions from './constants/cameraResolutions';
import createModal from './modal/modal';
import createVideoElementWithStream from './video/video';

function isBackCameraLabel(label: string): boolean {
	const lowercaseLabel = label.toLowerCase();
	return backCameraKeywords.some(keyword => lowercaseLabel.includes(keyword));
}

function isNotIosWideAngleCamera(label: string): boolean {
	const lowercaseLabel = label.toLowerCase();
	return !iosWideBackCameraLabels.some(iosLabel =>
		lowercaseLabel.includes(iosLabel.toLowerCase())
	);
}

async function getHighResolutionNonWideAngleCamera(): Promise<MediaDeviceInfo> {
	const allDevices = await navigator.mediaDevices.enumerateDevices();

	const videoDevices = allDevices.filter(
		device => device.kind === 'videoinput'
	);

	if (videoDevices?.length === 0) {
		return await Promise.reject(new Error('No video device found'));
	}

	let backCameras = videoDevices.filter(
		device =>
			isBackCameraLabel(device.label) &&
			isNotIosWideAngleCamera(device.label)
	);

	backCameras = backCameras.reverse();

	let chosenCamera: MediaDeviceInfo;

	if (backCameras.length > 0) chosenCamera = backCameras[0];
	else chosenCamera = videoDevices[0];

	return chosenCamera;
}

async function getHighestResolutionStream(
	device: MediaDeviceInfo
): Promise<MediaStream> {
	const constraintsList = cameraResolutions.map(resolution => ({
		video: {
			deviceId:
				device !== undefined && device !== null
					? { exact: device.deviceId }
					: undefined,
			width: { ideal: resolution.width },
			height: { ideal: resolution.height },
			facingMode: 'environment',
		},
	}));

	for (let i = 0; i < constraintsList.length; i++) {
		try {
			const stream = await navigator.mediaDevices.getUserMedia(
				constraintsList[i]
			);
			if (stream !== null && stream !== undefined) return stream;
		} catch (error) {
			console.log(
				`Attempt for resolution ${constraintsList[i].video.width.ideal}x${constraintsList[i].video.height.ideal} failed:`,
				error
			);
		}
	}

	return await Promise.reject(Error('No suitable constraints found'));
}

async function getImageBlob(stream: MediaStream): Promise<Blob> {
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

async function init(): Promise<Blob> {
	if (
		navigator.mediaDevices === null ||
		navigator.mediaDevices === undefined
	) {
		await Promise.reject(new Error('Unsupported device'));
	}
	const device = await getHighResolutionNonWideAngleCamera();
	const stream = await getHighestResolutionStream(device);
	const modal = createModal();
	createVideoElementWithStream(modal, stream);
	return await getImageBlob(stream);
}

(window as any).Anyline = { init };

export default init;
