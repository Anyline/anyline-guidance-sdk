import getBrowserLanguage, {
	BrowserLanguage,
} from '../../lib/getBrowserLanguage';
import css from './index.module.css';

export default function createButtonElement(
	container: HTMLElement
): HTMLButtonElement {
	const button = document.createElement('button');
	button.className = css.button;
	button.id = 'captureButton';
	button.setAttribute('data-test-id', 'captureButton');

	const browserLanguage = getBrowserLanguage();

	button.innerText =
		browserLanguage === BrowserLanguage.ENGLISH
			? 'OPEN PHONE CAMERA'
			: 'HANDY-KAMERA ÖFFNEN';
	container.appendChild(button);

	return button;
}
