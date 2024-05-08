import createModal from '../components/modal';
import createContainerElement from '../screens/videoStream';
import { getImageBlob } from './getImageBlob';
import { getImageSpecification } from './getImageSpecification';
import closeSDK from './closeSDK';
import injectCSS from '../lib/injectCSS';
import createHost from '../lib/createHost';
import createShadowRoot from '../lib/createShadowRoot';
import Router from '../modules/Router';
import createOnboardingInstructions from '../screens/onboardingInstructions';

export interface ImageMetadata {
	width: number;
	height: number;
	fileSize: number;
}

export interface SDKReturnType {
	blob: Blob;
	metadata: ImageMetadata;
}

async function init(): Promise<SDKReturnType> {
	if (
		navigator.mediaDevices === null ||
		navigator.mediaDevices === undefined
	) {
		await Promise.reject(new Error('Unsupported device'));
	}

	const host = createHost();

	const shadowRoot = createShadowRoot(host);

	if (process.env.MODE === 'production') {
		injectCSS(shadowRoot);
	}

	const modal = createModal(shadowRoot);

	// initiate router
	const router = Router.getInstance();
	router.init(modal);

	// screen 1
	// onboarding screen

	const onboardingScreen = createOnboardingInstructions();

	router.push(onboardingScreen);

	// screen 2
	// video stream screen
	// const { container, captureButton, fileInputElement } =
	// 	await createContainerElement();

	// return await new Promise((resolve, reject) => {
	// 	captureButton.addEventListener('click', () => {
	// 		void (async () => {
	// 			try {
	// 				const blob = await getImageBlob(fileInputElement);
	// 				const metadata = await getImageSpecification(blob);
	// 				closeSDK();
	// 				resolve({ blob, metadata });
	// 			} catch (err) {
	// 				reject(err);
	// 			}
	// 		})();
	// 	});
	// });
}

export default init;
