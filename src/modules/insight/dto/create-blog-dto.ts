import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsOptional, ValidateNested } from "class-validator";
import { IsNumber, IsString } from "src/validator";

class InsightCategoryDto {
	@IsNumber()
	id: number;
}

export class CreateBlogDto {
	@IsString()
	title: string;

	@IsString()
	posterPath: string;

	@IsOptional()
	@IsString()
	posterCaption: string;

	@IsString()
	content: string;

	@IsOptional()
	@IsArray()
	@ValidateNested()
	@ArrayMinSize(0)
	@Type(() => InsightCategoryDto)
	category: InsightCategoryDto[];
}


