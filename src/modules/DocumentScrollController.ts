export default class DocumentScrollController {
	private static instance: DocumentScrollController | null = null;
	private readonly style: HTMLStyleElement = document.createElement('style');

	public static getInstance(): DocumentScrollController {
		if (DocumentScrollController.instance === null) {
			DocumentScrollController.instance = new DocumentScrollController();
		}
		return DocumentScrollController.instance;
	}

	public disableScroll(): void {
		this.style.textContent = `
    .hideOverflow {
      overflow: hidden;
    }
  `;
		document.head.append(this.style);
		document.body.classList.add('hideOverflow');
	}

	public enableScroll(): void {
		document.body.classList.remove('hideOverflow');
		if (this.style.parentNode != null) {
			this.style.parentNode.removeChild(this.style);
		}
		document.body.classList.remove('hideOverflow');
	}

	public destroy(): void {
		DocumentScrollController.instance = null;
	}
}
