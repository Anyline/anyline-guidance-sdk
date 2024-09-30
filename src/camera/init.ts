import createModal from '../components/modal';
import injectCSS from '../lib/injectCSS';
import HostManager from '../modules/HostManager';
import initRouter from '../lib/initRouter';
import { type Config } from '../modules/ConfigManager/ConfigManager';
import DocumentScrollController from '../modules/DocumentScrollController';
import CallbackHandler from '../modules/CallbackHandler';

// load demoInstructionsImage chunk before it is requested
// to ensure lower loading time for the gif when sdk is initialised
void import(
	'../screens/onboardingInstructions/instructionsBody/demoInstructionsImage'
).catch(() => {
	console.log('Error loading demo gif');
});

export interface OnComplete {
	blob: Blob;
}

export interface OnPreProcessingChecksFailed {
	blob: Blob;
	message: string;
}

export interface Callbacks {
	onComplete: (response: OnComplete) => void;
	onPreProcessingChecksFailed?: (
		response: OnPreProcessingChecksFailed
	) => void;
}

function init(config: Config, callbacks: Callbacks): void {
	if (
		navigator.mediaDevices === null ||
		navigator.mediaDevices === undefined
	) {
		throw new Error('Unsupported device');
	}

	const callbackHandler = CallbackHandler.getInstance();
	// register callbacks
	const { onComplete, onPreProcessingChecksFailed } = callbacks;
	callbackHandler.setOnComplete(onComplete);
	if (
		onPreProcessingChecksFailed != null &&
		onPreProcessingChecksFailed !== undefined
	) {
		callbackHandler.setOnPreProcessingChecksFailedCallback(
			onPreProcessingChecksFailed
		);
	}
	
	const documentScrollController = DocumentScrollController.getInstance();
	documentScrollController.disableScroll();

	const hostManager = HostManager.getInstance();

	const shadowRoot = hostManager.getShadowRoot();
	if (process.env.MODE === 'production') {
		injectCSS(shadowRoot);
	}

	const modal = createModal(shadowRoot);

	initRouter(modal, config);
}

export default init;
