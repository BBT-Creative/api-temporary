import { ValidationOptions } from "class-validator";

export interface ExtendedValidationOptions extends Omit<ValidationOptions, "context"> {
	context?: { errorCode: string };
}