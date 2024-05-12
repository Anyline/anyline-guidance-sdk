import css from './index.module.css';

export default function createModal(
	shadowRoot: HTMLDivElement | ShadowRoot
): HTMLDivElement {
	const modal = document.createElement('div');
	modal.className = css.modal;
	modal.setAttribute('data-testid', 'components-modal');

	const modalBackground = document.createElement('div');

	modalBackground.className = css.modalBackground;

	modal.appendChild(modalBackground);

	shadowRoot.appendChild(modal);

	return modal;
}
