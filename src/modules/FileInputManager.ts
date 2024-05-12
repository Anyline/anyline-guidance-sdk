export default class FileInputManager {
	private static instance: FileInputManager | null = null;
	private readonly fileInput: HTMLInputElement =
		document.createElement('input');

	private fileChangeListener:
		| ((this: GlobalEventHandlers, event: Event) => any)
		| null = null;

	private fileCancelListener:
		| ((this: GlobalEventHandlers, event: Event) => any)
		| null = null;

	constructor() {
		this.fileInput.type = 'file';
		this.fileInput.accept = 'image/*';
		this.fileInput.capture = 'camera';
		this.fileInput.style.display = 'none';
	}

	public static getInstance(): FileInputManager {
		if (FileInputManager.instance === null) {
			FileInputManager.instance = new FileInputManager();
		}
		return FileInputManager.instance;
	}

	public getFileInputElement(): HTMLInputElement {
		return this.fileInput;
	}

	public async onFileSet(): Promise<File> {
		return await new Promise((resolve, reject) => {
			this.fileChangeListener = () => {
				if (
					this.fileInput.files != null &&
					this.fileInput.files.length > 0
				) {
					resolve(this.fileInput.files[0]);
				}
			};
			this.fileCancelListener = () => {
				reject(new Error('File selection was cancelled'));
			};
			this.fileInput.addEventListener('change', this.fileChangeListener);
			this.fileInput.addEventListener('cancel', this.fileCancelListener);
		});
	}

	public destroy(): void {
		if (this.fileChangeListener != null) {
			this.fileInput.removeEventListener(
				'change',
				this.fileChangeListener
			);
		}
		if (this.fileCancelListener != null) {
			this.fileInput.removeEventListener(
				'cancel',
				this.fileCancelListener
			);
		}
		FileInputManager.instance = null;
	}
}
