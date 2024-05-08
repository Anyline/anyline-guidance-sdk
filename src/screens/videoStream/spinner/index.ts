export default function createSpinner(): HTMLDivElement {
	const spinnerWrapper = document.createElement('div');
	spinnerWrapper.innerHTML = 'Loading';

	return spinnerWrapper;
}
