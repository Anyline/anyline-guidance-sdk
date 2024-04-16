import createModal from '../components/modal';
import createContainerElement from '../components/container';
import createButtonElement from '../components/button';
import { getNonWideAngleCamera } from './getNonWideAngleCamera';
import { getHighestResolutionStream } from './getHighestResolutionStream';

async function init(): Promise<Blob> {
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

	return await createButtonElement(container, stream, modal);
}

export default init;
