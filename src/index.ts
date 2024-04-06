// TODOs
// 1. Make video element parameterized
// 3. Add config to getImage function
// 4. Introduce sonarcloud, eslint, ci pipeline, yarn
// 5. Ship typescript module
// 6. Remove vite
// 7. Use ImageCapture polyfill from npm
// 8. Check why importing the function doesn't work on browser

const getImage = async ({
	videoElementId,
}: {
	videoElementId: string;
}): Promise<void> => {
	if (typeof navigator.mediaDevices === 'undefined') {
		await Promise.reject(new Error('Unsupported device'));
	}
	const videoElement = document.getElementById(videoElementId);
	if (videoElement === null || videoElement === undefined) {
		await Promise.reject(
			new Error(
				`No video element with id ${videoElementId} was found in the DOM`
			)
		);
	}
	try {
		// TODO
		// await Promise.resolve('Success');
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		}
		await Promise.reject(error);
	}
};

export default getImage;
