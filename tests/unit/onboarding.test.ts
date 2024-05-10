import '@testing-library/jest-dom';
import createModal from '../../src/components/modal/index';
import { fireEvent, screen, waitFor } from '@testing-library/dom';
import OnboardingScreen from '../../src/screens/onboardingInstructions';
import HostManager from '../../src/modules/HostManager';

describe('onboarding', () => {
	it('should close the sdk when close button is pressed from onboarding screen', async () => {
		process.env.MODE = 'development';

		const hostManager = HostManager.getInstance();
		const host = hostManager.getHost();
		const shadowRoot = hostManager.getShadowRoot();

		const modal = createModal(shadowRoot);
		const onboardingScreenManager = OnboardingScreen.getInstance();
		const onboardingInstructionsWrapper =
			onboardingScreenManager.getElement();

		modal.appendChild(onboardingInstructionsWrapper);

		const closeModalButton = screen.getByTestId(
			'components-onboarding-instructions-close-sdk-button'
		);

		void expect(closeModalButton).toBeInTheDocument();
		void expect(document.body).toContainElement(host);

		fireEvent.click(closeModalButton);

		await waitFor(() => {
			void expect(document.body).not.toContainElement(host);
		});
	});
});
