import { getImageBlob } from '..';
import css from './index.module.css';

export default async function createButtonElement(
	container: HTMLElement,
	stream: MediaStream
): Promise<Blob> {
	// Create the button element
	const button = document.createElement('button');
	button.className = css.button;
	button.innerText = 'Start Scanning';
	container.appendChild(button);

	// Return a promise that resolves when the button is clicked
	return await new Promise((resolve, reject) => {
		button.addEventListener('click', () => {
			getImageBlob(stream)
				.then(blob => {
					resolve(blob);
				})
				.catch(error => {
					reject(error);
				});
		});
	});
}
