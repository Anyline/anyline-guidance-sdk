import closeSDK from '../../../lib/closeSDK';
import createBackButton from '../../../components/backButton';

export default function createCloseSDKButton(): HTMLButtonElement {
	const button = createBackButton();
	button.setAttribute(
		'data-testid',
		'components-onboarding-instructions-close-sdk-button'
	);

	button.onclick = () => {
		closeSDK();
	};

	return button;
}
