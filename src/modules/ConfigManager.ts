export interface Config {
	onboardingInstructions: {
		timesShown: number;
	};
}

export default class ConfigManager {
	private static instance: ConfigManager | null = null;
	private readonly config: Config | null = null;

	private constructor(config?: Config) {
		if (config !== undefined) {
			// use external library for schema validation if config increases
			if (typeof config !== 'object')
				throw new Error('Invalid config format');
			if (
				!Object.prototype.hasOwnProperty.call(
					config,
					'onboardingInstructions'
				)
			)
				throw new Error('Config must have onboardingInstructions set');
			if (typeof config.onboardingInstructions !== 'object')
				throw new Error('onboardingInstructions must be an object');
			if (typeof config.onboardingInstructions.timesShown !== 'number')
				throw new Error('timesShown should be a number');
			if (config.onboardingInstructions.timesShown < 0)
				throw new Error(
					'timesShown should be greater than or equal to 0'
				);
			this.config = config;
		}
	}

	public static getInstance(config?: Config): ConfigManager {
		if (ConfigManager.instance === null) {
			ConfigManager.instance = new ConfigManager(config);
		}
		return ConfigManager.instance;
	}

	public getConfig(): Config | null {
		return this.config;
	}

	public destroy(): void {
		ConfigManager.instance = null;
	}
}
