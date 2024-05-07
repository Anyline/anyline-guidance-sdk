import '@testing-library/jest-dom';
import createModal from '../../src/components/modal/index';
import createHost from '../../src/lib/createHost';
import createShadowRoot from '../../src/lib/createShadowRoot';
import { screen } from '@testing-library/dom';

describe('modal', () => {
	it('should add modal to the shadow root of the host', () => {
		const host = createHost();
		const shadowRoot = createShadowRoot(host);

		createModal(shadowRoot);
		const modal = screen.getByTestId('components-modal');
		void expect(modal).toBeInTheDocument();
		void expect(modal.innerHTML).toBeFalsy();
	});
});
