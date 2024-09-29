import { BadRequestException } from "@nestjs/common";
import { ValidationError } from "class-validator";

abstract class BaseValidationError extends BadRequestException {
	constructor(objectOrError: ValidationError[]) {
		super(objectOrError);
		Object.setPrototypeOf(this, BaseValidationError.prototype);
	}

	abstract serializeErrors(): {
        message: string;
        statusCode: number;
        code: string;
        timestamp: string;
	};
}

export default BaseValidationError;
