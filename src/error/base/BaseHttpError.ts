import { HttpException } from "@nestjs/common";

abstract class BaseError extends HttpException {
	constructor(message: string, httpStatus: number) {
        super(message, httpStatus);
		Object.setPrototypeOf(this, BaseError.prototype);
	}

	abstract serializeErrors(): {
		statusCode: number;
		message: string;
		code: string;
		timestamp: string;
	};
}

export default BaseError;
