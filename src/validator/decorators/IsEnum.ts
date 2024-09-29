import { IsEnum as IsEnumValidator } from "class-validator";
import { BbtErrorCode } from "src/error/enum/BbtErrorCode";
import { ExtendedValidationOptions } from "../ExtendedValidationOptions";

export function IsEnum(entity: object, validationOptions?: ExtendedValidationOptions) {
	const defaultContext = { errorCode: BbtErrorCode.validationError.FIELD_EMAIL_INVALID };
	const context = validationOptions && validationOptions.context ? validationOptions.context : defaultContext;
	const entityType = Object.values(entity).join(" or ");

	const opts: ExtendedValidationOptions = {
		context,
		message: `$property must be type of ${entityType}`,
		...validationOptions,
	};

	return IsEnumValidator(entity, opts);
}
