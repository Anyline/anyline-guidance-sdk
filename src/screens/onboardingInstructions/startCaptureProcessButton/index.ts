import Router from '../../../modules/Router';
import VideoStreamScreen from '../../videoStream';
import css from '../../videoStream/button/index.module.css';

export default function createStartCaptureProcessButton(): HTMLDivElement {
	const buttonWrapper = document.createElement('div');
	buttonWrapper.className = css.buttonWrapper;
	const button = document.createElement('button');
	button.className = css.button;
	button.innerText = 'Start capture process';
	button.type = 'button';

	button.onclick = async () => {
		const router = Router.getInstance();
		const videoStreamScreenManager = VideoStreamScreen.getInstance();
		const container = videoStreamScreenManager.getElement();
		router.push(container);
	};

	buttonWrapper.appendChild(button);
	return buttonWrapper;
}
