import css from './index.module.css';

export default function createSpinner(): HTMLDivElement {
	const spinnerWrapper = document.createElement('div');
	spinnerWrapper.className = css.spinnerWrapper;

	const spinner = document.createElement('div');
	spinner.className = css.spinner;

	spinnerWrapper.appendChild(spinner);

	return spinnerWrapper;
}
