import { HttpStatus } from "@nestjs/common";

enum AuthErrorCode {
	EMAIL_NOT_FOUND = "ER:10000",
	PASSWORD_NOT_MATCH = "ER:10001",
	OTP_NOT_MATCH = "ER:10002",
	OTP_NOT_SEND = "ER:10003",
}

enum SupscriptionErrorCode {
	NOT_SUBSCRIBED = "ER:40101",
	TRIAL_EXPIRED = "ER:20001",
}

enum DuplicateUniqueConstraintErrorCode {
	EMAIL_EXISTS = "ER:40901",
	PHONE_EXISTS = "ER:40902",
}

enum ValidationErrorCode {
	FIELD_EMAIL_INVALID = "ER:40001",
	FIELD_PHONE_INVALID = "ER:40002",
	FIELD_MUST_BE_NUMBER = "ER:40003",
	FIELD_MUST_BE_STRING = "ER:40004",
	FIELD_DATE_INVALID = "ER:40005",
	FIELD_STRING_MIN_LENGTH_ERROR = "ER:40006",
	FIELD_STRING_MAX_LENGTH_ERROR = "ER:40007",
	FIELD_URL_PROTOCOLS_ERROR = "ER:40008",
	FIELD_IS_REQUIRED = "ER:40009", // Cannot be null or undefined
	FIELD_MUST_BE_BOOLEAN = "ER:40010",
	FIELD_MUST_BE_POSTAL_CODE = "ER:40011",
	FIELD_MUST_BE_DATE_STRING = "ER:40012",
	FIELD_MUST_BE_INT = "ER:40013",
	FIELD_MUST_BE_LATITUDE = "ER:40014",
	FIELD_MUST_BE_LONGITUDE = "ER:40015",
	PRODUCT_VARIANT_REQUIRED_WHEN_IS_VARIANT_PRODUCT = "ER:40016",
	PARENT_PRODUCT_REQUIRED_WHEN_IS_VARIANT_PRODUCT = "ER:40017",
	PRODUCT_REQUIRED_WHEN_IS_NOT_VARIANT_PRODUCT = "ER:40018",
}

enum SchemaErrorCode {
	USER_NOT_FOUND = "ER:40401",
}

enum OtherErrorCode {
	SEND_EMAIL_FAILURE = "ER:50501",
	UNKNOWN_ERROR = "ER:50502",
}

export const BbtErrorCode = {
	authError: AuthErrorCode,
	supscriptionError: SupscriptionErrorCode,
	schemaError: SchemaErrorCode,
	duplicateUniqueConstraintError: DuplicateUniqueConstraintErrorCode,
	validationError: ValidationErrorCode,
	otherError: OtherErrorCode
}

export type BbtErrorCode = typeof BbtErrorCode;