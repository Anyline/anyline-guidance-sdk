import '@testing-library/jest-dom';
import closeSDK from '../../src/lib/closeSDK';
import { waitFor } from '@testing-library/dom';
import Router from '../../src/modules/Router';
import ImageManager from '../../src/modules/ImageManager';
import HostManager from '../../src/modules/HostManager';
import ConfigManager from '../../src/modules/ConfigManager/ConfigManager';
import LocalStorageManager from '../../src/modules/LocalStorageManager';
import DocumentScrollController from '../../src/modules/DocumentScrollController';
import CallbackHandler from '../../src/modules/CallbackHandler';

describe('closeSDK', () => {
	it('removes host from DOM', async () => {
		const hostManager = HostManager.getInstance();
		const host = hostManager.getHost();

		void expect(host).toBeInTheDocument();

		closeSDK();
		await waitFor(async () => {
			void expect(host).not.toBeInTheDocument();
		});
	});

	it('remove all running instances of the SDK', () => {
		const router = Router.getInstance();
		const configManager = ConfigManager.getInstance();
		const callbackHandler = CallbackHandler.getInstance();
		const documentScrollController = DocumentScrollController.getInstance();
		const imageManager = ImageManager.getInstance();
		const localStorageManager = LocalStorageManager.getInstance();
		const hostManager = HostManager.getInstance();

		const routerSpy = jest
			.spyOn(router, 'destroy')
			.mockImplementation(() => {});
		void expect(routerSpy).not.toHaveBeenCalled();

		const configManagerSpy = jest
			.spyOn(configManager, 'destroy')
			.mockImplementation(() => {});
		void expect(configManagerSpy).not.toHaveBeenCalled();

		const callbackHandlerSpy = jest
			.spyOn(callbackHandler, 'destroy')
			.mockImplementation(() => {});
		void expect(callbackHandlerSpy).not.toHaveBeenCalled();

		const documentScrollControllerEnableScrollSpy = jest
			.spyOn(documentScrollController, 'enableScroll')
			.mockImplementation(() => {});
		void expect(
			documentScrollControllerEnableScrollSpy
		).not.toHaveBeenCalled();

		const documentScrollControllerSpy = jest
			.spyOn(documentScrollController, 'destroy')
			.mockImplementation(() => {});
		void expect(documentScrollControllerSpy).not.toHaveBeenCalled();

		const imageManagerSpy = jest
			.spyOn(imageManager, 'destroy')
			.mockImplementation(() => {});
		void expect(imageManagerSpy).not.toHaveBeenCalled();

		const localStorageManagerSpy = jest
			.spyOn(localStorageManager, 'destroy')
			.mockImplementation(() => {});
		void expect(localStorageManagerSpy).not.toHaveBeenCalled();

		const hostManagerSpy = jest
			.spyOn(hostManager, 'destroy')
			.mockImplementation(() => {});
		void expect(hostManagerSpy).not.toHaveBeenCalled();

		closeSDK();

		void expect(routerSpy).toHaveBeenCalledTimes(1);
		void expect(configManagerSpy).toHaveBeenCalledTimes(1);
		void expect(callbackHandlerSpy).toHaveBeenCalledTimes(1);
		void expect(
			documentScrollControllerEnableScrollSpy
		).toHaveBeenCalledTimes(1);
		void expect(documentScrollControllerSpy).toHaveBeenCalledTimes(1);
		void expect(imageManagerSpy).toHaveBeenCalledTimes(1);
		void expect(localStorageManagerSpy).toHaveBeenCalledTimes(1);
		void expect(hostManagerSpy).toHaveBeenCalledTimes(1);
	});
});
