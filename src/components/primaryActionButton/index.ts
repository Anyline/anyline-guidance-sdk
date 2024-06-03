import css from './index.module.css';

export default function createPrimaryActionButton(): HTMLButtonElement {
	const button = document.createElement('button');

	button.className = css.button;

	button.type = 'button';

	return button;
}
