import createModal from '../components/modal';
import injectCSS from '../lib/injectCSS';
import ImageManager from '../modules/ImageManager';
import HostManager from '../modules/HostManager';
import initRouter from '../lib/initRouter';
import { type Config } from '../modules/ConfigManager/ConfigManager';
import OpenCVManager from '../modules/OpenCVManager';
import DocumentScrollController from '../modules/DocumentScrollController';

// load demoInstructionsImage chunk before it is requested
// to ensure lower loading time for the gif when sdk is initialised
void import(
	'../screens/onboardingInstructions/instructionsBody/demoInstructionsImage'
).catch(() => {
	console.log('Error loading demo gif');
});

export interface SDKReturnType {
	blob: Blob;
}

function init(
	config: Config,
	{
		onComplete,
	}: {
		onComplete: (response: SDKReturnType) => void;
	}
): void {
	if (
		navigator.mediaDevices === null ||
		navigator.mediaDevices === undefined
	) {
		throw new Error('Unsupported device');
	}

	const opencvManager = OpenCVManager.getInstance();
	opencvManager.loadOpenCV();

	const documentScrollController = DocumentScrollController.getInstance();
	documentScrollController.disableScroll();

	const hostManager = HostManager.getInstance();

	const shadowRoot = hostManager.getShadowRoot();
	if (process.env.MODE === 'production') {
		injectCSS(shadowRoot);
	}

	const modal = createModal(shadowRoot);

	initRouter(modal, config);

	const imageManager = ImageManager.getInstance();
	imageManager.onBlobSet((blob: Blob) => {
		onComplete({ blob });
	});
}

export default init;
