import css from './index.module.css';
import url from './assets/demoImage.png';

export default function createdemoImage(): HTMLDivElement {
	const demoImageWrapper = document.createElement('div');
	demoImageWrapper.className = css.demoImageWrapper;

	const demoImage = new Image();
	demoImage.src = url;

	demoImageWrapper.appendChild(demoImage);

	return demoImageWrapper;
}
