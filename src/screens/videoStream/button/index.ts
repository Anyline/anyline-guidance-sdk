import closeSDK from '../../../camera/closeSDK';
import FileInputManager from '../../../modules/FileInputManager';
import ImageManager from '../../../modules/ImageManager';
import css from './index.module.css';

export default function createButtonElement(): HTMLDivElement {
	const buttonWrapper = document.createElement('div');
	buttonWrapper.className = css.buttonWrapper;

	const button = document.createElement('button');
	button.className = css.button;
	button.id = 'captureButton';
	button.setAttribute('data-test-id', 'captureButton');

	button.innerText = 'Open Camera';

	button.onclick = async event => {
		const fileInputManager = FileInputManager.getInstance();
		const imageManager = ImageManager.getInstance();
		const fileInput = fileInputManager.getFileInputElement();
		fileInput.click();
		await fileInputManager
			.onFileSet()
			.then(file => {
				imageManager.setImageBlob(file);
				closeSDK();
			})
			.catch(e => {
				console.log('e', e);
			});
	};

	buttonWrapper.appendChild(button);

	return buttonWrapper;
}
