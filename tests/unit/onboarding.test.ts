import '@testing-library/jest-dom';
import createModal from '../../src/components/modal/index';
import createHost from '../../src/lib/createHost';
import createShadowRoot from '../../src/lib/createShadowRoot';
import createOnboardingInstructions from '../../src/screens/onboardingInstructions';
import { fireEvent, screen, waitFor } from '@testing-library/dom';

describe('onboarding', () => {
	it('should close the sdk when close button is pressed from onboarding screen', async () => {
		process.env.MODE = 'development';
		const host = createHost();
		const shadowRoot = createShadowRoot(host);

		const modal = createModal(shadowRoot);
		const onboardingInstructionsWrapper = createOnboardingInstructions();

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
