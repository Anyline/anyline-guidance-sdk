import '@testing-library/jest-dom';
import createModal from '../../src/components/modal/index';
import { screen } from '@testing-library/dom';
import HostManager from '../../src/modules/HostManager';

describe('modal', () => {
	it('should add modal to the shadow root of the host', () => {
		const hostManager = HostManager.getInstance();
		const shadowRoot = hostManager.getShadowRoot();

		createModal(shadowRoot);
		const modal = screen.getByTestId('components-modal');
		void expect(modal).toBeInTheDocument();
		hostManager.destroy();
	});
});
