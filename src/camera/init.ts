import createModal from '../components/modal';
import createContainerElement from '../components/container';
import { getNonWideAngleCamera } from './getNonWideAngleCamera';
import { getHighestResolutionStream } from './getHighestResolutionStream';
import { getImageBlob } from './getImageBlob';
import { getImageSpecification } from './getImageSpecification';
import { closeSDK } from './closeSDK';
import injectCSS from '../lib/injectCSS';

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

	injectCSS();

	const device = await getNonWideAngleCamera();
	const stream = await getHighestResolutionStream(device);
	const { container, captureButton, fileInputElement } =
		createContainerElement(stream);

	createModal(container);

	return await new Promise((resolve, reject) => {
		captureButton.addEventListener('click', () => {
			void (async () => {
				try {
					const blob = await getImageBlob(fileInputElement);
					const metadata = await getImageSpecification(blob);
					closeSDK(stream);
					resolve({ blob, metadata });
				} catch (err) {
					reject(err);
				}
			})();
		});
	});
}

export default init;
