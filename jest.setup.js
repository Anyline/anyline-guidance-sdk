import { readFileSync } from 'fs';

beforeEach(() => {
	const html = readFileSync('public/index.html', 'utf8');
	document.body.innerHTML = html;
});
