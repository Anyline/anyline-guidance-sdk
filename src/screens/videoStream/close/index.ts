import VideoStreamScreen from '..';
import FileInputManager from '../../../modules/FileInputManager';
import Router from '../../../modules/Router';
import StreamManager from '../../../modules/StreamManager';
import VideoManager from '../../../modules/VideoManager';
import commonCSS from '../../onboardingInstructions/closeSDKButton/index.module.css';
import css from './index.module.css';

export default function createCloseElement(): HTMLButtonElement {
	const button = document.createElement('button');
	button.className = commonCSS.button;
	button.id = 'closeButton';
	button.setAttribute('data-test-id', 'closeButton');
	button.innerHTML = `<div class=${css.buttonInner}><div>&#10132;</div></div>`;

	button.onclick = () => {
		const videoStreamScreenManager = VideoStreamScreen.getInstance();
		const fileInputManager = FileInputManager.getInstance();
		const router = Router.getInstance();
		const streamManager = StreamManager.getInstance();
		const videoManager = VideoManager.getInstance();

		videoStreamScreenManager.destroy();
		fileInputManager.destroy();
		streamManager.destroy();
		videoManager.destroy();
		router.pop();
	};

	return button;
}
