import type { Options } from '@wdio/types';

const currentDate = new Date().toISOString();
const buildName = `Build-${currentDate}`;

const preConfig: Options.Testrunner = {
	runner: 'local',
	autoCompileOpts: {
		autoCompile: true,
		tsNodeOpts: {
			transpileOnly: true,
		},
	},
	user: process.env.BROWSERSTACK_USERNAME,
	key: process.env.BROWSERSTACK_ACCESS_KEY,
	specs: ['tests/integration/browserstack/**'],
	services: [
		[
			'browserstack',
			{ browserstackLocal: true, opts: { forcelocal: false } },
		],
	],
	maxInstances: 6,
	capabilities: [
		{
			browserName: 'chrome',
			'bstack:options': {
				deviceOrientation: 'portrait',
				deviceName: 'Samsung Galaxy A11',
				osVersion: '10.0',
			},
		},
		{
			browserName: 'chrome',
			'bstack:options': {
				deviceOrientation: 'portrait',
				deviceName: 'Samsung Galaxy S9',
				osVersion: '8.0',
			},
		},
		{
			browserName: 'chrome',
			'bstack:options': {
				deviceOrientation: 'portrait',
				deviceName: 'Samsung Galaxy S20',
				osVersion: '10.0',
			},
		},
		{
			browserName: 'chrome',
			'bstack:options': {
				deviceOrientation: 'portrait',
				deviceName: 'Google Pixel 3',
				osVersion: '9.0',
			},
		},
		{
			browserName: 'chrome',
			'bstack:options': {
				deviceOrientation: 'portrait',
				deviceName: 'Google Pixel 6',
				osVersion: '12.0',
			},
		},
		{
			browserName: 'chrome',
			'bstack:options': {
				deviceOrientation: 'portrait',
				deviceName: 'Google Pixel 8 Pro',
				osVersion: '14.0',
			},
		},
		{
			browserName: 'chrome',
			'bstack:options': {
				deviceOrientation: 'portrait',
				deviceName: 'Vivo Y50',
				osVersion: '10.0',
			},
		},
		{
			browserName: 'chrome',
			'bstack:options': {
				deviceOrientation: 'portrait',
				deviceName: 'Oppo Reno 3 Pro',
				osVersion: '10.0',
			},
		},
		{
			browserName: 'chrome',
			'bstack:options': {
				deviceOrientation: 'portrait',
				deviceName: 'Huawei P30',
				osVersion: '9.0',
			},
		},
		{
			browserName: 'safari',
			'bstack:options': {
				deviceOrientation: 'portrait',
				deviceName: 'iPhone X',
				osVersion: '11',
			},
		},
		{
			browserName: 'safari',
			'bstack:options': {
				deviceOrientation: 'portrait',
				deviceName: 'iPhone 11',
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
				deviceName: 'iPhone SE 2020',
				osVersion: '16',
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
