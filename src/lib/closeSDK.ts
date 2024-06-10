import CallbackHandler from '../modules/CallbackHandler';
import ConfigManager from '../modules/ConfigManager/ConfigManager';
import DocumentScrollController from '../modules/DocumentScrollController';
import HostManager from '../modules/HostManager';
import ImageChecker from '../modules/ImageChecker';
import ImageManager from '../modules/ImageManager';
import LocalStorageManager from '../modules/LocalStorageManager';
import Router from '../modules/Router';

export default function closeSDK(): void {
	const callbackHandler = CallbackHandler.getInstance();
	const configManager = ConfigManager.getInstance();
	const documentScrollController = DocumentScrollController.getInstance();
	const hostManager = HostManager.getInstance();
	const imageManager = ImageManager.getInstance();
	const imageChecker = ImageChecker.getInstance();
	const localStorageManager = LocalStorageManager.getInstance();
	const routerManager = Router.getInstance();

	callbackHandler.destroy();
	configManager.destroy();
	documentScrollController.enableScroll();
	documentScrollController.destroy();
	imageManager.destroy();
	imageChecker.destroy();
	localStorageManager.destroy();
	routerManager.destroy();

	hostManager.destroy();
}
