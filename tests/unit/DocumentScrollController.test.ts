import '@testing-library/jest-dom';
import DocumentScrollController from '../../src/modules/DocumentScrollController';
import { waitFor } from '@testing-library/dom';

describe('documentScrollController', () => {
	let documentScrollController: DocumentScrollController;

	beforeEach(() => {
		documentScrollController = DocumentScrollController.getInstance();
	});

	afterEach(() => {
		documentScrollController.destroy();
	});

	it('makes document.body not scrollable when disableScroll is called', async () => {
		void expect(document.body).not.toHaveClass('hideOverflow');
		documentScrollController.disableScroll();
		await waitFor(() => {
			void expect(document.body).toHaveClass('hideOverflow');
		});
	});

	it('makes document.body scrollable when enableScroll is called', async () => {
		documentScrollController.enableScroll();
		await waitFor(() => {
			void expect(document.body).not.toHaveClass('hideOverflow');
		});
	});

	it('removes the CSS class from head when destroy is called', () => {
		documentScrollController.destroy();
		void expect(
			document.head.contains(document.querySelector('style'))
		).toBe(false);
	});
});
