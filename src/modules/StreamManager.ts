export default class StreamManager {
	private static instance: StreamManager | null = null;
	private stream: MediaStream | null = null;

	private constructor() {}

	public static getInstance(): StreamManager {
		if (StreamManager.instance === null) {
			StreamManager.instance = new StreamManager();
		}
		return StreamManager.instance;
	}

	public async getStream(device?: MediaDeviceInfo): Promise<MediaStream> {
		if (this.stream === null) {
			const constraints = {
				video: { deviceId: { exact: device?.deviceId } },
			};
			try {
				this.stream =
					await navigator.mediaDevices.getUserMedia(constraints);
			} catch (error) {
				console.error('Failed to initialize the media stream:', error);
				throw error;
			}
		}
		return this.stream;
	}

	public destroy(): void {
		if (this.stream !== null) {
			this.stream.getTracks().forEach(track => {
				track.stop();
			});
			this.stream = null;
		}
		StreamManager.instance = null;
	}
}
