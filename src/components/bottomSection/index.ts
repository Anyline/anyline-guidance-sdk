import css from './index.module.css';

export default function createBottomSection(
	instructionsElement: HTMLDivElement,
	captureButton: HTMLDivElement,
	container: HTMLDivElement
): void {
	const bottomSection = document.createElement('div');
	bottomSection.className = css.bottomSection;
	bottomSection.appendChild(instructionsElement);
	bottomSection.appendChild(captureButton);

	container.appendChild(bottomSection);
}
