import { arrayNotEmpty, isNotEmpty, isNotEmptyObject, registerDecorator } from "class-validator";
import { BbtErrorCode } from "src/error/enum/BbtErrorCode";
import { ExtendedValidationOptions } from "../../ExtendedValidationOptions";

export function IsRequired(validationOptions?: ExtendedValidationOptions) {
	const defaultContext = { errorCode: BbtErrorCode.validationError.FIELD_IS_REQUIRED };
	const context = validationOptions && validationOptions.context ? validationOptions.context : defaultContext;
	const opts: ExtendedValidationOptions = {
		context,
		message: `$property Cannot Be Null Or Undefined!`,
		...validationOptions,
	};

	return function (object: any, propertyName: string) {
		registerDecorator({
			name: "IsRequired",
			target: object.constructor,
			propertyName: propertyName,
			constraints: [],
			options: opts,
			validator: {
				validate(value) {
					if (typeof value == "string") {
						return isNotEmpty(value);
					}

					if (Array.isArray(value)) {
						return arrayNotEmpty(value);
					}

					if (typeof value == "object") {
						return isNotEmptyObject(value);
					}

					return value !== null || value !== undefined;
				},
				defaultMessage(args) {
					return `${args?.property} Cannot Be Null or Undefined!`;
				},
			},
		});
	};
}
