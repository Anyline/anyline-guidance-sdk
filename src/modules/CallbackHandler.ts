import {
	type OnPreProcessingChecksFailed,
	type OnComplete,
} from '../camera/init';

export default class CallbackHandler {
	private static instance: CallbackHandler | null = null;

	private onComplete: ((response: OnComplete) => void) | null = null;
	private onPreProcessingChecksFailedCallback:
		| ((response: OnPreProcessingChecksFailed) => void)
		| null = null;

	private constructor() {}

	public static getInstance(): CallbackHandler {
		if (CallbackHandler.instance === null) {
			CallbackHandler.instance = new CallbackHandler();
		}
		return CallbackHandler.instance;
	}

	public setOnComplete(callback: (response: OnComplete) => void): void {
		this.onComplete = callback;
	}

	public callOnComplete(response: OnComplete): void {
		if (this.onComplete != null) {
			this.onComplete(response);
		} else {
			console.error('onComplete callback function is not set.');
		}
	}

	public setOnPreProcessingChecksFailedCallback(
		callback: (response: OnPreProcessingChecksFailed) => void
	): void {
		this.onPreProcessingChecksFailedCallback = callback;
	}

	public callOnPreProcessingChecksFailed(
		response: OnPreProcessingChecksFailed
	): void {
		if (this.onPreProcessingChecksFailedCallback != null) {
			this.onPreProcessingChecksFailedCallback(response);
			return;
		}
		throw new Error('pre-processing callback not set');
	}

	public destroy(): void {
		this.onComplete = null;
		this.onPreProcessingChecksFailedCallback = null;
		CallbackHandler.instance = null;
	}
}
