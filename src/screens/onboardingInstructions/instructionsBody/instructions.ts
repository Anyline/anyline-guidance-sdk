import css from './index.module.css';

export default function createInstructions(): HTMLDivElement {
	const instructionsWrapper = document.createElement('div');
	instructionsWrapper.className = css.instructionsWrapper;

	const instructions = document.createElement('p');

	instructions.innerHTML =
		'As the first step, an overlay will guide you in placing the tire. <br /> Once positioned correctly, keep still and tap to open the camera for capture.';

	instructionsWrapper.appendChild(instructions);

	return instructionsWrapper;
}
