import sum from '../index';

describe('main function', () => {
	it('returns !23', async () => {
		const nice = await sum();

		expect(nice).toBe('!23');
	});
});
