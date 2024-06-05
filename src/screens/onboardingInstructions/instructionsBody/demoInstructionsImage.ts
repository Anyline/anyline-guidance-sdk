import url from './assets/demoImage.gif';

export default function createdemoImage(): HTMLImageElement {
	const demoImage = new Image();
	demoImage.src = url;

	return demoImage;
}
