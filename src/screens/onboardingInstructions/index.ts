import ComponentManager from '../../modules/ComponentManager';
import createCloseSDKButton from './closeSDKButton';
import css from './index.module.css';
import createHeadline from './instructionsBody/headline';
import createInstructions from './instructionsBody/instructions';
import createStartCaptureProcessButton from './startCaptureProcessButton';
import commonCSS from './instructionsBody/index.module.css';
import spinnerCSS from '../videoStream/spinner/index.module.css';

export default class OnboardingScreen extends ComponentManager {
	constructor() {
		super();
		const onboardingInstructionsWrapper = this.getElement();
		onboardingInstructionsWrapper.className =
			css.onboardingInstructionsWrapper;
		onboardingInstructionsWrapper.setAttribute(
			'data-testid',
			'components-onboarding-instructions-wrapper'
		);

		const onboardingInstructionsInner = document.createElement('div');
		onboardingInstructionsInner.className = css.onboardingInstructionsInner;
		onboardingInstructionsInner.setAttribute(
			'data-testid',
			'components-onboarding-instructions-inner'
		);

		const closeSDKButton = createCloseSDKButton();
		const headline = createHeadline();
		const instructions = createInstructions();

		onboardingInstructionsInner.appendChild(closeSDKButton);
		onboardingInstructionsInner.appendChild(headline);
		onboardingInstructionsInner.appendChild(instructions);

		const demoImageWrapper = document.createElement('div');
		demoImageWrapper.className = commonCSS.demoImageWrapper;
		const spinner = document.createElement('div');
		spinner.className = spinnerCSS.spinner;
		demoImageWrapper.appendChild(spinner);
		onboardingInstructionsInner.appendChild(demoImageWrapper);

		const startCaptureProcessButton = createStartCaptureProcessButton();
		onboardingInstructionsInner.appendChild(startCaptureProcessButton);

		onboardingInstructionsWrapper.appendChild(onboardingInstructionsInner);

		this.onMount(async () => {
			await import('./instructionsBody/demoInstructionsImage').then(
				demoImageModule => {
					demoImageWrapper.removeChild(spinner);

					const demoImage = demoImageModule.default();
					demoImageWrapper.appendChild(demoImage);
				}
			);
		});

		this.onUnmount(async () => {
			this.destroy();
		});
	}
}
