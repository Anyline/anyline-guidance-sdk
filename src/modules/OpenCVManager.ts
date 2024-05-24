export default class OpenCVManager {
	private static instance: OpenCVManager | null = null;
	private readonly script: HTMLScriptElement =
		document.createElement('script');

	private readonly opencvLoadedPromise: Promise<void>;
	private opencvLoadedResolve: (() => void) | null = null;

	private constructor() {
		this.opencvLoadedPromise = new Promise<void>(resolve => {
			this.opencvLoadedResolve = resolve;
		});
	}

	public static getInstance(): OpenCVManager {
		if (OpenCVManager.instance === null) {
			OpenCVManager.instance = new OpenCVManager();
		}
		return OpenCVManager.instance;
	}

	public loadOpenCV(): void {
		if (document.getElementById('anyline-guidance-sdk-opencv') != null)
			return;

		this.script.type = 'text/javascript';
		this.script.src = 'https://docs.opencv.org/4.9.0/opencv.js';
		this.script.setAttribute('data-testid', 'modules-opencvmanager');
		this.script.id = 'anyline-guidance-sdk-opencv';
		const head = document.getElementsByTagName('head')[0];
		head.appendChild(this.script);
		this.script.onload = () => {
			cv.onRuntimeInitialized = () => {
				if (this.opencvLoadedResolve !== null) {
					this.opencvLoadedResolve();
				}
			};
		};
	}

	public onLoad(callback: () => Promise<void>): void {
		void this.opencvLoadedPromise.then(callback);
	}
}
