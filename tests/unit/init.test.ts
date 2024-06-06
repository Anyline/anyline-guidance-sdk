import init from '../../src/index';

describe('init', () => {
	it('rejects for unsupported devices', async () => {
		await expect(init({})).rejects.toThrow('Unsupported device');
	});
});
