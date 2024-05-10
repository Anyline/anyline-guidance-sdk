import FileInputManager from '../modules/FileInputManager';
import HostManager from '../modules/HostManager';
import ImageManager from '../modules/ImageManager';
import Router from '../modules/Router';
import StreamManager from '../modules/StreamManager';
import VideoManager from '../modules/VideoManager';
import OnboardingScreen from '../screens/onboardingInstructions';
import VideoStreamScreen from '../screens/videoStream';

export default function closeSDK(): void {
	const streamManager = StreamManager.getInstance();
	const videoManager = VideoManager.getInstance();
	const fileInputManager = FileInputManager.getInstance();
	const imageManager = ImageManager.getInstance();
	const routerManager = Router.getInstance();
	const onboardingScreenManager = OnboardingScreen.getInstance();
	const videoStreamScreenManager = VideoStreamScreen.getInstance();
	const hostManager = HostManager.getInstance();

	streamManager.destroy();
	videoManager.destroy();
	fileInputManager.destroy();
	imageManager.destroy();
	routerManager.destroy();
	videoStreamScreenManager.destroy();
	onboardingScreenManager.destroy();

	hostManager.destroy();
}
