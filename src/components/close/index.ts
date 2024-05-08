import closeSDK from '../../camera/closeSDK';
import css from './index.module.css';

export default function createCloseElement(container: HTMLElement): void {
	const button = document.createElement('button');
	button.className = css.button;
	button.id = 'closeButton';
	button.setAttribute('data-test-id', 'closeButton');
	button.innerHTML = `<div class=${css.buttonInner}><div>&#x2715;</div></div>`;
	container.appendChild(button);

	button.addEventListener('click', () => {
		closeSDK();
	});
}
