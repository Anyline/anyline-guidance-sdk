export default class LocalStorageManager {
	private static instance: LocalStorageManager | null = null;
	private readonly timesShownKey: string =
		'anyline-guidance-sdk-onboardingInstructions-timesShown';

	public static getInstance(): LocalStorageManager {
		if (LocalStorageManager.instance === null) {
			LocalStorageManager.instance = new LocalStorageManager();
		}
		return LocalStorageManager.instance;
	}

	public setTimesOnboardingInstructionsShown(timesShown: number): void {
		const localTimesShown = this.getTimesOnboardingInstructionsShown();
		if (localTimesShown != null) {
			// key already exists locally
			// decrement value by 1
			const newTimesShown = Math.max(localTimesShown - 1, 0);
			localStorage.setItem(this.timesShownKey, newTimesShown.toString());
		} else {
			// key does not exist locally
			// set the passed value
			localStorage.setItem(this.timesShownKey, timesShown.toString());
		}
	}

	public getTimesOnboardingInstructionsShown(): number | null {
		const timesShown = localStorage.getItem(this.timesShownKey);
		if (timesShown != null) {
			return parseInt(timesShown);
		}
		return null;
	}
}
