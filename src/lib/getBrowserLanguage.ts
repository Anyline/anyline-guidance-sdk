export enum BrowserLanguage {
	GERMAN = 'german',
	ENGLISH = 'english',
}

export default function getBrowserLanguage(): BrowserLanguage {
	const language = navigator.language ?? 'en-US';

	const firstTwoCharactersInLanguage = language.substring(0, 2);

	const isGerman = firstTwoCharactersInLanguage === 'de';

	if (isGerman) return BrowserLanguage.GERMAN;

	return BrowserLanguage.ENGLISH;
}
