import closeSDK from '../../../lib/closeSDK';
import css from './index.module.css';
import backArrow from './assets/backArrow.svg';

export default function createCloseSDKButton(): HTMLButtonElement {
	const button = document.createElement('button');
	button.className = css.button;
	button.setAttribute(
		'data-testid',
		'components-onboarding-instructions-close-sdk-button'
	);

	const buttonArrowImage = document.createElement('img');
	buttonArrowImage.className = css.buttonArrowImage;
	buttonArrowImage.src = backArrow;

	button.appendChild(buttonArrowImage);

	button.type = 'button';

	button.onclick = () => {
		closeSDK();
	};

	return button;
}
