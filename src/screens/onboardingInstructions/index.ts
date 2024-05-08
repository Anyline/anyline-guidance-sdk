import createCloseSDKButton from './closeSDKButton';
import css from './index.module.css';
import createInstructionsBody from './instructionsBody';
import createStartCaptureProcessButton from './startCaptureProcessButton';

export default function createOnboardingInstructions(): HTMLDivElement {
	const onboardingInstructionsWrapper = document.createElement('div');
	onboardingInstructionsWrapper.className = css.onboardingInstructionsWrapper;
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
	const instructionsBody = createInstructionsBody();
	const startCaptureProcessButton = createStartCaptureProcessButton();

	onboardingInstructionsInner.appendChild(closeSDKButton);
	onboardingInstructionsInner.appendChild(instructionsBody);
	onboardingInstructionsInner.appendChild(startCaptureProcessButton);

	onboardingInstructionsWrapper.appendChild(onboardingInstructionsInner);

	return onboardingInstructionsWrapper;
}
