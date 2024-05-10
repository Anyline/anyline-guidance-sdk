import '@testing-library/jest-dom';
import closeSDK from '../../src/lib/closeSDK';
import { waitFor } from '@testing-library/dom';
import Router from '../../src/modules/Router';
import StreamManager from '../../src/modules/StreamManager';
import VideoManager from '../../src/modules/VideoManager';
import FileInputManager from '../../src/modules/FileInputManager';
import ImageManager from '../../src/modules/ImageManager';
import VideoStreamScreen from '../../src/screens/videoStream';
import HostManager from '../../src/modules/HostManager';
import OnboardingScreen from '../../src/screens/onboardingInstructions';

describe('closeSDK', () => {
	it('removes host from DOM', async () => {
		const hostManager = HostManager.getInstance();
		const host = hostManager.getHost();

		void expect(host).toBeInTheDocument();

		closeSDK();
		await waitFor(async () => {
			await expect(host).not.toBeInTheDocument();
		});
	});

	it('remove all running instances of the SDK', () => {
		const router = Router.getInstance();
		const streamManager = StreamManager.getInstance();
		const videoManager = VideoManager.getInstance();
		const fileInputManager = FileInputManager.getInstance();
		const imageManager = ImageManager.getInstance();
		const videoStreamScreenManager = VideoStreamScreen.getInstance();
		const onboardingScreenManager = OnboardingScreen.getInstance();
		const hostManager = HostManager.getInstance();

		const routerSpy = jest
			.spyOn(router, 'destroy')
			.mockImplementation(() => {});
		void expect(routerSpy).not.toHaveBeenCalled();

		const streamManagerSpy = jest
			.spyOn(streamManager, 'destroy')
			.mockImplementation(() => {});
		void expect(streamManagerSpy).not.toHaveBeenCalled();

		const videoManagerSpy = jest
			.spyOn(videoManager, 'destroy')
			.mockImplementation(() => {});
		void expect(videoManagerSpy).not.toHaveBeenCalled();

		const fileInputManagerSpy = jest
			.spyOn(fileInputManager, 'destroy')
			.mockImplementation(() => {});
		void expect(fileInputManagerSpy).not.toHaveBeenCalled();

		const imageManagerSpy = jest
			.spyOn(imageManager, 'destroy')
			.mockImplementation(() => {});
		void expect(imageManagerSpy).not.toHaveBeenCalled();

		const videoStreamScreenManagerSpy = jest
			.spyOn(videoStreamScreenManager, 'destroy')
			.mockImplementation(() => {});
		void expect(videoStreamScreenManagerSpy).not.toHaveBeenCalled();

		const onboardingScreenManagerSpy = jest
			.spyOn(onboardingScreenManager, 'destroy')
			.mockImplementation(() => {});
		void expect(onboardingScreenManagerSpy).not.toHaveBeenCalled();

		const hostManagerSpy = jest
			.spyOn(hostManager, 'destroy')
			.mockImplementation(() => {});
		void expect(hostManagerSpy).not.toHaveBeenCalled();

		closeSDK();

		void expect(routerSpy).toHaveBeenCalledTimes(1);
		void expect(streamManagerSpy).toHaveBeenCalledTimes(1);
		void expect(videoManagerSpy).toHaveBeenCalledTimes(1);
		void expect(fileInputManagerSpy).toHaveBeenCalledTimes(1);
		void expect(imageManagerSpy).toHaveBeenCalledTimes(1);
		void expect(videoStreamScreenManagerSpy).toHaveBeenCalledTimes(1);
		void expect(onboardingScreenManagerSpy).toHaveBeenCalledTimes(1);
		void expect(hostManagerSpy).toHaveBeenCalledTimes(1);
	});
});
