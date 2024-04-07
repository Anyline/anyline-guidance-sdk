export default function createModal(): HTMLElement {
	// modal container
	const modal = document.createElement('div');
	modal.style.position = 'fixed';
	modal.style.left = '0';
	modal.style.top = '0';
	modal.style.width = '100vw';
	modal.style.height = '100vh';
	modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
	modal.style.display = 'flex';
	modal.style.justifyContent = 'center';
	modal.style.alignItems = 'center';
	modal.style.zIndex = '1000';
	// append modal to the body
	document.body.appendChild(modal);

	return modal;
}
