import {
	type OnComplete,
	type OnPreProcessingChecksFailed,
} from '../../src/camera/init';
import CallbackHandler from '../../src/modules/CallbackHandler';

describe('CallbackHandler', () => {
	const blob = new File([''], 'filename');

	let callbackHandler: CallbackHandler;

	beforeEach(() => {
		callbackHandler = CallbackHandler.getInstance();
	});

	afterEach(() => {
		callbackHandler.destroy();
	});

	it('should always return the same instance', () => {
		const instance1 = CallbackHandler.getInstance();
		const instance2 = CallbackHandler.getInstance();
		void expect(instance1).toBe(instance2);
	});

	it('should call onComplete when callOnComplete is called', () => {
		const onCompleteMock = jest.fn();

		callbackHandler.setOnComplete(onCompleteMock);

		const response: OnComplete = {
			blob,
		};

		callbackHandler.callOnComplete(response);
		void expect(onCompleteMock).toHaveBeenCalledWith(response);
	});

	it('should call onPreProcessingChecksFailedCallback when callOnPreProcessingChecksFailed is called', () => {
		const onPreProcessingChecksFailedMock = jest.fn();

		callbackHandler.setOnPreProcessingChecksFailedCallback(
			onPreProcessingChecksFailedMock
		);
		const response: OnPreProcessingChecksFailed = {
			blob,
			message: 'test message',
		};

		callbackHandler.callOnPreProcessingChecksFailed(response);
		void expect(onPreProcessingChecksFailedMock).toHaveBeenCalledWith(
			response
		);
	});

	it('should throw an error when callOnPreProcessingChecksFailed is called without setting the callback', () => {
		const response: OnPreProcessingChecksFailed = {
			blob,
			message: 'test message',
		};

		void expect(() => {
			callbackHandler.callOnPreProcessingChecksFailed(response);
		}).toThrow('pre-processing callback not set');
	});

	it('should destroy the callback handler instance', () => {
		void expect(CallbackHandler.getInstance()).toBe(callbackHandler);
		callbackHandler.destroy();
		void expect(CallbackHandler.getInstance()).not.toBe(callbackHandler);
	});

	it('should not call onComplete if it is not set', () => {
		console.error = jest.fn();

		const response: OnComplete = {
			blob,
		};
		callbackHandler.callOnComplete(response);
		void expect(console.error).toHaveBeenCalledWith(
			'onComplete callback function is not set.'
		);
	});
});
