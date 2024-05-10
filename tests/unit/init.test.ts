import init from '../../src/index';

describe('init', () => {
	afterEach(() => {
		jest.restoreAllMocks();
		jest.clearAllMocks();
	});

	it('rejects for unsupported devices', async () => {
		await expect(init()).rejects.toThrow('Unsupported device');
	});
});
