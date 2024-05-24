import closeSDK from '../../lib/closeSDK';
import ComponentManager from '../../modules/ComponentManager';
import ImageChecker from '../../modules/ImageChecker';
import ImageManager from '../../modules/ImageManager';
import OpenCVManager from '../../modules/OpenCVManager';
import loadingPreProcessingChecksElement from './components/loadingPreProcessingChecksElement';
import createPreviewElement from './components/previewElement';
import css from './index.module.css';

export default class PreProcessingScreen extends ComponentManager {
	constructor() {
		super();

		const wrapper = this.getElement();

		wrapper.className = css.wrapper;

		const preProcessingChecksElement = loadingPreProcessingChecksElement();

		wrapper.appendChild(preProcessingChecksElement);

		this.onMount(async () => {
			const opencvManager = OpenCVManager.getInstance();
			opencvManager.onLoad(async error => {
				if (error != null) return;
				const imageChecker = ImageChecker.getInstance();
				const isImageQualityGood =
					await imageChecker.isImageQualityGood();

				const blob = imageChecker.getImageBlob();

				if (isImageQualityGood) {
					const imageManager = ImageManager.getInstance();
					imageManager.setImageBlob(blob);
					closeSDK();
					return;
				}

				// image quality is not good
				// show the image wih ability to i) Take a new picture, ii) Proceed with this image
				wrapper.removeChild(preProcessingChecksElement);
				const previewElement = createPreviewElement(blob);
				wrapper.appendChild(previewElement);
			});
		});

		this.onUnmount(async () => {
			this.destroy();
			const imageChecker = ImageChecker.getInstance();
			imageChecker.destroy();
		});
	}
}
