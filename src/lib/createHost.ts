export default function createHost(): HTMLDivElement {
	const hostId = 'anyline-guidance-sdk';

	let host: HTMLDivElement;

	host = document.getElementById(hostId) as HTMLDivElement;

	if (host === undefined || host === null) {
		host = document.createElement('div');
		host.id = hostId;
		host.setAttribute('data-testid', 'lib-create-host');
		document.body.appendChild(host);
		return host;
	}

	return host;
}
