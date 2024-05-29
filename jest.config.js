export default {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.ts$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json' }],
		'^.+\\.(svg|png|gif)$': '<rootDir>/tests/svgTransform.js',
	},
	testMatch: ['<rootDir>/tests/unit/**/*.test.ts'],
	moduleNameMapper: {
		'\\.(css|less|scss|sss|styl)$':
			'<rootDir>/node_modules/jest-css-modules',
	},
	setupFilesAfterEnv: ['./jest.setup.js'],
};
