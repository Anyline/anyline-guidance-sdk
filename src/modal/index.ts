import css from './index.module.css';

export default function createModal(
	containerElement: HTMLElement
): HTMLElement {
	// modal container
	const modal = document.createElement('div');
	modal.className = css.modal;
	// append modal to the body
	document.body.appendChild(modal);

	modal.appendChild(containerElement);

	return modal;
}
