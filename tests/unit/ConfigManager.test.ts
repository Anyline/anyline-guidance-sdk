import ConfigManager from '../../src/modules/ConfigManager/ConfigManager';

describe('ConfigManager', () => {
	let configManager: ConfigManager;

	beforeEach(() => {
		configManager = ConfigManager.getInstance();
	});

	afterEach(() => {
		configManager.destroy();
	});

	it('should throw error if config is invalid', () => {
		const testCases = [
			{
				config: {
					onboardingInstructions: '',
				},
				expected: '"onboardingInstructions" must be of type object',
			},
			{
				config: {
					onboardingInstructions: {},
				},
				expected: '"onboardingInstructions.timesShown" is required',
			},
			{
				config: {
					onboardingInstructions: {
						timesShown: 3,
					},
					invalidKey: 'test',
				},
				expected: '"invalidKey" is not allowed',
			},
			{
				config: 'asd',
				expected: '"value" must be of type object',
			},
			{
				config: 0,
				expected: '"value" must be of type object',
			},
			{
				config: null,
				expected: '"value" must be of type object',
			},
		];

		testCases.forEach(testCase => {
			const { config, expected } = testCase;

			const oldConfig = configManager.getConfig();
			void expect(oldConfig).toStrictEqual(null);
			void expect(() => {
				// @ts-expect-error: purposefully pass invalid config
				configManager.setConfig(config);
			}).toThrow(expected);
			const newConfig = configManager.getConfig();
			void expect(newConfig).toStrictEqual(null);
			configManager.destroy();
		});
	});

	it('should return config for a valid config', () => {
		const testCases = [
			{
				config: {
					onboardingInstructions: {
						timesShown: 3,
					},
				},
				expected: {
					onboardingInstructions: {
						timesShown: 3,
					},
				},
			},
			{
				config: {},
				expected: {},
			},
		];

		testCases.forEach(testCase => {
			const configManager2 = ConfigManager.getInstance();
			const { config, expected } = testCase;

			const oldConfig = configManager2.getConfig();
			void expect(oldConfig).toStrictEqual(null);
			void expect(() => {
				configManager2.setConfig(config);
			}).not.toThrow();
			const newConfig = configManager2.getConfig();
			void expect(newConfig).toStrictEqual(expected);
			configManager2.destroy();
		});
	});
});
