import { IsNumber as IsNumberValidator, IsNumberOptions } from "class-validator";
import { BbtErrorCode } from "src/error/enum/BbtErrorCode";
import { ExtendedValidationOptions } from "../ExtendedValidationOptions";

export function IsNumber(isNumberOptions?: IsNumberOptions, validationOptions?: ExtendedValidationOptions) {
	const defaultContext = { errorCode: BbtErrorCode.validationError.FIELD_MUST_BE_NUMBER };
	const context = validationOptions && validationOptions.context ? validationOptions.context : defaultContext;

	const opts: ExtendedValidationOptions = {
		context,
		message: `$property must be number`,
		...validationOptions,
	};

	return IsNumberValidator(isNumberOptions, opts);
}
