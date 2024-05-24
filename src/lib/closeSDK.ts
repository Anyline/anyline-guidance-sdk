import ConfigManager from '../modules/ConfigManager';
import HostManager from '../modules/HostManager';
import ImageChecker from '../modules/ImageChecker';
import ImageManager from '../modules/ImageManager';
import LocalStorageManager from '../modules/LocalStorageManager';
import Router from '../modules/Router';

export default function closeSDK(): void {
	const configManager = ConfigManager.getInstance();
	const hostManager = HostManager.getInstance();
	const imageManager = ImageManager.getInstance();
	const imageChecker = ImageChecker.getInstance();
	const localStorageManager = LocalStorageManager.getInstance();
	const routerManager = Router.getInstance();

	configManager.destroy();
	imageManager.destroy();
	imageChecker.destroy();
	localStorageManager.destroy();
	routerManager.destroy();

	hostManager.destroy();
}
