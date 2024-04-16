import {
	backCameraKeywords,
	iosNonWideBackCameraLabels,
} from '../constants/cameraLabels';

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

export async function getNonWideAngleCamera(): Promise<MediaDeviceInfo> {
	try {
		const stream = await navigator.mediaDevices.getUserMedia({
			video: true,
		});
		stream.getTracks().forEach(track => {
			track.stop();
		});
	} catch (err) {
		let errorMessage = 'An error occurred';
		if (typeof err === 'string') {
			errorMessage = err;
		} else if (err instanceof Error) {
			errorMessage = err.message;
		}
		return await Promise.reject(new Error(errorMessage));
	}
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
