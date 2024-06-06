import initRouter from '../../src/lib/initRouter';
import ConfigManager from '../../src/modules/ConfigManager/ConfigManager';
import LocalStorageManager from '../../src/modules/LocalStorageManager';

describe('initRouter', () => {
	const modal: HTMLDivElement = document.createElement('div');

	afterEach(() => {
		ConfigManager.getInstance().destroy();
		LocalStorageManager.getInstance().destroy();
		localStorage.clear();
	});

	it('should not show onboarding instructions if timeshown is 0', () => {
		const config = {
			onboardingInstructions: {
				timesShown: 0,
			},
		};
		const { onboardingInstructionsShown } = initRouter(modal, config);
		void expect(onboardingInstructionsShown).toBe(false);
	});

	it('should show onboarding instructions if timeshown is greater than 1', () => {
		const config = {
			onboardingInstructions: {
				timesShown: 1,
			},
		};
		const { onboardingInstructionsShown } = initRouter(modal, config);
		void expect(onboardingInstructionsShown).toBe(true);
	});
});
