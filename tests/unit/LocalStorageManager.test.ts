import LocalStorageManager from '../../src/modules/LocalStorageManager';

describe('LocalStorageManager', () => {
	let localStorageManager: LocalStorageManager;

	beforeEach(() => {
		localStorageManager = LocalStorageManager.getInstance();
	});

	afterEach(() => {
		localStorage.clear();
	});

	it('saves onboardingInstruction timesShown in local storage', () => {
		localStorageManager.setTimesOnboardingInstructionsShown(5);

		const timesShown =
			localStorageManager.getTimesOnboardingInstructionsShown();

		void expect(timesShown).toBe(5);
	});

	it('reduces timesShown by 1 if setTimesOnboardingInstructionsShown is called and timesShown already exists in localStorage', () => {
		localStorageManager.setTimesOnboardingInstructionsShown(5);
		const timesShown =
			localStorageManager.getTimesOnboardingInstructionsShown();
		void expect(timesShown).toBe(5);

		localStorageManager.setTimesOnboardingInstructionsShown(5);
		const timesShown2 =
			localStorageManager.getTimesOnboardingInstructionsShown();
		void expect(timesShown2).toBe(4);
	});

	it('should not return timesShown less than 0', () => {
		localStorageManager.setTimesOnboardingInstructionsShown(1);
		const timesShown =
			localStorageManager.getTimesOnboardingInstructionsShown();
		void expect(timesShown).toBe(1);

		localStorageManager.setTimesOnboardingInstructionsShown(5);
		const timesShown2 =
			localStorageManager.getTimesOnboardingInstructionsShown();
		void expect(timesShown2).toBe(0);

		localStorageManager.setTimesOnboardingInstructionsShown(5);
		const timesShown3 =
			localStorageManager.getTimesOnboardingInstructionsShown();
		void expect(timesShown3).toBe(0);
	});
});
