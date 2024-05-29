import ComponentManager from '../../modules/ComponentManager';
import createCloseSDKButton from './closeSDKButton';
import css from './index.module.css';
import createdemoImage from './instructionsBody/demoInstructionsImage';
import createHeadline from './instructionsBody/headline';
import createInstructions from './instructionsBody/instructions';
import createStartCaptureProcessButton from './startCaptureProcessButton';

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
		const demoImage = createdemoImage();
		const startCaptureProcessButton = createStartCaptureProcessButton();

		onboardingInstructionsInner.appendChild(closeSDKButton);
		onboardingInstructionsInner.appendChild(headline);
		onboardingInstructionsInner.appendChild(instructions);
		onboardingInstructionsInner.appendChild(demoImage);
		onboardingInstructionsInner.appendChild(startCaptureProcessButton);

		onboardingInstructionsWrapper.appendChild(onboardingInstructionsInner);

		this.onUnmount(async () => {
			this.destroy();
		});
	}
}
