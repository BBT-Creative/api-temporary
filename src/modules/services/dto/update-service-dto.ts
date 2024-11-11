import { Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsIn, IsJSON, IsObject, IsOptional, ValidateNested } from "class-validator";
import { IsBoolean, IsEnum, IsInt, IsNumber, IsString, IsUrl } from "src/validator";
import { IsArrayOrFalse } from "src/validator/decorators/custom/ArrayOrFalse";
import { IsNumberOrFalse } from "src/validator/decorators/custom/IsNumberOrFalse";
import { IsStringOrFalse } from "src/validator/decorators/custom/IsStringOrFalse";
import { IsValidComparisonValue } from "src/validator/decorators/custom/IsValidComparisonValue";

class ServiceDetailTitleDto {
	@IsOptional()
	@IsIn(["plain", "styled"])
	type?: "plain" | "styled";

	@IsOptional()
	@IsString()
	text?: string;
}

export enum FieldEnum {
	TextField = "TextField",
	Autocomplete = "Autocomplete",
	Select = "Select",
	RadioGroup = "RadioGroup",
	NumberFormat = "NumberFormat",
	DateTimePicker = "DateTimePicker",
}

export class CalculationFieldsDto {
	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@IsString()
	fieldId?: string;

	@IsOptional()
	@IsStringOrFalse()
	labelId: string | false;

	@IsOptional()
	@IsStringOrFalse()
	title?: string | false;

	@IsOptional()
	@IsStringOrFalse()
	titleIndonesian?: string | false;

	@IsOptional()
	@IsStringOrFalse()
	placeholder?: string | false;

	@IsOptional()
	@IsStringOrFalse()
	placeholderIndonesian?: string | false;

	@IsOptional()
	@IsEnum(FieldEnum)
	field?: FieldEnum;

	@IsOptional()
	@IsString()
	type?: string;

	@IsOptional()
	defaultValue?: string | number | boolean | Array<any> | string[] | number[] | Record<any, any> | object | null;

	@IsOptional()
	@IsNumberOrFalse()
	min?: number | false;

	@IsOptional()
	@IsNumberOrFalse()
	max?: number | false;

	@IsOptional()
	@IsNumberOrFalse()
	step?: number | false;

	@IsOptional()
	@IsStringOrFalse()
	suffix?: string | false;

	@IsOptional()
	@IsStringOrFalse()
	prefix?: string | false;

	@IsOptional()
	@IsBoolean()
	isCurrency?: boolean;

	@IsOptional()
	@IsArrayOrFalse()
	options?: Array<any> | false;

	@IsOptional()
	@IsStringOrFalse()
	label?: string | false;

	@IsOptional()
	@IsStringOrFalse()
	labelIndonesian?: string | false;

	@IsOptional()
	@IsNumber()
	minRows?: number;

	@IsOptional()
	@IsNumberOrFalse()
	maxRows?: number | false;

	@IsOptional()
	@IsBoolean()
	multiline?: boolean;

	@IsOptional()
	@IsBoolean()
	displayEmpty?: boolean;

	@IsOptional()
	@IsBoolean()
	required?: boolean;

	@IsOptional()
	@IsBoolean()
	multiple?: boolean;
}

export class CalculationConditionDto {
	@IsOptional()
	@IsString()
	fieldId?: string;

	@IsOptional()
	@IsString()
	fieldName?: string;

	@IsOptional()
	@IsIn(["range", "equals", "greaterThan", "lessThan"])
	comparisonType?: "range" | "equals" | "greaterThan" | "lessThan";

	// Handle `value` which can be a number or an array of two numbers (range).
	@IsOptional()
	@IsValidComparisonValue()
	value?: [number, number] | number;

	@IsOptional()
	@IsNumber()
	multiplier?: number;
}

export class CalculationFormulaDto {
	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@IsString()
	formula?: string;

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CalculationConditionDto)
	conditions?: CalculationConditionDto[];
}

export class CalculationFormResultDto {
	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@IsString()
	defaultValue?: string;

	@IsOptional()
	@IsString()
	title?: string;

	@IsOptional()
	@IsString()
	description?: string;

	@IsOptional()
	@IsIn(["currency", "number"])
	type?: string;

