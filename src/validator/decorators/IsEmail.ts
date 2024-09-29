import * as ValidatorJS from "validator";
import { IsEmail as IsEmailValidator } from "class-validator";
import { BbtErrorCode } from "src/error/enum/BbtErrorCode";
import { ExtendedValidationOptions } from "../ExtendedValidationOptions";

export function IsEmail(options?: ValidatorJS.IsEmailOptions, validationOptions?: ExtendedValidationOptions) {
	const defaultContext = { errorCode: BbtErrorCode.validationError.FIELD_EMAIL_INVALID };
	const context = validationOptions && validationOptions.context ? validationOptions.context : defaultContext;

	const opts: ExtendedValidationOptions = {
		context,
		message: `Email Is Invalid.`,
		...validationOptions,
	};

	return IsEmailValidator(options, opts);
}
