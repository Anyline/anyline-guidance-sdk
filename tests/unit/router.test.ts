import '@testing-library/jest-dom';
import Router from '../../src/modules/Router';
import { screen } from '@testing-library/dom';

describe('Router', () => {
	let router: Router;

	beforeEach(() => {
		router = Router.getInstance();
		const mount = document.createElement('div');
		document.body.appendChild(mount);
		router.init(mount);
	});

	afterEach(() => {
		router.destroy();
	});

	it('should have push and pop public methods', () => {
		const testHome = document.createElement('div');
		void expect(() => {
			router.push(testHome);
		}).not.toThrow();
		void expect(() => {
			router.pop();
		}).not.toThrow();
	});

	it('should set css display value to none on the first screen when there are two screens pushed', () => {
		const testHome = document.createElement('div');
		testHome.setAttribute('data-testid', 'test-home');
		router.push(testHome);
		const homeScreen = screen.getByTestId('test-home');

		const aboutUs = document.createElement('div');
		aboutUs.setAttribute('data-testid', 'test-aboutus');
		router.push(aboutUs);
		void expect(homeScreen).toHaveStyle({ display: 'none' });
	});

	it('should set css display value to flex on previous screen when pop is called', () => {
		const testHome = document.createElement('div');
		testHome.setAttribute('data-testid', 'test-home');
		router.push(testHome);
		const homeScreen = screen.getByTestId('test-home');

		const aboutUs = document.createElement('div');
		aboutUs.setAttribute('data-testid', 'test-aboutus');
		router.push(aboutUs);

		router.pop();
		void expect(homeScreen).toHaveStyle({ display: 'flex' });
	});
});
