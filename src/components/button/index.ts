import css from './index.module.css';

export default async function createButtonElement(
	container: HTMLElement
): Promise<{ clicked: boolean }> {
	// Create the button element
	const button = document.createElement('button');
	button.className = css.button;
	button.id = 'captureButton';
	button.setAttribute('data-test-id', 'captureButton');
	button.innerHTML = `<div class=${css.buttonInner}><div>Capture</div></div>`;
	container.appendChild(button);

	return await new Promise(resolve => {
		button.addEventListener('click', () => {
			button.innerHTML = `<div class=${css.buttonInner}><div>Please wait...</div><div class=${css.spinner}></div></div>`;
			button.disabled = true;
			button.style.cursor = 'not-allowed';
			resolve({ clicked: true });
		});
	});
}
