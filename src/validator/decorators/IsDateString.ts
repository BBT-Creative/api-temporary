import * as ValidatorJS from "validator";
import { IsDateString as IsDateStringValidator } from "class-validator";
import { BbtErrorCode } from "src/error/enum/BbtErrorCode";
import { ExtendedValidationOptions } from "../ExtendedValidationOptions";

export function IsDateString(options?: ValidatorJS.IsISO8601Options, validationOptions?: ExtendedValidationOptions) {
	const defaultContext = { errorCode: BbtErrorCode.validationError.FIELD_MUST_BE_DATE_STRING };
	const context = validationOptions && validationOptions.context ? validationOptions.context : defaultContext;

	const vOpts: ExtendedValidationOptions = {
		context,
		message: `$property Must Be Date String.`,
		...validationOptions,
	};

	return IsDateStringValidator(options, vOpts);
}
