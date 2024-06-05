import css from './index.module.css';
import createInstructionsList from '../../../components/instructionsList';

export default function createInstructionElement(): HTMLDivElement {
	const wrapper = document.createElement('div');
	wrapper.className = css.wrapper;

	const instruction =
		createInstructionsList(`<li><b>Align</b> the tire within the <b>overlay</b></li>
  <li>Hold <b>steady</b></li>
  <li>Tap Continue to <b>open the camera</b></li>`);

	wrapper.appendChild(instruction);

	return wrapper;
}
