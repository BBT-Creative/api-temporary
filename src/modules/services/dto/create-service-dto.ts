import { Type } from "class-transformer";
import {
	ArrayMaxSize,
	ArrayMinSize,
	IsArray,
	IsBoolean,
	IsIn,
	IsJSON,
	IsObject,
	IsOptional,
	ValidateIf,
	ValidateNested,
} from "class-validator";
import { IsEnum, IsInt, IsNumber, IsString, IsUrl } from "src/validator";
import { IsArrayOrFalse } from "src/validator/decorators/custom/ArrayOrFalse";
import { IsNumberOrFalse } from "src/validator/decorators/custom/IsNumberOrFalse";
import { IsStringOrFalse } from "src/validator/decorators/custom/IsStringOrFalse";
import { IsValidComparisonValue } from "src/validator/decorators/custom/IsValidComparisonValue";

class ServiceDetailTitleDto {
	@IsIn(["plain", "styled"])
	type: "plain" | "styled";

	@IsString()
	text: string;
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
	@IsString()
	name: string;

	@IsString()
	fieldId: string;

	@IsOptional()
	@IsStringOrFalse()
	labelId: string | false;

	@IsOptional()
	@IsStringOrFalse()
	title: string | false;

	@IsOptional()
	@IsStringOrFalse()
	titleIndonesian: string | false;

	@IsOptional()
	@IsStringOrFalse()
	placeholder: string | false;

	@IsOptional()
	@IsStringOrFalse()
	placeholderIndonesian: string | false;

	@IsEnum(FieldEnum)
	field: FieldEnum;

	@IsString()
	type: string;

	@IsOptional()
	defaultValue: string | number | boolean | Array<any> | string[] | number[] | Record<any, any> | object | null;

	@IsOptional()
	@IsNumberOrFalse()
	min: number | false;

	@IsOptional()
	@IsNumberOrFalse()
	max: number | false;

	@IsOptional()
	@IsNumberOrFalse()
	step: number | false;

	@IsOptional()
	@IsStringOrFalse()
	suffix: string | false;

	@IsOptional()
	@IsStringOrFalse()
	prefix: string | false;

	@IsBoolean()
	isCurrency: boolean;

	@IsOptional()
	@IsArrayOrFalse()
	options: Array<any> | false;

	@IsOptional()
	@IsStringOrFalse()
	label: string | false;

	@IsOptional()
	@IsStringOrFalse()
	labelIndonesian: string | false;

	@IsInt()
	@IsNumber()
	minRows: number;

	@IsOptional()
	@IsNumberOrFalse()
	maxRows: number | false;

	@IsBoolean()
	multiline: boolean;

	@IsBoolean()
	displayEmpty: boolean;

	@IsBoolean()
	required: boolean;

	@IsBoolean()
	multiple: boolean;
}

export class CalculationConditionDto {
	@IsString()
	fieldId: string;

	@IsString()
	fieldName: string;

	@IsIn(["range", "equals", "greaterThan", "lessThan"])
	comparisonType: "range" | "equals" | "greaterThan" | "lessThan";

	// Handle `value` which can be a number or an array of two numbers (range).
	@IsValidComparisonValue()
	value: [number, number] | number;

	@IsOptional()
	@IsNumber()
	multiplier?: number;
}

export class CalculationFormulaDto {
	@IsString()
	name: string;

	@IsString()
	formula: string;

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CalculationConditionDto)
	conditions: CalculationConditionDto[];
}

export class CalculationFormResultDto {
	@IsString()
	name: string;

	@IsString()
	defaultValue: string;

	@IsString()
	title: string;

	@IsIn(["currency", "number"])
	type: string;	
		
	@IsString()
	description: string;

	@IsString()
	titleIndonesian: string;

	@IsString()
	descriptionIndonesian: string;

	@IsBoolean()
	isEstimated: boolean;

	@IsString()
	formulaName: string;
}

class ServiceDetailCalculation {
	// Main
	@IsArray()
	@ValidateNested({ each: true })
	@ArrayMinSize(0)
	@ArrayMaxSize(2)
	@Type(() => ServiceDetailTitleDto)
	title: ServiceDetailTitleDto[];

	@IsString()
	description: string;

	@IsString()
	realTimeTitle: string;

	@IsString()
	realTimeDescription: string;

	@IsString()
	realTimeConsultablePrice: string;

	@IsString()
	realTimeTermsAndConditionApply: string;

	// Indonesian
	@IsArray()
	@ValidateNested({ each: true })
	@ArrayMinSize(0)
	@ArrayMaxSize(2)
	@Type(() => ServiceDetailTitleDto)
	titleIndonesian: ServiceDetailTitleDto[];

	@IsString()
	@IsOptional()
	descriptionIndonesian: string | null;

	@IsString()
	@IsOptional()
	realTimeTitleIndonesian: string | null;

	@IsString()
	@IsOptional()
	realTimeDescriptionIndonesian: string | null;

	@IsString()
	@IsOptional()
	realTimeConsultablePriceIndonesian: string | null;

	@IsString()
	@IsOptional()
	realTimeTermsAndConditionApplyIndonesian: string | null;

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
	title: string[];

	@IsString()
	description: string;

	@IsArray()
	@IsString({ each: true })
	@ArrayMinSize(0)
	tags: string[];

	@IsString()
	imageUrl: string;

	@IsArray()
	@IsOptional()
	@IsString({ each: true })
	@ArrayMinSize(0)
	@ArrayMaxSize(2)
	titleIndonesian: string[];

	@IsString()
	@IsOptional()
	descriptionIndonesian: string;
}

class ServiceDetailContent {
	@IsString()
	title: string;

	@IsString()
	description: string;

	@IsString()
	@IsOptional()
	titleIndonesian: string;

	@IsString()
	@IsOptional()
	descriptionIndonesian: string;

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => ServiceDetailContentItem)
	serviceItems: ServiceDetailContentItem[];
}

class ServiceDetailDto {
	@IsString()
	backgroundColor: string;

	@IsString()
	imageUrl: string;

	@IsArray()
	@ValidateNested({ each: true })
	@ArrayMinSize(0)
	@ArrayMaxSize(2)
	@Type(() => ServiceDetailTitleDto)
	pageTitles: ServiceDetailTitleDto[];

	@IsUrl()
	flagIconPath: string;

	@IsString()
	flagTitle: string;

	@IsOptional()
	@ValidateNested()
	@Type(() => ServiceDetailCalculation)
	calculation: ServiceDetailCalculation;

	@IsArray()
	@ValidateNested()
	@Type(() => ServiceDetailContent)
	contents: ServiceDetailContent;
}

export class CreateServiceDto {
	@IsString()
	title: string;

	@IsInt()
	description: string;

	@IsArray()
	@IsString({ each: true })
	@ArrayMinSize(0)
	tags: string[];

	@IsUrl()
	videoUrl: string;

	@IsString()
	@IsOptional()
	titleIndonesian: string;

	@IsString()
	@IsOptional()
	descriptionIndonesian: string;

	@ValidateNested()
	@Type(() => ServiceDetailDto)
	detail: ServiceDetailDto;
}
