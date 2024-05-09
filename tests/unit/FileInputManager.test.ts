/* eslint-disable @typescript-eslint/unbound-method */
import FileInputManager from '../../src/modules/FileInputManager';

describe('FileInputManager', () => {
	it('should always return the same instance', () => {
		const instance1 = FileInputManager.getInstance();
		const instance2 = FileInputManager.getInstance();
		void expect(instance1).toBe(instance2);
	});

	it('should return the file input element', () => {
		const fileInputManager = FileInputManager.getInstance();
		const fileInputElement = fileInputManager.getFileInputElement();

		void expect(fileInputElement).toBeInstanceOf(HTMLInputElement);
		void expect(fileInputElement.type).toBe('file');
	});

	it('onFileSet should resolve with the first file when a file is set', async () => {
		const fileInputManager = FileInputManager.getInstance();
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
		const fileInputManager = FileInputManager.getInstance();
		void expect(FileInputManager.getInstance()).toBe(fileInputManager);
		fileInputManager.destroy();
		void expect(FileInputManager.getInstance()).not.toBe(fileInputManager);
	});
});
