import { expect } from 'expect-webdriverio';
import { browser, $ } from '@wdio/globals';

async function visitDemo(): Promise<void> {
	await browser.url('https://cloud-api-user-guidance-app.vercel.app/');
	// await browser.url('http://localhost:8000');
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

describe('guidance sdk', () => {
	it.skip('should open modal with video element and capture button', async () => {
		await visitDemo();
		await startSDK();
		await acceptCameraPermission();

		const videoElement = await $('*[data-test-id="videoElement"]');
		const captureButton = await $('*[data-test-id="captureButton"]');
		await expect(videoElement).toBeDisplayed();
		await expect(captureButton).toBeDisplayed();
	});

	it('should receive image blob after capture button is clicked', async () => {
		await visitDemo();

		const demoImage = await $('#new-image');

		const demoImageSrcBefore = await demoImage.getAttribute('src');

		await expect(demoImageSrcBefore).toBeFalsy();

		await startSDK();
		await acceptCameraPermission();

		const captureButton = await $('*[data-test-id="captureButton"]');
		await captureButton.click();

		await browser.waitUntil(
			async () => {
				const src = await demoImage.getAttribute('src');
				return src && src.length > 0;
			},
			{
				timeout: 5000,
				timeoutMsg: 'Image src was not set within the expected time',
			}
		);

		const demoImageSrcAfter = await demoImage.getAttribute('src');

		await expect(demoImageSrcAfter).toBeTruthy();
	});
});
