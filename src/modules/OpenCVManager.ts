export default class OpenCVManager {
	private static instance: OpenCVManager | null = null;
	private readonly script: HTMLScriptElement =
		document.createElement('script');

	private readonly opencvLoadedPromise: Promise<void>;
	private opencvLoadedResolve: (() => void) | null = null;
	private opencvLoadedReject: ((reason?: any) => void) | null = null;

	private constructor() {
		this.opencvLoadedPromise = new Promise<void>((resolve, reject) => {
			this.opencvLoadedResolve = resolve;
			this.opencvLoadedReject = reject;
		});
	}

	public static getInstance(): OpenCVManager {
		if (OpenCVManager.instance === null) {
			OpenCVManager.instance = new OpenCVManager();
		}
		return OpenCVManager.instance;
	}

	public loadOpenCV(): void {
		if (
			Boolean((window as any).cv?.getBuildInformation()) &&
			this.opencvLoadedResolve !== null
		) {
			this.opencvLoadedResolve();
			return;
		}

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
		this.script.onerror = () => {
			if (this.opencvLoadedReject !== null) {
				this.opencvLoadedReject(
					new Error('Failed to load OpenCV script')
				);
			}
		};
	}

	public onLoad(callback: (error?: Error) => Promise<void>): void {
		this.opencvLoadedPromise
			.then(async () => {
				await callback();
			})
			.catch(async error => {
				await callback(error as Error);
			});
	}

	public destroy(): void {
		if (this.script.parentNode != null) {
			this.script.parentNode.removeChild(this.script);
		}
		OpenCVManager.instance = null;
		delete (global as any).cv;
	}
}
