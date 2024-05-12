import FileInputManager from '../modules/FileInputManager';
import HostManager from '../modules/HostManager';
import ImageManager from '../modules/ImageManager';
import Router from '../modules/Router';
import StreamManager from '../modules/StreamManager';
import VideoManager from '../modules/VideoManager';
import OnboardingScreen from '../screens/onboardingInstructions';
import VideoStreamScreen from '../screens/videoStream';

export default function closeSDK(): void {
	const onboardingScreenManager = OnboardingScreen.getInstance();
	const videoStreamScreenManager = VideoStreamScreen.getInstance();

	const fileInputManager = FileInputManager.getInstance();
	const hostManager = HostManager.getInstance();
	const imageManager = ImageManager.getInstance();
	const routerManager = Router.getInstance();
	const streamManager = StreamManager.getInstance();
	const videoManager = VideoManager.getInstance();

	document.body.style.overflow = 'unset';

	onboardingScreenManager.destroy();
	videoStreamScreenManager.destroy();
	fileInputManager.destroy();
	imageManager.destroy();
	routerManager.destroy();
	streamManager.destroy();
	videoManager.destroy();

	hostManager.destroy();
}
