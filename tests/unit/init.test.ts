import init from '../../src/index';

describe('init', () => {
	it('throw an error for unsupported devices', () => {
		void expect(() => {
			init(
				{},
				{
					onComplete: () => {
						//
					},
				}
			);
		}).toThrow('Unsupported device');
	});
});
