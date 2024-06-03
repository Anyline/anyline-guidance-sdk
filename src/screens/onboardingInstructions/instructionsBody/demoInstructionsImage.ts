import css from './index.module.css';
import url from './assets/demoImage.gif';

export default function createdemoImage(): HTMLDivElement {
	const demoImageWrapper = document.createElement('div');
	demoImageWrapper.className = css.demoImageWrapper;

	const demoImage = new Image();
	demoImage.src = url;
	demoImage.style.borderRadius = '16px';

	demoImageWrapper.appendChild(demoImage);

	return demoImageWrapper;
}
