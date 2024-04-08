export default {
	preset: 'ts-jest',
	testEnvironment: 'jest-environment-jsdom',
	transform: {
		'^.+\\.ts$': ['ts-jest'],
		'^.+\\.svg$': '<rootDir>/svgTransform.js',
	},
	testMatch: ['<rootDir>/src/tests/**/*.ts'],
	moduleNameMapper: {
		'\\.(css|less|scss|sss|styl)$':
			'<rootDir>/node_modules/jest-css-modules',
	},
};
