import { registerDecorator } from "class-validator";
import { BbtErrorCode } from "src/error/enum/BbtErrorCode";
import { ExtendedValidationOptions } from "../../ExtendedValidationOptions";

export function IsNumberOrFalse(validationOptions?: ExtendedValidationOptions) {
	const defaultContext = { errorCode: BbtErrorCode.validationError.FIELD_MUST_BE_NUMBER_OR_FALSE };
	const context = validationOptions && validationOptions.context ? validationOptions.context : defaultContext;
	const opts: ExtendedValidationOptions = {
		context,
		message: `$property Must be number or false!`,
		...validationOptions,
	};

	return function (object: any, propertyName: string) {
		registerDecorator({
			name: "IsNumberOrFalse",
			target: object.constructor,
			propertyName: propertyName,
			constraints: [],
			options: opts,
			validator: {
				validate(value) {
					return typeof value === "number" || value === false;
				},
				defaultMessage(args) {
					return `${args?.property} Must be a number or false!`;
				},
			},
		});
	};
}
