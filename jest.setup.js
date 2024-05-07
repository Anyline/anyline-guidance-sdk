import { readFileSync } from 'fs';
import { jest } from '@jest/globals';

jest.mock('./src/lib/injectCSS');

beforeEach(() => {
	const html = readFileSync('public/index.html', 'utf8');
	document.body.innerHTML = html;
});
