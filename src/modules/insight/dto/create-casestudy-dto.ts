import { CaseStudyResultType, InsightType } from "@prisma/client";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsOptional, ValidateNested } from "class-validator";
import { IsEnum, IsNumber, IsString } from "src/validator";

class CaseStudyResult {
	@IsEnum(CaseStudyResultType)
	type: CaseStudyResultType;

	@IsString()
	resultName: string;

	@IsNumber()
	value: number;
}

class CaseStudyDto {
	@IsString()
	description: string;

	@IsString()
	descriptionIndonesian: string;

	@IsString()
	clientName: string;

	@IsString()
	clientIndustry: string;

	@IsString()
	clientLogoUrl: string;

	@IsString()
	yearCollabs: string;

	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	@ArrayMinSize(0)
	serviceName: string[];

	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	@ArrayMinSize(0)
	serviceTags: string[];

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@ArrayMinSize(0)
	@Type(() => CaseStudyResult)
	result: CaseStudyResult[];
}

class InsightCategoryDto {
	@IsNumber()
	id: number;
}

export class CreateCaseStudyDto {
	@IsString()
	title: string;

	@IsString()
	titleIndonesian: string;

	@IsString()
	posterPath: string;

	@IsOptional()
	@IsString()
	posterCaption: string;

	@IsString()
	content: string;

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@ArrayMinSize(0)
	@Type(() => InsightCategoryDto)
	category: InsightCategoryDto[];

	@ValidateNested()
	@Type(() => CaseStudyDto)
	caseStudy: CaseStudyDto;
}