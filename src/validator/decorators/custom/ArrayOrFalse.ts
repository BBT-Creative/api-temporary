import { registerDecorator } from "class-validator";
import { BbtErrorCode } from "src/error/enum/BbtErrorCode";
import { ExtendedValidationOptions } from "../../ExtendedValidationOptions";

export function IsArrayOrFalse(validationOptions?: ExtendedValidationOptions) {
	const defaultContext = { errorCode: BbtErrorCode.validationError.FIELD_MUST_BE_ARRAY_OR_FALSE };
	const context = validationOptions && validationOptions.context ? validationOptions.context : defaultContext;
	const opts: ExtendedValidationOptions = {
		context,
		message: `$property Must be array or false!`,
		...validationOptions,
	};

	return function (object: any, propertyName: string) {
		registerDecorator({
			name: "IsArrayOrFalse",
			target: object.constructor,
			propertyName: propertyName,
			constraints: [],
			options: opts,
			validator: {
				validate(value) {
					return Array.isArray(value) || value === false;
				},
				defaultMessage(args) {
					return `${args?.property} Must be array or false!`;
				},
			},
		});
	};
}
