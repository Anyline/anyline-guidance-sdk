const currentDate = new Date().toISOString();
const buildName = `Build-${currentDate}`;

exports.config = {
	async before(capabilities, specs) {
		setOptions({ wait: 5000 });
		global.wdioExpect = global.expect;
		await import('expect-webdriverio').then(mod => {
			global.expect = mod.default;
		});
	},
	runner: 'local',
	autoCompileOpts: {
		autoCompile: true,
		tsNodeOpts: {
			project: './tsconfig.e2e.json',
			transpileOnly: true,
		},
	},
	user: process.env.BROWSERSTACK_USERNAME,
	key: process.env.BROWSERSTACK_ACCESS_KEY,
	specs: [
		// ToDo: define location for spec files here
		'tests/integration/browserstack/index.browserstack.test.js',
	],
	services: [
		[
			'browserstack',
			{ browserstackLocal: true, opts: { forcelocal: false } },
		],
	],
	capabilities: [
		// {
		// 	browserName: 'samsung',
		// 	'bstack:options': {
		// 		deviceOrientation: 'portrait',
		// 		deviceName: 'Samsung Galaxy S20',
		// 		osVersion: '10.0',
		// 	},
		// },
		// {
		// 	browserName: 'chrome',
		// 	'bstack:options': {
		// 		deviceOrientation: 'portrait',
		// 		deviceName: 'Samsung Galaxy S9',
		// 		osVersion: '8.0',
		// 	},
		// },
		// {
		// 	browserName: 'chrome',
		// 	'bstack:options': {
		// 		deviceOrientation: 'portrait',
		// 		deviceName: 'Samsung Galaxy S20',
		// 		osVersion: '10.0',
		// 	},
		// },
		// {
		// 	browserName: 'chrome',
		// 	'bstack:options': {
		// 		deviceOrientation: 'portrait',
		// 		deviceName: 'Samsung Galaxy S22 Ultra',
		// 		osVersion: '12.0',
		// 	},
		// },
		{
			browserName: 'safari',
			'bstack:options': {
				deviceOrientation: 'portrait',
				deviceName: 'iPhone 13 Pro',
				osVersion: '15',
			},
		},
		{
			browserName: 'safari',
			'bstack:options': {
				deviceOrientation: 'portrait',
				deviceName: 'iPhone 11 Pro Max',
				osVersion: '13',
			},
		},
		{
			browserName: 'chromium',
			'bstack:options': {
				deviceOrientation: 'portrait',
				deviceName: 'iPhone 13 Pro',
				osVersion: '15',
			},
		},
	],
	commonCapabilities: {
		'bstack:options': {
			buildName,
			projectName: 'Anyline Guidance SDK',
			consoleLogs: 'info',
		},
	},
	framework: 'mocha',
	reporters: ['spec'],
	mochaOpts: {
		ui: 'bdd',
		timeout: 60000,
	},
};
exports.config.capabilities.forEach(function (caps) {
	for (const i in exports.config.commonCapabilities)
		caps[i] = { ...caps[i], ...exports.config.commonCapabilities[i] };
});
