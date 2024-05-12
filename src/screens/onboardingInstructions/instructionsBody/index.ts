import createdemoImage from './demoInstructionsImage';
import createHeadline from './headline';
import createInstructions from './instructions';
import css from './index.module.css';

export default function createInstructionsBody(): HTMLDivElement {
	const instructionBodyWrapper = document.createElement('div');

	const headline = createHeadline();

	const instructionsBody = document.createElement('div');

	instructionsBody.className = css.instructionsBody;

	const instructions = createInstructions();
	const demoImage = createdemoImage();

	instructionsBody.appendChild(instructions);
	instructionsBody.appendChild(demoImage);

	instructionBodyWrapper.appendChild(headline);
	instructionBodyWrapper.appendChild(instructionsBody);

	return instructionBodyWrapper;
}
