/* eslint-disable @typescript-eslint/unbound-method */
import FileInputManager from '../../src/modules/FileInputManager';

describe('FileInputManager', () => {
	let fileInputManager: FileInputManager;

	beforeEach(() => {
		fileInputManager = FileInputManager.getInstance();
	});

	afterEach(() => {
		fileInputManager.destroy();
	});

	it('should always return the same instance', () => {
		const fileInputManager2 = FileInputManager.getInstance();
		void expect(fileInputManager).toBe(fileInputManager2);
		fileInputManager2.destroy();
	});

	it('should return the file input element', () => {
		const fileInputElement = fileInputManager.getFileInputElement();
		void expect(fileInputElement).toBeInstanceOf(HTMLInputElement);
		void expect(fileInputElement.type).toBe('file');
	});

	it('onFileSet should resolve with the first file when a file is set', async () => {
		const fileInputElement = fileInputManager.getFileInputElement();
		const originalAddEventListener = fileInputElement.addEventListener;
		fileInputElement.addEventListener = (
			event: string,
			handler: EventListenerOrEventListenerObject
		) => {
			originalAddEventListener.call(fileInputElement, event, handler);
			if (event === 'change' && typeof handler === 'function') {
				handler.call(fileInputElement, new Event('change'));
			}
		};

		const mockFile = new File([''], 'test-image.png', {
			type: 'image/png',
		});
		Object.defineProperty(fileInputElement, 'files', {
			value: [mockFile],
			writable: true,
		});

		await expect(fileInputManager.onFileSet()).resolves.toEqual(mockFile);
	});

	it('should destroy fileinput manager instance', () => {
		void expect(FileInputManager.getInstance()).toBe(fileInputManager);
		fileInputManager.destroy();
		void expect(FileInputManager.getInstance()).not.toBe(fileInputManager);
	});
});
