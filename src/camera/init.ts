import createModal from '../components/modal';
import createContainerElement from '../components/container';
import { getImageBlob } from './getImageBlob';
import { getImageSpecification } from './getImageSpecification';
import closeSDK from './closeSDK';
import injectCSS from '../lib/injectCSS';
import createHost from '../lib/createHost';
import createShadowRoot from '../lib/createShadowRoot';

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

	// step 1
	// show onboarding screen

	// step 2
	// show video stream screen
	const { container, captureButton, fileInputElement } =
		await createContainerElement();

	modal.appendChild(container);

	return await new Promise((resolve, reject) => {
		captureButton.addEventListener('click', () => {
			void (async () => {
				try {
					const blob = await getImageBlob(fileInputElement);
					const metadata = await getImageSpecification(blob);
					closeSDK();
					resolve({ blob, metadata });
				} catch (err) {
					reject(err);
				}
			})();
		});
	});
}

export default init;
