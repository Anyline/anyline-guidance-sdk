import closeSDK from '../../../lib/closeSDK';
import LocalStorageManager from '../../../modules/LocalStorageManager';
import Router from '../../../modules/Router';
import commonCSS from '../../onboardingInstructions/closeSDKButton/index.module.css';
import css from './index.module.css';

export default function createCloseElement(): HTMLButtonElement {
	const button = document.createElement('button');
	button.className = commonCSS.button;
	button.id = 'closeButton';
	button.setAttribute('data-test-id', 'closeButton');
	button.innerHTML = `<div class=${css.buttonInner}><div>&#10132;</div></div>`;

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
