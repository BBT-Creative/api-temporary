import { registerDecorator } from "class-validator";
import { BbtErrorCode } from "src/error/enum/BbtErrorCode";
import { ExtendedValidationOptions } from "../../ExtendedValidationOptions";

export function IsStringOrFalse(validationOptions?: ExtendedValidationOptions) {
	const defaultContext = { errorCode: BbtErrorCode.validationError.FIELD_MUST_BE_STRING_OR_FALSE };
	const context = validationOptions && validationOptions.context ? validationOptions.context : defaultContext;
	const opts: ExtendedValidationOptions = {
		context,
		message: `$property Must be string or false!`,
		...validationOptions,
	};

	return function (object: any, propertyName: string) {
		registerDecorator({
			name: "IsStringOrFalse",
			target: object.constructor,
			propertyName: propertyName,
			constraints: [],
			options: opts,
			validator: {
				validate(value) {
					return typeof value === "string" || value === false;
				},
				defaultMessage(args) {
					return `${args?.property} Must be a string or false!`;
				},
			},
		});
	};
}
