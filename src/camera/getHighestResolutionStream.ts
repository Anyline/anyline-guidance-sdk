import cameraResolutions from '../constants/cameraResolutions';

export async function getHighestResolutionStream(
	device: MediaDeviceInfo
): Promise<MediaStream> {
	const constraintsList = cameraResolutions.map(resolution => ({
		video: {
			deviceId: { exact: device.deviceId },
			width: { ideal: resolution.width },
			height: { ideal: resolution.height },
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
