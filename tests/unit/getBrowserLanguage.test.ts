import getBrowserLanguage from '../../src/lib/getBrowserLanguage';

describe('getBrowserLanguage', () => {
	it('returns english as default language when navigator.language is undefined', async () => {
		Object.defineProperty(global.navigator, 'language', {
			writable: true,
			value: undefined,
		});

		const browserLanguage = getBrowserLanguage();

		await expect(browserLanguage).toBe('english');
	});

	it('returns enslish when browser language is english', async () => {
		Object.defineProperty(global.navigator, 'language', {
			writable: true,
			value: 'en',
		});

		const browserLanguage = getBrowserLanguage();

		await expect(browserLanguage).toBe('english');
	});

	it('returns german when browser language is german', async () => {
		Object.defineProperty(global.navigator, 'language', {
			writable: true,
			value: 'de',
		});

		const browserLanguage = getBrowserLanguage();

		await expect(browserLanguage).toBe('german');
	});

	it('returns german when browser language is austrian german', async () => {
		Object.defineProperty(global.navigator, 'language', {
			writable: true,
			value: 'de-AT',
		});

		const browserLanguage = getBrowserLanguage();

		await expect(browserLanguage).toBe('german');
	});
});
