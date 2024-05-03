import css from './index.module.css';

export default function createInstructionElement(
	container: HTMLElement
): HTMLElement {
	const instructionWrapper = document.createElement('div');
	instructionWrapper.className = css.instructionWrapper;

	const instruction = document.createElement('div');
	instruction.className = css.instruction;

	instruction.innerText = `Ready? Tap "OPEN PHONE CAMERA" and then take a picture`;

	instructionWrapper.appendChild(instruction);

	container.appendChild(instructionWrapper);

	return instructionWrapper;
}
