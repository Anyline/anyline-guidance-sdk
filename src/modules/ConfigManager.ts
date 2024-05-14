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
			if (
				typeof config !== 'object' ||
				!Object.prototype.hasOwnProperty.call(
					config,
					'onboardingInstructions'
				) ||
				typeof config.onboardingInstructions !== 'object' ||
				!Object.prototype.hasOwnProperty.call(
					config.onboardingInstructions,
					'timesShown'
				) ||
				typeof config.onboardingInstructions.timesShown !== 'number'
			) {
				throw new Error('Invalid config format');
			}
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
