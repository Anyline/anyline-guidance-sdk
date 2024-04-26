import css from './index.module.css';

export default function createButtonElement(
	container: HTMLElement
): HTMLButtonElement {
	const button = document.createElement('button');
	button.className = css.button;
	button.id = 'captureButton';
	button.setAttribute('data-test-id', 'captureButton');
	button.innerHTML = `<div class=${css.buttonInner}><div>Capture</div></div>`;
	container.appendChild(button);

	return button;
}
