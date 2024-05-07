import createHost from '../../lib/createHost';
import createShadowRoot from '../../lib/createShadowRoot';
import css from './index.module.css';

function createCloseSDKButton(): HTMLDivElement {
	const buttonWrapper = document.createElement('div');
	buttonWrapper.className = css.closeSDKButtonWrapper;
	buttonWrapper.setAttribute(
		'data-testid',
		'components-onboarding-instructions-close-sdk-button-wrapper'
	);
	const button = document.createElement('button');
	button.className = css.closeSDKButton;
	button.setAttribute(
		'data-testid',
		'components-onboarding-instructions-close-sdk-button'
	);

	// todo: remove host and shadowroot from here
	const host = createHost();
	const shadowRoot = createShadowRoot(host);
	button.addEventListener('click', () => {
		shadowRoot.innerHTML = '';
	});

	buttonWrapper.appendChild(button);
	return buttonWrapper;
}

export default function createOnboardingInstructions(
	modal: HTMLDivElement
): void {
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
	onboardingInstructionsInner.appendChild(closeSDKButton);
	onboardingInstructionsWrapper.appendChild(onboardingInstructionsInner);

	modal.appendChild(onboardingInstructionsWrapper);
}
