import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/dom';
import OpenCVManager from '../../src/modules/OpenCVManager';

describe('OpenCVManager', () => {
	let opencvManager: OpenCVManager;

	beforeEach(() => {
		opencvManager = OpenCVManager.getInstance();
	});

	afterEach(() => {
		opencvManager.destroy();
		jest.clearAllMocks();
	});

	it('loads opencv successfully', async () => {
		void expect((global as any).cv).toBeUndefined();

		opencvManager.isOpenCVLoaded = true;
		const mockCallback = jest.fn();
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

	it('handles opencv load error', async () => {
		void expect((global as any).cv).toBeUndefined();

		opencvManager.isOpenCVLoaded = true;
		const mockCallback = jest.fn();
		opencvManager.onLoad(mockCallback);

		void expect(mockCallback).not.toHaveBeenCalled();

		opencvManager.loadOpenCV();

		const scriptElement = document.getElementById(
			'anyline-guidance-sdk-opencv'
		) as HTMLScriptElement;

		if (scriptElement?.onerror != null) {
			scriptElement.onerror(new Event('error'));
		}

		await waitFor(() => {
			void expect(mockCallback).toHaveBeenCalledWith(expect.any(Error));
			void expect((global as any).cv).toBeUndefined();
		});
	});

	it('throws error when opencv has not finished loading', async () => {
		opencvManager.isOpenCVLoaded = false;
		const mockCallback = jest.fn().mockResolvedValue(undefined);
		opencvManager.onLoad(mockCallback);

		await waitFor(() => {
			void expect(mockCallback).toHaveBeenCalledWith(expect.any(Error));
		});
	});
});
