export default {
	preset: 'ts-jest',
	testEnvironment: 'jest-environment-jsdom',
	transform: {
		'^.+\\.ts$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json' }],
		'^.+\\.svg$': '<rootDir>/tests/svgTransform.js',
	},
	testMatch: ['<rootDir>/tests/unit/**/*.test.ts'],
	moduleNameMapper: {
		'\\.(css|less|scss|sss|styl)$':
			'<rootDir>/node_modules/jest-css-modules',
	},
	setupFilesAfterEnv: ['./jest.setup.js'],
};
