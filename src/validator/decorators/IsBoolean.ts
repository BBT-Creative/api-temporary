import { IsBoolean as IsBooleanValidator } from "class-validator";
import { BbtErrorCode } from "src/error/enum/BbtErrorCode";
import { ExtendedValidationOptions } from "../ExtendedValidationOptions";

export function IsBoolean(validationOptions?: ExtendedValidationOptions) {
	const defaultContext = { errorCode: BbtErrorCode.validationError.FIELD_MUST_BE_BOOLEAN };
	const context = validationOptions && validationOptions.context ? validationOptions.context : defaultContext;

	const opts: ExtendedValidationOptions = {
		context,
		message: `$property must be boolean!`,
		...validationOptions,
	};

	return IsBooleanValidator(opts);
}
