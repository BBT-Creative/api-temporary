import BaseError from "./base/BaseHttpError";

interface BbtHttpErrorParams {
	message: string;
	statusCode: number;
	code: string;
}

export class BbtHttpError extends BaseError {
	private code: string;

	constructor({ message, statusCode, code }: BbtHttpErrorParams) {
		super(message, statusCode);
		this.code = code;
		
		Object.setPrototypeOf(this, BbtHttpError.prototype);
	}

	serializeErrors() {
		return {
			message: this.message,
			statusCode: this.getStatus(),
			code: this.code,
			timestamp: new Date().toISOString(),
		};
	}
}
