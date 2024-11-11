import { registerDecorator } from "class-validator";
import { BbtErrorCode } from "src/error/enum/BbtErrorCode";
import { ExtendedValidationOptions } from "../../ExtendedValidationOptions";

export function IsValidComparisonValue(validationOptions?: ExtendedValidationOptions) {
	const defaultContext = { errorCode: BbtErrorCode.validationError.FIELD_MUST_BE_NUMBER_OR_NUMBER_COMPARISON };
	const context = validationOptions && validationOptions.context ? validationOptions.context : defaultContext;
	const opts: ExtendedValidationOptions = {
		context,
		message: `$property Must be [number, number] or number!`,
		...validationOptions,
	};

	return function (object: any, propertyName: string) {
		registerDecorator({
			name: "IsValidComparisonValue",
			target: object.constructor,
			propertyName: propertyName,
			constraints: [],
			options: opts,
			validator: {
				validate(value, args) {
					const comparisonType = (args?.object as any).comparisonType;
					if (comparisonType === "range") {
						return Array.isArray(value) && value.length === 2 && value.every((v) => typeof v === "number");
					}
					return typeof value === "number";
				},
				defaultMessage(args) {
					return `${args?.property} Must be [number, number] or number!`;
				},
			},
		});
	};
}
