import closeSDK from '../../../lib/closeSDK';
import css from './index.module.css';

export default function createCloseSDKButton(): HTMLButtonElement {
	const button = document.createElement('button');
	button.className = `${css.button} ${css.buttonPosition}`;
	button.setAttribute(
		'data-testid',
		'components-onboarding-instructions-close-sdk-button'
	);
	button.innerHTML = `<div class='${css.buttonInner} ${css.buttonInnerPosition}'><div>&#x2715;</div></div>`;
	button.type = 'button';

	button.onclick = () => {
		closeSDK();
	};

	return button;
}
