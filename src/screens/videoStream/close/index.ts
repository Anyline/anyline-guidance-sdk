import Router from '../../../modules/Router';
import StreamManager from '../../../modules/StreamManager';
import VideoManager from '../../../modules/VideoManager';
import css from './index.module.css';

export default function createCloseElement(): HTMLButtonElement {
	const button = document.createElement('button');
	button.className = css.button;
	button.id = 'closeButton';
	button.setAttribute('data-test-id', 'closeButton');
	button.innerHTML = `<div class=${css.buttonInner}><div>&#x2715;</div></div>`;

	button.onclick = () => {
		const router = Router.getInstance();
		const streamManager = StreamManager.getInstance();
		const videoManager = VideoManager.getInstance();
		streamManager.destroy();
		videoManager.destroy();
		router.pop();
	};

	return button;
}
