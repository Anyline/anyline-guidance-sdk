import { getImageBlob } from '../camera';
import css from './index.module.css';

export default async function createButtonElement(
	container: HTMLElement,
	stream: MediaStream,
	modal: HTMLElement
): Promise<Blob> {
	// Create the button element
	const button = document.createElement('button');
	button.className = css.button;
	button.id = 'captureButton';
	button.setAttribute('data-test-id', 'captureButton');
	button.innerHTML = `<div class=${css.buttonInner}><div>Capture</div></div>`;
	container.appendChild(button);

	return await new Promise((resolve, reject) => {
		button.addEventListener('click', () => {
			button.innerHTML = `<div class=${css.buttonInner}><div>Please wait...</div><div class=${css.spinner}></div></div>`;
			button.disabled = true;
			button.style.cursor = 'not-allowed';
			getImageBlob(stream)
				.then(blob => {
					stream.getTracks().forEach(track => {
						track.stop();
					});
					modal.remove();
					resolve(blob);
				})
				.catch(error => {
					reject(error);
				});
		});
	});
}
