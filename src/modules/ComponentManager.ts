export default class ComponentManager {
	private static readonly instances = new Map<
		new () => ComponentManager,
		ComponentManager
	>();

	public element: HTMLDivElement;
	private observer: MutationObserver | null = null;

	constructor() {
		this.element = document.createElement('div');
	}

	public static getInstance<T extends ComponentManager>(
		this: new () => T
	): T {
		if (!ComponentManager.instances.has(this)) {
			ComponentManager.instances.set(this, new this());
		}
		return ComponentManager.instances.get(this) as T;
	}

	public onMount(callback: () => Promise<void>): void {
		this.observer = new MutationObserver((mutationsList, observer) => {
			for (const mutation of mutationsList) {
				if (mutation.type === 'childList') {
					const addedNodes = Array.from(mutation.addedNodes);
					if (addedNodes.includes(this.element)) {
						void callback();
						observer.disconnect();
						break;
					}
				}
			}
		});

		this.observer.observe(document.body, {
			childList: true,
			subtree: true,
		});
	}

	public getElement(): HTMLDivElement {
		return this.element;
	}

	public destroy(): void {
		if (this.observer != null) {
			this.observer.disconnect();
		}
		ComponentManager.instances.delete(
			this.constructor as new () => ComponentManager
		);
	}
}
