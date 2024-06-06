import ConfigManager, {
	type Config,
} from '../modules/ConfigManager/ConfigManager';
import LocalStorageManager from '../modules/LocalStorageManager';
import Router from '../modules/Router';
import OnboardingScreen from '../screens/onboardingInstructions';
import VideoStreamScreen from '../screens/videoStream';
import closeSDK from './closeSDK';

export default function initRouter(
	modal: HTMLDivElement,
	config: Config
): { onboardingInstructionsShown: boolean } {
	// mount modal
	const router = Router.getInstance();
	router.init(modal);

	let configManager: ConfigManager;

	try {
		configManager = ConfigManager.getInstance();
		configManager.setConfig(config);
	} catch (err) {
		closeSDK();
		throw err;
	}

	const _config = configManager.getConfig();

	const timesShown = _config?.onboardingInstructions?.timesShown ?? null;

	let shouldShowOnboarding = true;

	if (timesShown !== null) {
		const localStorageManager = LocalStorageManager.getInstance();

		localStorageManager.setTimesOnboardingInstructionsShown(timesShown);

		const localTimesShown =
			localStorageManager.getTimesOnboardingInstructionsShown();

		shouldShowOnboarding = localTimesShown != null && localTimesShown > 0;
	} else {
		shouldShowOnboarding = true;
	}

	if (shouldShowOnboarding) {
		const onboardingScreenManager = OnboardingScreen.getInstance();
		const onboardingScreen = onboardingScreenManager.getElement();

		router.push(onboardingScreen);
		return { onboardingInstructionsShown: true };
	} else {
		const videoStreamScreenManager = VideoStreamScreen.getInstance();
		const videoStreamScreen = videoStreamScreenManager.getElement();

		router.push(videoStreamScreen);
		return { onboardingInstructionsShown: false };
	}
}