	@IsOptional()
	@IsString()
	titleIndonesian?: string;

	@IsOptional()
	@IsString()
	descriptionIndonesian?: string;

	@IsOptional()
	@IsBoolean()
	isEstimated?: boolean;

	@IsOptional()
	@IsString()
	formulaName?: string;
}

class ServiceDetailCalculation {
	// Main
	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@ArrayMinSize(0)
	@ArrayMaxSize(2)
	@Type(() => ServiceDetailTitleDto)
	title?: ServiceDetailTitleDto[];

	@IsString()
	description?: string;

	@IsString()
	realTimeTitle?: string;

	@IsString()
	realTimeDescription?: string;

	@IsString()
	realTimeConsultablePrice?: string;

	@IsString()
	realTimeTermsAndConditionApply?: string;

	// Indonesian
	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@ArrayMinSize(0)
	@ArrayMaxSize(2)
	@Type(() => ServiceDetailTitleDto)
	titleIndonesian?: ServiceDetailTitleDto[];

	@IsString()
	@IsOptional()
	descriptionIndonesian?: string;

	@IsString()
	@IsOptional()
	realTimeTitleIndonesian?: string;

	@IsString()
	@IsOptional()
	realTimeDescriptionIndonesian?: string;

	@IsString()
	@IsOptional()
	realTimeConsultablePriceIndonesian?: string;

	@IsString()
	@IsOptional()
	realTimeTermsAndConditionApplyIndonesian?: string;

	// Calculation
	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CalculationFieldsDto)
	form?: CalculationFieldsDto[];

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CalculationFormulaDto)
	formulas?: CalculationFormulaDto[];

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CalculationFormResultDto)
	formResults?: CalculationFormResultDto[];
}

class ServiceDetailContentItem {
	@IsArray()
	@IsString({ each: true })
	@ArrayMinSize(0)
	@ArrayMaxSize(2)
	@IsOptional()
	title?: string[];

	@IsOptional()
	@IsString()
	description?: string;

	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	@ArrayMinSize(0)
	tags?: string[];

	@IsOptional()
	@IsString()
	imageUrl?: string;

	@IsArray()
	@IsOptional()
	@IsString({ each: true })
	@ArrayMinSize(0)
	@ArrayMaxSize(2)
	titleIndonesian?: string[];

	@IsString()
	@IsOptional()
	descriptionIndonesian?: string;
}

class ServiceDetailContent {
	@IsString()
	title?: string;

	@IsString()
	description?: string;

	@IsString()
	@IsOptional()
	titleIndonesian?: string;

	@IsString()
	@IsOptional()
	descriptionIndonesian?: string;

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => ServiceDetailContentItem)
	serviceItems?: ServiceDetailContentItem[];
}

class ServiceDetailDto {
	@IsOptional()
	@IsString()
	backgroundColor?: string;

	@IsOptional()
	@IsString()
	imageUrl?: string;

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@ArrayMinSize(0)
	@ArrayMaxSize(2)
	@Type(() => ServiceDetailTitleDto)
	pageTitles?: ServiceDetailTitleDto[];

	@IsOptional()
	@IsUrl()
	flagIconPath?: string;

	@IsOptional()
	@IsString()
	flagTitle?: string;

	@IsOptional()
	@ValidateNested()
	@Type(() => ServiceDetailCalculation)
	calculation?: ServiceDetailCalculation;

	@IsOptional()
	@IsArray()
	@ValidateNested()
	@Type(() => ServiceDetailContent)
	contents?: ServiceDetailContent;
}

export class UpdateServiceDto {
	@IsString()
	@IsOptional()
	title?: string;

	@IsInt()
	@IsOptional()
	description?: string;

	@IsArray()
	@IsString({ each: true })
	@ArrayMinSize(0)
	@IsOptional()
	tags?: string[];

	@IsUrl()
	@IsOptional()
	videoUrl?: string;

	@IsString()
	@IsOptional()
	titleIndonesian?: string;

	@IsString()
	@IsOptional()
	descriptionIndonesian?: string;

	@IsOptional()
	@ValidateNested()
	@Type(() => ServiceDetailDto)
	detail?: ServiceDetailDto;
}
