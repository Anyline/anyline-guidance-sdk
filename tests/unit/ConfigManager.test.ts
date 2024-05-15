import ConfigManager, { type Config } from '../../src/modules/ConfigManager';

describe('ConfigManager', () => {
	it('can be initiated with config and without config', () => {
		const configManager = ConfigManager.getInstance();
		void expect(configManager.getConfig()).toEqual(null);
		configManager.destroy();

		const config = { onboardingInstructions: { timesShown: 2 } };
		const configManager2 = ConfigManager.getInstance(config);
		void expect(configManager2.getConfig()).toEqual(config);
		configManager2.destroy();
	});

	it('throws error when config does not match expected type', () => {
		const testCases = [
			{ something: 'else' },
			{ onboardingInstructions: 'not an object' },
			{ onboardingInstructions: { timesShown: 'not a number' } },
			{ onboardingInstructions: { timesShown: -3 } },
			{},
			'test',
		];

		testCases.forEach(config => {
			let errorOccurred = false;

			try {
				const configManager = ConfigManager.getInstance(
					config as unknown as Config
				);
				configManager.destroy();
			} catch (error) {
				errorOccurred = true;
			}

			void expect(errorOccurred).toBe(true);
		});
	});
});
