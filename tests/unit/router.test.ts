import '@testing-library/jest-dom';
import router from '../../src/router';
import { screen } from '@testing-library/dom';
import createHost from '../../src/lib/createHost';
import createShadowRoot from '../../src/lib/createShadowRoot';
import createModal from '../../src/components/modal';

describe('router', () => {
	it('attaches all screens to an HTMLDivElement with display as none, except first one', () => {
		const host = createHost();
		const shadowRoot = createShadowRoot(host);

		const modal = createModal(shadowRoot);

		const home = document.createElement('div');
		home.setAttribute('data-testid', 'test-home');
		const about = document.createElement('div');
		about.setAttribute('data-testid', 'test-about');
		router(modal, [home, about]);

		const homeElement = screen.getByTestId('test-home');
		const aboutElement = screen.getByTestId('test-about');

		void expect(homeElement).toBeInTheDocument();
		void expect(homeElement).toBeVisible();

		void expect(aboutElement).toBeInTheDocument();
		void expect(aboutElement).not.toBeVisible();
	});

	it('shows 3rd element in the HTMLDivElement and hides rest', () => {
		const host = createHost();
		const shadowRoot = createShadowRoot(host);

		const modal = createModal(shadowRoot);

		const home = document.createElement('div');
		home.setAttribute('data-testid', 'test-home');
		const about = document.createElement('div');
		about.setAttribute('data-testid', 'test-about');
		const demo = document.createElement('div');
		demo.setAttribute('data-testid', 'test-demo');
		const { navigate } = router(modal, [home, about, demo]);

		navigate(2);

		const homeElement = screen.getByTestId('test-home');
		const aboutElement = screen.getByTestId('test-about');
		const demoElement = screen.getByTestId('test-demo');

		void expect(homeElement).toBeInTheDocument();
		void expect(homeElement).not.toBeVisible();

		void expect(aboutElement).toBeInTheDocument();
		void expect(aboutElement).not.toBeVisible();

		void expect(demoElement).toBeInTheDocument();
		void expect(demoElement).toBeVisible();
	});
});
