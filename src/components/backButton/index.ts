import css from './index.module.css';
import backArrow from './assets/backArrow.svg';

export default function createBackButton(): HTMLButtonElement {
	const button = document.createElement('button');
	button.type = 'button';

	button.className = css.button;

	const buttonArrowImage = document.createElement('img');
	buttonArrowImage.src = backArrow;

	button.appendChild(buttonArrowImage);

	return button;
}
