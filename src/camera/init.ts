import createModal from '../components/modal';
import createContainerElement from '../components/container';
import createButtonElement from '../components/button';
import { getNonWideAngleCamera } from './getNonWideAngleCamera';
import { getHighestResolutionStream } from './getHighestResolutionStream';
import { getImageBlob } from './getImageBlob';
import { getImageSpecification } from './getImageSpecification';
import { closeSDK } from './closeSDK';

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
	const device = await getNonWideAngleCamera();
	const stream = await getHighestResolutionStream(device);
	const container = createContainerElement(stream);

	const modal = createModal(container);

	const button = createButtonElement(container);

	return await new Promise((resolve, reject) => {
		button.addEventListener('click', () => {
			void (async () => {
				try {
					const blob = await getImageBlob();
					const metadata = await getImageSpecification(blob);
					resolve({ blob, metadata });
					closeSDK(stream, modal);
				} catch (err) {
					reject(err);
				}
			})();
		});
	});
}

export default init;
