import createModal from '../components/modal';
import { getImageSpecification } from './getImageSpecification';
import injectCSS from '../lib/injectCSS';
import ImageManager from '../modules/ImageManager';
import HostManager from '../modules/HostManager';
import initRouter from '../lib/initRouter';
import { type Config } from '../modules/ConfigManager';

export interface ImageMetadata {
	width: number;
	height: number;
	fileSize: number;
}

export interface SDKReturnType {
	blob: Blob;
	metadata: ImageMetadata;
}

async function init(config?: Config): Promise<SDKReturnType> {
	if (
		navigator.mediaDevices === null ||
		navigator.mediaDevices === undefined
	) {
		await Promise.reject(new Error('Unsupported device'));
	}

	document.body.style.overflow = 'hidden';

	const hostManager = HostManager.getInstance();

	const shadowRoot = hostManager.getShadowRoot();
	if (process.env.MODE === 'production') {
		injectCSS(shadowRoot);
	}

	const modal = createModal(shadowRoot);

	initRouter(modal, config);

	const imageManager = ImageManager.getInstance();
	const blob = await imageManager.getImageBlob();
	const metadata = await getImageSpecification(blob);

	document.body.style.overflow = 'unset';

	return { blob, metadata };
}

export default init;
