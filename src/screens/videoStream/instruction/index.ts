import css from './index.module.css';

export default function createInstructionElement(): HTMLDivElement {
	const instructionWrapper = document.createElement('div');
	instructionWrapper.className = css.instructionWrapper;

	const instruction = document.createElement('div');
	instruction.className = css.instruction;

	instruction.innerHTML = `
    <div class=${css.instructionsList}>
      <div>1 - <b>Align</b> the tire within the <b>overlay</b></div>
      <div>2 - Hold <b>steady</b></div>
      <div>3 - <b>Open the camera</b> for capture</div>
    </div>
  `;

	instructionWrapper.appendChild(instruction);

	return instructionWrapper;
}
