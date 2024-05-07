export default function injectCSS(
	shadowRoot: HTMLDivElement | ShadowRoot
): void {
	const style = document.createElement('style');
	style.id = `anyline-guidance-sdk-style`;
	style.textContent = '';
	shadowRoot.appendChild(style);
}
