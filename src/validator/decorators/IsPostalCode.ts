import { IsPostalCode as IsPostalCodeValidator } from "class-validator";
import { BbtErrorCode } from "src/error/enum/BbtErrorCode";
import { ExtendedValidationOptions } from "../ExtendedValidationOptions";

export function IsPostalCode(validationOptions?: ExtendedValidationOptions) {
	const defaultContext = { errorCode: BbtErrorCode.validationError.FIELD_URL_PROTOCOLS_ERROR };
	const context = validationOptions && validationOptions.context ? validationOptions.context : defaultContext;

	const opts: ExtendedValidationOptions = {
		context,
		message: `Invalid Postal Code Or Invalid Postal Code For Indonesia.`,
		...validationOptions,
	};

	return IsPostalCodeValidator("ID", opts);
}
