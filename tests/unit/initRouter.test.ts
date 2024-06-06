import initRouter from '../../src/lib/initRouter';
import ConfigManager, {
	type Config,
} from '../../src/modules/ConfigManager/ConfigManager';
import LocalStorageManager from '../../src/modules/LocalStorageManager';

describe('initRouter', () => {
	const modal: HTMLDivElement = document.createElement('div');

	afterEach(() => {
		ConfigManager.getInstance().destroy();
		LocalStorageManager.getInstance().destroy();
		localStorage.clear();
	});

	it('should throw error when it is called with invalid config', () => {
		const config = 'invalid config';

		void expect(() => {
			initRouter(modal, config as unknown as Config);
		}).toThrow('Invalid config format');
	});

	it('should return onboardingInstructionsShown as false when it is called with timesShown = 0', () => {
		const config: Config = {
			onboardingInstructions: {
				timesShown: 0,
			},
		};
		const { onboardingInstructionsShown } = initRouter(modal, config);
		void expect(onboardingInstructionsShown).toBe(false);
	});

	it('should return onboardingInstructionsShown as true when it is called with timesShown > 0', () => {
		const config: Config = {
			onboardingInstructions: {
				timesShown: 1,
			},
		};
		const { onboardingInstructionsShown } = initRouter(modal, config);
		void expect(onboardingInstructionsShown).toBe(true);
	});
});
