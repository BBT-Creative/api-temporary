import { IsPhoneNumber as IsPhoneNumberValidator } from "class-validator";
import { BbtErrorCode } from "src/error/enum/BbtErrorCode";
import { ExtendedValidationOptions } from "../ExtendedValidationOptions";

export function IsPhoneNumber(validationOptions?: ExtendedValidationOptions) {
	const defaultContext = { errorCode: BbtErrorCode.validationError.FIELD_PHONE_INVALID };
	const context = validationOptions && validationOptions.context ? validationOptions.context : defaultContext;

	const opts: ExtendedValidationOptions = {
		context,
		message: `Invalid Phone Number`,
		...validationOptions,
	};

	return IsPhoneNumberValidator("ID", opts);
}
