import ConfigManager from '../modules/ConfigManager';
import FileInputManager from '../modules/FileInputManager';
import HostManager from '../modules/HostManager';
import ImageManager from '../modules/ImageManager';
import LocalStorageManager from '../modules/LocalStorageManager';
import Router from '../modules/Router';
import StreamManager from '../modules/StreamManager';
import VideoManager from '../modules/VideoManager';
import OnboardingScreen from '../screens/onboardingInstructions';
import VideoStreamScreen from '../screens/videoStream';

export default function closeSDK(): void {
	const onboardingScreenManager = OnboardingScreen.getInstance();
	const videoStreamScreenManager = VideoStreamScreen.getInstance();

	const configManager = ConfigManager.getInstance();
	const fileInputManager = FileInputManager.getInstance();
	const hostManager = HostManager.getInstance();
	const imageManager = ImageManager.getInstance();
	const localStorageManager = LocalStorageManager.getInstance();
	const routerManager = Router.getInstance();
	const streamManager = StreamManager.getInstance();
	const videoManager = VideoManager.getInstance();

	onboardingScreenManager.destroy();
	videoStreamScreenManager.destroy();

	configManager.destroy();
	fileInputManager.destroy();
	imageManager.destroy();
	localStorageManager.destroy();
	routerManager.destroy();
	streamManager.destroy();
	videoManager.destroy();

	hostManager.destroy();
}
