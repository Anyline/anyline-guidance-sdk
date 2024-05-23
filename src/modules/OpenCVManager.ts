export default class OpenCVManager {
	private static instance: OpenCVManager | null = null;
	private readonly script: HTMLScriptElement =
		document.createElement('script');

	private opencvLoadedPromiseCallback: (() => Promise<void>) | null = null;

	public static getInstance(): OpenCVManager {
		if (OpenCVManager.instance === null) {
			OpenCVManager.instance = new OpenCVManager();
		}
		return OpenCVManager.instance;
	}

	private constructor() {}

	public loadOpenCV(): void {
		this.script.type = 'text/javascript';
		this.script.src = 'https://docs.opencv.org/4.9.0/opencv.js';
		this.script.setAttribute('data-testid', 'modules-opencvmanager');
		this.script.id = 'anyline-guidance-sdk-opencv';
		const head = document.getElementsByTagName('head')[0];
		head.appendChild(this.script);
		this.script.onload = async () => {
			cv.onRuntimeInitialized = async () => {
				if (this.opencvLoadedPromiseCallback !== null)
					await this.opencvLoadedPromiseCallback();
			};
		};
	}

	public onLoad(callback: () => Promise<void>): void {
		this.opencvLoadedPromiseCallback = callback;
	}

	public destroy(): void {
		if (this.script.parentNode != null) {
			this.script.parentNode.removeChild(this.script);
		}
		OpenCVManager.instance = null;
	}
}
