export default class HostManager {
	private static instance: HostManager | null = null;
	private readonly host: HTMLDivElement = document.createElement('div');
	private shadowRoot: ShadowRoot | HTMLDivElement | null = null;

	constructor() {
		const hostId = 'anyline-guidance-sdk';
		const host = document.getElementById(hostId);
		if (host === null || host === undefined) {
			this.host.id = hostId;
			this.host.setAttribute('data-testid', 'modules-hostmanager');
			document.body.appendChild(this.host);
		}
	}

	public static getInstance(): HostManager {
		if (HostManager.instance === null) {
			HostManager.instance = new HostManager();
		}
		return HostManager.instance;
	}

	public getShadowRoot(): ShadowRoot | HTMLDivElement {
		if (process.env.MODE === 'production') {
			if (this.shadowRoot === null || this.shadowRoot === undefined) {
				this.shadowRoot = this.host.attachShadow({ mode: 'open' });
			}
		}
		return this.shadowRoot ?? this.host;
	}

	public getHost(): HTMLDivElement {
		return this.host;
	}

	public destroy(): void {
		this.host.innerHTML = '';
		document.body.removeChild(this.host);
		HostManager.instance = null;
	}
}
