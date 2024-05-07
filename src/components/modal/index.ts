import css from './index.module.css';

export default function createModal(
	shadowRoot: HTMLDivElement | ShadowRoot
): HTMLDivElement {
	const modal = document.createElement('div');
	modal.className = css.modal;
	modal.setAttribute('data-testid', 'components-modal');

	shadowRoot.appendChild(modal);

	return modal;
}
