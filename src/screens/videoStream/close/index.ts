import closeSDK from '../../../lib/closeSDK';
import LocalStorageManager from '../../../modules/LocalStorageManager';
import Router from '../../../modules/Router';
import commonCSS from '../../onboardingInstructions/closeSDKButton/index.module.css';
import backArrow from '../../onboardingInstructions/closeSDKButton/assets/backArrow.svg';

export default function createCloseElement(): HTMLButtonElement {
	const button = document.createElement('button');
	button.className = commonCSS.button;
	button.id = 'closeButton';
	button.setAttribute('data-test-id', 'closeButton');

	const buttonArrowImage = document.createElement('img');
	buttonArrowImage.className = commonCSS.buttonArrowImage;
	buttonArrowImage.src = backArrow;

	button.appendChild(buttonArrowImage);

	button.type = 'button';

	button.onclick = () => {
		const localStorageManager = LocalStorageManager.getInstance();

		const timesShown =
			localStorageManager.getTimesOnboardingInstructionsShown();

		if (timesShown !== null && timesShown === 0) {
			closeSDK();
			return;
		}

		const routerManager = Router.getInstance();
		routerManager.pop();
	};

	return button;
}
