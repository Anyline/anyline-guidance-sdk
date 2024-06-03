import createPrimaryActionButton from '../../../components/primaryActionButton';
import Router from '../../../modules/Router';
import VideoStreamScreen from '../../videoStream';
import css from './index.module.css';

export default function createStartCaptureProcessButton(): HTMLDivElement {
	const buttonWrapper = document.createElement('div');
	buttonWrapper.className = css.buttonWrapper;
	const button = createPrimaryActionButton();
	button.innerText = 'Start capture process';

	button.onclick = async () => {
		const router = Router.getInstance();
		const videoStreamScreenManager = VideoStreamScreen.getInstance();
		const container = videoStreamScreenManager.getElement();
		router.push(container);
	};

	buttonWrapper.appendChild(button);
	return buttonWrapper;
}
