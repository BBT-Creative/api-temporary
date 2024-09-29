import { ValidationError } from "class-validator";
import BaseValidationError from "./base/BaseValidationError";
import * as moment from "moment-timezone";
import { BbtErrorCode } from "./enum/BbtErrorCode";

export class BbtValidationError extends BaseValidationError {
	private errorCode: string;

	constructor(errors: ValidationError[]) {
		super(errors);

		const constraint = errors.map((item) => item.constraints && Object.keys(item.constraints)[0])[0];
		const code = errors.map((failed) => failed.contexts && (failed.contexts[constraint || ""].errorCode as string))[0];
		this.errorCode = constraint && code ? code : BbtErrorCode.otherError.UNKNOWN_ERROR;

		Object.setPrototypeOf(this, BbtValidationError.prototype);
	}

	serializeErrors() {
		return {
			message: this.message,
			statusCode: this.getStatus(),
			code: this.errorCode,
			timestamp: moment().tz("Asia/Jakarta").toISOString(),
		};
	}
}
