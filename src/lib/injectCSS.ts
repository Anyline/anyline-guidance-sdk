import createShadowRoot from './createShadowRoot';

export default function injectCSS(): void {
	const style = document.createElement('style');
	style.id = `anyline-guidance-sdk-style`;
	style.textContent = '';
	const shadowRoot = createShadowRoot();
	shadowRoot.appendChild(style);
}
