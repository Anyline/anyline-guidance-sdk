import css from './index.module.css';

export default function createButtonElement(
	container: HTMLElement
): HTMLButtonElement {
	const button = document.createElement('button');
	button.className = css.button;
	button.id = 'captureButton';
	button.setAttribute('data-test-id', 'captureButton');
	button.innerText = `OPEN PHONE CAMERA`;
	container.appendChild(button);

	return button;
}
