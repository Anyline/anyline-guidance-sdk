const style = document.createElement('style');
style.textContent = `
  .hideOverflow {
    overflow: hidden;
  }
`;
document.head.append(style);

export default class DocumentScrollController {
	private static instance: DocumentScrollController | null = null;

	public static getInstance(): DocumentScrollController {
		if (DocumentScrollController.instance === null) {
			DocumentScrollController.instance = new DocumentScrollController();
		}
		return DocumentScrollController.instance;
	}

	public disableScroll(): void {
		document.body.classList.add('hideOverflow');
	}

	public enableScroll(): void {
		document.body.classList.remove('hideOverflow');
	}

	public destroy(): void {
		document.body.classList.remove('hideOverflow');
		if (style.parentNode != null) {
			style.parentNode.removeChild(style);
		}
		DocumentScrollController.instance = null;
	}
}
