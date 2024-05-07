import '@testing-library/jest-dom';
import createHost from '../../src/lib/createHost';
import createShadowRoot from '../../src/lib/createShadowRoot';
import { screen } from '@testing-library/dom';

describe('anyline host element', () => {
	it('does not create host if host already exists', async () => {
		const host = document.createElement('div');
		host.id = 'anyline-guidance-sdk';
		host.setAttribute('data-testid', 'lib-create-host');
		document.body.appendChild(host);

		createHost();
		const element = screen.getAllByTestId('lib-create-host');
		void expect(element).toHaveLength(1);
	});

	it('creates host if it does not exist', async () => {
		createHost();
		const host = document.getElementById('anyline-guidance-sdk');
		void expect(host).toBeInTheDocument();
	});

	it('creates shadow root on the host element', () => {
		process.env.MODE = 'production';
		const host = createHost();
		createShadowRoot(host);
		const hostElement = document.getElementById('anyline-guidance-sdk');
		void expect(hostElement?.shadowRoot).not.toBeNull();
	});
});
