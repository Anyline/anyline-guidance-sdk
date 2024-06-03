import closeSDK from '../../../lib/closeSDK';
import LocalStorageManager from '../../../modules/LocalStorageManager';
import Router from '../../../modules/Router';
import createBackButton from '../../../components/backButton';

export default function createCloseElement(): HTMLButtonElement {
	const button = createBackButton();
	button.id = 'closeButton';
	button.setAttribute('data-test-id', 'closeButton');

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
