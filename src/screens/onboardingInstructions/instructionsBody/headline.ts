import css from './index.module.css';

export default function createHeadline(): HTMLDivElement {
	const headlineWrapper = document.createElement('div');
	headlineWrapper.className = css.headlineWrapper;

	const headline = document.createElement('span');

	headline.innerText = 'Snap perfectly';

	headlineWrapper.appendChild(headline);

	return headlineWrapper;
}
