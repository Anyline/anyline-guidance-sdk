import ImageManager from '../../../../modules/ImageManager';
import Router from '../../../../modules/Router';
import VideoStreamScreen from '../../../videoStream';
import css from './index.module.css';

export default function createPreviewElement(blob: Blob): HTMLDivElement {
	const wrapper = document.createElement('div');

	wrapper.className = css.wrapper;

	// title
	const titleWrapper = document.createElement('div');
	titleWrapper.className = css.titleWrapper;
	const title = document.createElement('div');
	title.className = css.title;
	title.innerText = 'Oops! Looks like a blurry image';
	titleWrapper.appendChild(title);

	// description
	const descriptionWrapper = document.createElement('div');
	descriptionWrapper.className = css.descriptionWrapper;
	const description = document.createElement('p');
	description.className = css.description;
	description.innerText =
		"We couldn't detect the object. The image seems too blurry. Please snap a clearer photo for better recognition.";
	descriptionWrapper.appendChild(description);

	// image preview
	const imageWrapper = document.createElement('div');
	imageWrapper.className = css.imageWrapper;
	const image = document.createElement('img');
	image.className = css.image;
	let blobUrl = '';
	blobUrl = URL.createObjectURL(blob);
	image.src = blobUrl;
	imageWrapper.appendChild(image);

	// bottom section
	const bottomSectionWrapper = document.createElement('div');
	bottomSectionWrapper.className = css.bottomSectionWrapper;
	// 1. take a new picture
	const primaryButton = document.createElement('button');
	primaryButton.className = css.primaryButton;
	primaryButton.innerText = 'Take a new picture';
	primaryButton.onclick = () => {
		const videoStreamScreen = VideoStreamScreen.getInstance().getElement();
		const routerManager = Router.getInstance();
		routerManager.pop();
		routerManager.push(videoStreamScreen);
	};
	// 2. proceed
	const secondaryButton = document.createElement('button');
	secondaryButton.innerText = 'Proceed with this image';
	secondaryButton.onclick = () => {
		const imageManager = ImageManager.getInstance();
		imageManager.setImageBlob(blob);
	};
	bottomSectionWrapper.appendChild(primaryButton);
	bottomSectionWrapper.appendChild(secondaryButton);

	wrapper.appendChild(titleWrapper);
	wrapper.appendChild(descriptionWrapper);
	wrapper.appendChild(imageWrapper);
	wrapper.appendChild(bottomSectionWrapper);

	return wrapper;
}
