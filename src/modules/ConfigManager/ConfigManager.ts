import validateSchema from './validateSchema';

export interface Config {
	onboardingInstructions?: {
		timesShown: number;
	};
}

export default class ConfigManager {
	private static instance: ConfigManager | null = null;
	private config: Config | null = null;

	public static getInstance(): ConfigManager {
		if (ConfigManager.instance === null) {
			ConfigManager.instance = new ConfigManager();
		}
		return ConfigManager.instance;
	}

	public setConfig(config: Config): void {
		const value = validateSchema(config);
		this.config = value;
	}

	public getConfig(): Config | null {
		return this.config;
	}

	public destroy(): void {
		ConfigManager.instance = null;
	}
}
