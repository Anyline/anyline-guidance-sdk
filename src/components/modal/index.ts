import css from './index.module.css';

export default function createModal(
	shadowRoot: HTMLDivElement | ShadowRoot,
	containerElement: HTMLElement
): HTMLElement {
	const modal = document.createElement('div');
	modal.className = css.modal;

	modal.appendChild(containerElement);

	shadowRoot.appendChild(modal);

	return modal;
}
