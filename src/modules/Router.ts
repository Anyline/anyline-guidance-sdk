export default class Router {
	private static instance: Router | null = null;
	private mount: HTMLDivElement | null = null;
	private screens: HTMLDivElement[] = [];

	public static getInstance(): Router {
		if (Router.instance === null) {
			Router.instance = new Router();
		}
		return Router.instance;
	}

	public init(mount: HTMLDivElement): void {
		this.mount = mount;
	}

	public push(screen: HTMLDivElement): void {
		// hide the previous screen
		if (this.screens.length > 0) {
			const previousScreen = this.screens.slice(-1)[0];
			previousScreen.style.display = 'none';
		}

		// append new screen
		this.mount?.appendChild(screen);
		this.screens = [...this.screens, screen];
	}

	public pop(): void {
		// remove the last screen
		const toPopScreen = this.screens.pop();
		if (toPopScreen != null) {
			this.mount?.removeChild(toPopScreen);
		}

		// show the previous screen
		const screenToShow = this.screens[this.screens.length - 1];
		if (screenToShow !== undefined && screenToShow !== null) {
			screenToShow.style.display = 'flex';
		}
	}
}
