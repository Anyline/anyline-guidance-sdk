import init from '../../src/index';
import injectCSS from '../../src/lib/injectCSS';

describe('init', () => {
	afterEach(() => {
		jest.restoreAllMocks();
		jest.clearAllMocks();
	});

	it('rejects for unsupported devices', async () => {
		await expect(init()).rejects.toThrow('Unsupported device');
	});

	it('calls injectCSS when init is called in production build', async () => {
		process.env.MODE = 'production';
		Object.defineProperty(global.navigator, 'mediaDevices', {
			writable: true,
			value: {},
		});
		try {
			await init();
		} catch (err) {}
		void expect(injectCSS).toHaveBeenCalledTimes(1);
	});

	it('does not call injectCSS when init is called in development build', async () => {
		process.env.MODE = 'development';
		try {
			await init();
		} catch (err) {}
		void expect(injectCSS).toHaveBeenCalledTimes(0);
	});
});
