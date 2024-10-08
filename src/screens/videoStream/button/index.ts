import VideoStreamScreen from '..';
import FileInputManager from '../../../modules/FileInputManager';
import ImageChecker from '../../../modules/ImageChecker';
import Router from '../../../modules/Router';
import PreProcessingScreen from '../../preProcessing';
import css from './index.module.css';
import rightArrow from './assets/rightArrow.svg';
import createPrimaryActionButton from '../../../components/primaryActionButton';

export default function createButtonElement(): HTMLDivElement {
	const buttonWrapper = document.createElement('div');
	buttonWrapper.className = css.buttonWrapper;

	const button = createPrimaryActionButton();
	button.id = 'captureButton';
	button.setAttribute('data-test-id', 'captureButton');

	const buttonText = document.createElement('div');
	buttonText.innerText = 'Continue';

	const buttonArrowImageWrapper = document.createElement('div');
	buttonArrowImageWrapper.className = css.buttonArrowImageWrapper;
	const buttonArrowImage = document.createElement('img');
	buttonArrowImage.className = css.buttonArrowImage;
	buttonArrowImage.src = rightArrow;
	buttonArrowImageWrapper.appendChild(buttonArrowImage);

	button.appendChild(buttonText);
	button.appendChild(buttonArrowImageWrapper);

	button.onclick = async () => {
		const fileInputManager = FileInputManager.getInstance();
		const fileInput = fileInputManager.getFileInputElement();
		fileInput.click();
		const routerManager = Router.getInstance();

		await fileInputManager
			.onFileSet()
			.then(file => {
				const imagechecker = ImageChecker.getInstance();
				imagechecker.setImageBlob(file);

				const preProcessingScreen =
					PreProcessingScreen.getInstance().getElement();

				routerManager.pop();
				routerManager.push(preProcessingScreen);
			})
			.catch(e => {
				routerManager.pop();

				setTimeout(() => {
					const videoStreamScreenManager =
						VideoStreamScreen.getInstance();
					const videoStreamScreen =
						videoStreamScreenManager.getElement();
					routerManager.push(videoStreamScreen);
				}, 0);
			});
	};

	buttonWrapper.appendChild(button);

	return buttonWrapper;
}
