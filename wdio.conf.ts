// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import type { Options } from '@wdio/types';

const currentDate = new Date().toISOString();
const buildName = `Build-${currentDate}`;

const preConfig: Options.Testrunner = {
	runner: 'local',
	autoCompileOpts: {
		autoCompile: true,
		tsNodeOpts: {
			project: 'tsconfig.json',
			transpileOnly: true,
		},
	},
	user: process.env.BROWSERSTACK_USERNAME,
	key: process.env.BROWSERSTACK_ACCESS_KEY,
	specs: ['tests/integration/browserstack/*.ts'],
	services: [
		[
			'browserstack',
			{ browserstackLocal: true, opts: { forcelocal: false } },
		],
	],
	capabilities: [
		{
			browserName: 'chrome',
			'bstack:options': {
				deviceOrientation: 'portrait',
				deviceName: 'Samsung Galaxy S9',
				osVersion: '8.0',
			},
		},
	] as WebdriverIO.Capabilities[],
	framework: 'mocha',
	reporters: ['spec'],
	mochaOpts: {
		ui: 'bdd',
		timeout: 60000,
	},
};

const browserstackConfig = {
	commonCapabilities: {
		'bstack:options': {
			buildName,
			projectName: 'Anyline Guidance SDK',
			consoleLogs: 'info',
		},
	},
};

(preConfig.capabilities as WebdriverIO.Capabilities[]).forEach(function (
	caps: WebdriverIO.Capabilities
) {
	for (const i in browserstackConfig.commonCapabilities) {
		caps[i] = { ...caps[i], ...browserstackConfig.commonCapabilities[i] };
	}
});

export const config = preConfig;
