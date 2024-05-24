import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/dom';
import OpenCVManager from '../../src/modules/OpenCVManager';

describe('OpenCVManager', () => {
	let opencvManager: OpenCVManager;

	beforeEach(() => {
		opencvManager = OpenCVManager.getInstance();
	});

	afterEach(() => {
		delete (global as any).cv;
	});

	it('loads opencv', async () => {
		void expect((global as any).cv).toBeUndefined();

		const mockCallback = jest.fn().mockResolvedValue(undefined);
		opencvManager.onLoad(mockCallback);

		void expect(mockCallback).not.toHaveBeenCalled();

		opencvManager.loadOpenCV();

		const scriptElement = document.getElementById(
			'anyline-guidance-sdk-opencv'
		) as HTMLScriptElement;

		if (scriptElement?.onload != null) {
			(global as any).cv = {
				onRuntimeInitialized: jest.fn(),
			};

			scriptElement.onload(new Event('load'));
			(global as any).cv.onRuntimeInitialized();
		}

		await waitFor(() => {
			void expect(mockCallback).toHaveBeenCalled();
			void expect((global as any).cv).toBeDefined();
		});
	});
});
