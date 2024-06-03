import createInstructionsList from '../../../components/instructionsList';
import css from './index.module.css';

export default function createInstructions(): HTMLDivElement {
	const instructionsWrapper = document.createElement('div');
	instructionsWrapper.className = css.instructionsWrapper;

	const instructions = createInstructionsList(`
  <li>Place the tire within the <b>overlay</b></li>
  <li><b>Keep still</b> and <b>open the camera</b></li>
`);

	instructionsWrapper.appendChild(instructions);

	return instructionsWrapper;
}
