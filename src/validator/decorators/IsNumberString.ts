import * as ValidatorJS from "validator";
import { IsNumberString as IsNumberStringValidator } from "class-validator";
import { BbtErrorCode } from "src/error/enum/BbtErrorCode";
import { ExtendedValidationOptions } from "../ExtendedValidationOptions";

export function IsNumberString(options?: ValidatorJS.IsNumericOptions, validationOptions?: ExtendedValidationOptions) {
	const defaultContext = { errorCode: BbtErrorCode.validationError.FIELD_MUST_BE_NUMBER };
	const context = validationOptions && validationOptions.context ? validationOptions.context : defaultContext;

	const opts: ExtendedValidationOptions = {
		context,
		message: `$property Must Be Number String!`,
		...validationOptions,
	};

	return IsNumberStringValidator(options, opts);
}
