
import { Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsIn, IsJSON, IsObject, IsOptional, ValidateNested } from "class-validator";
import { IsEnum, IsInt, IsString, IsUrl } from "src/validator";

class ServiceDetailTitleDto {
	@IsIn(["plain", "styled"])
	type: "plain" | "styled";

	@IsString()
	text: string;
}

class FormFieldStructure {
	@IsString()
	title: string;

	@IsString()
	placeholder: string;
}

class FormValidationDTO {
	@ValidateNested()
	@Type(() => FormFieldStructure)
	totalHoursOfLiveStreamDay: FormFieldStructure;

	@ValidateNested()
	@Type(() => FormFieldStructure)
	livePlatforms: FormFieldStructure;

	@ValidateNested()
	@Type(() => FormFieldStructure)
	monthOfCollaboration: FormFieldStructure;

	@ValidateNested()
	@Type(() => FormFieldStructure)
	email: FormFieldStructure;
}

class ServiceDetailCalculation {
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
	realTimeEstimatedPriceTextDesc: string;

	@IsString()
	realTimeEstimatedResultTextDesc: string;

	@IsString()
	realTimeConsultablePrice: string;

	@IsString()
	realTimeTermsAndConditionApply: string;

	@ValidateNested()
	@Type(() => FormValidationDTO)
	form: FormValidationDTO;

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
	realTimeEstimatedPriceTextDescIndonesian: string | null;

	@IsString()
	@IsOptional()
	realTimeEstimatedResultTextDescIndonesian: string | null;

	@IsString()
	@IsOptional()
	realTimeConsultablePriceIndonesian: string | null;

	@IsString()
	@IsOptional()
	realTimeTermsAndConditionApplyIndonesian: string | null;

	@IsOptional()
	@ValidateNested()
	@Type(() => FormValidationDTO)
	formIndonesian: FormValidationDTO;
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