/* eslint-disable @typescript-eslint/no-unused-vars */
import '@testing-library/jest-dom';
import HostManager from '../../src/modules/HostManager';
import { screen } from '@testing-library/dom';

describe('HostManager', () => {
	it('should always return the same instance', () => {
		const instance1 = HostManager.getInstance();
		const instance2 = HostManager.getInstance();
		instance1.destroy();
		void expect(instance1).toBe(instance2);
	});

	it('host should have shadowRoot in production environment', async () => {
		process.env.MODE = 'production';
		const hostManager = HostManager.getInstance();

		const shadowRoot = hostManager.getShadowRoot();

		const testScreen = screen.getByTestId('modules-hostmanager');
		void expect(testScreen?.shadowRoot).toBeTruthy();
		hostManager.destroy();
	});

	it('host should not have shadowRoot in non-production environment', () => {
		process.env.MODE = 'development';
		const hostManager = HostManager.getInstance();

		const shadowRoot = hostManager.getShadowRoot();

		const testScreen = screen.getByTestId('modules-hostmanager');
		void expect(testScreen?.shadowRoot).toBeFalsy();
		hostManager.destroy();
	});

	it('should return shadowRoot as ShadowRoot instance in production environment', () => {
		process.env.MODE = 'production';
		const hostManager = HostManager.getInstance();

		const shadowRoot = hostManager.getShadowRoot();

		void expect(shadowRoot).toBeDefined();
		void expect(shadowRoot).toBeInstanceOf(ShadowRoot);
		hostManager.destroy();
	});

	it('should return shadowRoot as HTMLDivElement instance in non-production environment', () => {
		process.env.MODE = 'development';
		const hostManager = HostManager.getInstance();

		const shadowRoot = hostManager.getShadowRoot();

		void expect(shadowRoot).toBeDefined();
		void expect(shadowRoot).toBeInstanceOf(HTMLDivElement);
		hostManager.destroy();
	});

	it('should return the host with id anyline-guidance-sdk', () => {
		const hostManager = HostManager.getInstance();
		const host = hostManager.getHost();

		void expect(host.id).toEqual('anyline-guidance-sdk');
		hostManager.destroy();
	});

	it('should remove host from dom along with shadowRoot when destroy is called', () => {
		const hostManager = HostManager.getInstance();

		const host = hostManager.getHost();
		void expect(host).toBeInTheDocument();

		hostManager.destroy();

		void expect(host.innerHTML).toBe('');
		void expect(document.body).not.toContainElement(host);
	});
});
