import getBrowserLanguage, {
	BrowserLanguage,
} from '../../lib/getBrowserLanguage';
import css from './index.module.css';

export default function createInstructionElement(
	container: HTMLElement
): HTMLElement {
	const instructionWrapper = document.createElement('div');
	instructionWrapper.className = css.instructionWrapper;

	const instruction = document.createElement('div');
	instruction.className = css.instruction;

	const browserLanguage = getBrowserLanguage();

	instruction.innerText =
		browserLanguage === BrowserLanguage.ENGLISH
			? 'Ready? Tap "OPEN PHONE CAMERA" and then take a picture'
			: 'Sind Sie bereit? Tippen Sie auf „HANDY-KAMERA ÖFFNEN“ und machen Sie ein Foto.';

	instructionWrapper.appendChild(instruction);

	container.appendChild(instructionWrapper);

	return instructionWrapper;
}
