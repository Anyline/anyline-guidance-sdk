import createShadowRoot from '../../lib/createShadowRoot';
import css from './index.module.css';

export default function createModal(
	containerElement: HTMLElement
): HTMLElement {
	const modal = document.createElement('div');
	modal.className = css.modal;

	modal.appendChild(containerElement);

	const shadowRoot = createShadowRoot();
	shadowRoot.appendChild(modal);

	return modal;
}
