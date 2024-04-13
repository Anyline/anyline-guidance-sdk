/* eslint-disable @typescript-eslint/strict-boolean-expressions */

// test cases
// 1. Check when start sdk button is clicked, it should ask for permission
// 2. When allow is clicked, it should open a modal which must have a video element and capture button
// 3. When capture button is clicked, the text inside should change to "Please wait..."
// 4. When capture button is clicked, after some time, img element should have src defined
describe('guidance sdk', () => {
	it('should open modal with video element and capture button', async () => {
		// await browser.url('https://cloud-api-user-guidance-app.vercel.app/');
		await browser.url('http://localhost:8000');

		const startSdkButton = await $('#start-sdk-btn');

		await startSdkButton.click();

		const contexts = await browser.getContexts();
		await browser.switchContext(contexts[0]);

		let popUp;

		if (browser.isAndroid) {
			popUp = await $('.//android.widget.Button[@text="Allow"]');
		}

		if (browser.isIOS) {
			const capabilities = await browser.capabilities;
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

		await browser.switchContext(contexts[1]);
		const videoElement = await $('*[data-test-id="videoElement"]');

		// const isVideoElementPresent = await videoElement.isExisting();
		// const isVideoElemenVisible = await videoElement.isDisplayed();
		// const captureButton = await $('*[data-test-id="captureButtonn"]');

		// await expect(captureButton).toHaveText('Capture');
		await expect(videoElement).toBeDisplayed();
		// await expect(isVideoElemenVisible).to.be.true;
	});
});
