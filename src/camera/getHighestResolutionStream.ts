export async function getHighestResolutionStream(
	device: MediaDeviceInfo
): Promise<MediaStream> {
	const constraints = {
		video: {
			deviceId: { exact: device.deviceId },
		},
	};
	try {
		const stream = await navigator.mediaDevices.getUserMedia(constraints);
		return stream;
	} catch (error: any) {
		console.error('Final attempt failed:', error.name, error.message);
		return await Promise.reject(Error('No suitable constraints found'));
	}
}
