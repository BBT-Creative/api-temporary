import { IsLatitude as IsLatitudeValidator } from "class-validator";
import { BbtErrorCode } from "src/error/enum/BbtErrorCode";
import { ExtendedValidationOptions } from "../ExtendedValidationOptions";

export function IsLatitude(validationOptions?: ExtendedValidationOptions) {
	const defaultContext = { errorCode: BbtErrorCode.validationError.FIELD_MUST_BE_LATITUDE };
	const context = validationOptions && validationOptions.context ? validationOptions.context : defaultContext;

	const opts: ExtendedValidationOptions = {
		context,
		message: `$property Must Be Valid Latitude`,
		...validationOptions,
	};

	return IsLatitudeValidator(opts);
}
