import createdemoImage from './demoInstructionsImage';
import createHeadline from './headline';
import createInstructions from './instructions';

export default function createInstructionsBody(): HTMLDivElement {
	const instructionBodyWrapper = document.createElement('div');

	const headline = createHeadline();
	const instructions = createInstructions();
	const demoImage = createdemoImage();

	instructionBodyWrapper.appendChild(headline);
	instructionBodyWrapper.appendChild(instructions);
	instructionBodyWrapper.appendChild(demoImage);

	return instructionBodyWrapper;
}
