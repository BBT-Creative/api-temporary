import * as ValidatorJS from "validator";
import { IsUrl as IsUrlDecorators } from "class-validator";
import { BbtErrorCode } from "src/error/enum/BbtErrorCode";
import { ExtendedValidationOptions } from "../ExtendedValidationOptions";

export function IsUrl(options?: ValidatorJS.IsURLOptions, validationOptions?: ExtendedValidationOptions) {
	const defaultContext = { errorCode: BbtErrorCode.validationError.FIELD_MUST_BE_STRING };
	const context = validationOptions && validationOptions.context ? validationOptions.context : defaultContext;
	const extendedValidationOptions: ExtendedValidationOptions = {
		context,
		message: `$property must be valid URL or URL Protocols Must Be HTTPS!`,
		...validationOptions,
	};

	const defaultProtocols = ["https"];
	const defaultOptions: ValidatorJS.IsURLOptions = {
		protocols: defaultProtocols,
		require_protocol: true,
		...options,
	};

	return IsUrlDecorators(defaultOptions, extendedValidationOptions);
}
