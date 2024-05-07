export default function router(
	modal: HTMLDivElement,
	screens: HTMLDivElement[]
): { navigate: (index: number) => void } {
	// hide all screens by default
	screens.forEach(screen => {
		screen.style.display = 'none';
		modal.appendChild(screen);
	});

	screens[0].style.display = 'block';

	return {
		navigate: (index: number) => {
			screens.forEach((screen, i) => {
				screen.style.display = i === index ? 'block' : 'none';
			});
		},
	};
}
