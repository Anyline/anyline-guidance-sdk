import getBrowserLanguage, {
	BrowserLanguage,
} from '../../lib/getBrowserLanguage';
import css from './index.module.css';

export default function createButtonElement(): HTMLDivElement {
	const buttonWrapper = document.createElement('div');
	buttonWrapper.className = css.buttonWrapper;

	const button = document.createElement('button');
	button.className = css.button;
	button.id = 'captureButton';
	button.setAttribute('data-test-id', 'captureButton');

	// const browserLanguage = getBrowserLanguage();

	// button.innerText =
	// 	browserLanguage === BrowserLanguage.ENGLISH
	// 		? 'OPEN PHONE CAMERA'
	// 		: 'HANDY-KAMERA ÖFFNEN';

	button.innerText = 'Open Camera';

	buttonWrapper.appendChild(button);

	return buttonWrapper;
}
