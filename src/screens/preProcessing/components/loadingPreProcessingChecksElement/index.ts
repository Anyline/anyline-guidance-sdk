import css from './index.module.css';

export default function loadingPreProcessingChecksElement(): HTMLDivElement {
	const wrapper = document.createElement('div');

	wrapper.className = css.wrapper;

	wrapper.innerText = 'Pre-processing image, please wait...';

	return wrapper;
}
