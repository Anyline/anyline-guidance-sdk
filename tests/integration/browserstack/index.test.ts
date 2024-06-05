import { expect } from 'expect-webdriverio';
import { browser, $ } from '@wdio/globals';

async function visitDemo(): Promise<void> {
	await browser.url('http://localhost:8000');
}

async function startSDK(): Promise<void> {
	const startSdkButton = await $('#start-sdk-btn');
	await startSdkButton.click();
}

async function acceptCameraPermission(): Promise<void> {
	const contexts = await browser.getContexts();
	await browser.switchContext(contexts[0] as string);
	let popUp;
	if (browser.isAndroid) {
		popUp = await $('.//android.widget.Button[@text="Allow"]');
	}
	if (browser.isIOS) {
		const capabilities = browser.capabilities;
		// @ts-expect-error: browserName exists in wdio config
		const { browserName } = capabilities;
		if (browserName === '') {
			// hack for chromium on ios, browsername is empty for chromium on ios
			// it shows 1 popup before the native permission popup
			// accept the 1st popup first
			const chormiumPopUp = await $(`[name="OK"]`);
			await chormiumPopUp.click();
		}
		popUp = await $(`[name="Allow"]`);
	}
	await popUp.click();
	await browser.switchContext(contexts[1] as string);
}

describe('goes to video stream screen after clicking Start capture process button from onboarding screen', () => {
	it('should open modal with onboarding instructions', async () => {
		await visitDemo();
		await startSDK();

		const startCaptureProcessButton = await $(
			'*[data-testid="screens-onboardingInstructions-start-capture-process"]'
		);

		await startCaptureProcessButton.click();

		const videoStreamWrapper = await $(
			'*[data-testid="screens-videoStream-container"]'
		);

		await expect(videoStreamWrapper).toBeDisplayed();

		await acceptCameraPermission();

		const videoElement = await $('*[data-testid="screens-videoElement"]');
		const captureButton = await $('*[data-testid="screens-captureButton"]');
		await expect(videoElement).toBeDisplayed();
		await expect(captureButton).toBeDisplayed();
	});
});
