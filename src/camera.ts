// @ts-expect-error - No type definitions available for image-capture.
import { ImageCapture } from 'image-capture';

import {
	backCameraKeywords,
	iosNonWideBackCameraLabels,
} from './constants/cameraLabels';
import cameraResolutions from './constants/cameraResolutions';
import createModal from './modal';
import createContainerElemenet from './container';
import createButtonElement from './button';

function isBackCameraLabel(label: string): boolean {
	const lowercaseLabel = label.toLowerCase();
	return backCameraKeywords.some(keyword => lowercaseLabel.includes(keyword));
}

function isNotIosWideAngleCamera(label: string): boolean {
	const lowercaseLabel = label.toLowerCase();
	return iosNonWideBackCameraLabels.some(iosLabel =>
		lowercaseLabel.includes(iosLabel.toLowerCase())
	);
}

async function getHighResolutionNonWideAngleCamera(): Promise<MediaDeviceInfo> {
	const stream = await navigator.mediaDevices.getUserMedia({ video: true });
	stream.getTracks().forEach(track => {
		track.stop();
	});
	const allDevices = await navigator.mediaDevices.enumerateDevices();

	const videoDevices = allDevices.filter(
		device => device.kind === 'videoinput'
	);

	if (videoDevices?.length === 0) {
		return await Promise.reject(new Error('No video device found'));
	}

	const ua = navigator.userAgent.toLowerCase();
	const isAndroid = ua.includes('android');

	let backCameras = videoDevices.filter(
		device =>
			isBackCameraLabel(device.label) &&
			(isAndroid || isNotIosWideAngleCamera(device.label))
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
			deviceId: { exact: device.deviceId },
			width: { ideal: resolution.width },
			height: { ideal: resolution.height },
			facingMode: {
				ideal: 'environment',
			},
		},
	}));

	for (let i = 0; i < constraintsList.length; i++) {
		try {
			const stream = await navigator.mediaDevices.getUserMedia(
				constraintsList[i]
			);
			if (stream !== null && stream !== undefined) {
				return stream;
			}
		} catch (error) {
			console.log(
				`Attempt for resolution ${constraintsList[i].video.width.ideal}x${constraintsList[i].video.height.ideal} failed:`,
				error
			);
		}
	}

	const fallbackConstraints = {
		video: {
			deviceId: { exact: device.deviceId },
		},
	};

	try {
		const stream =
			await navigator.mediaDevices.getUserMedia(fallbackConstraints);
		return stream;
	} catch (error: any) {
		console.error('Final attempt failed:', error.name, error.message);
		return await Promise.reject(Error('No suitable constraints found'));
	}
}

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

async function init(): Promise<Blob> {
	if (
		navigator.mediaDevices === null ||
		navigator.mediaDevices === undefined
	) {
		await Promise.reject(new Error('Unsupported device'));
	}
	const device = await getHighResolutionNonWideAngleCamera();
	const stream = await getHighestResolutionStream(device);
	const container = createContainerElemenet(stream);

	const modal = createModal(container);

	return await createButtonElement(container, stream, modal);
}

export default init;
