import { IsOptional } from "class-validator";
import { IsString } from "src/validator";

export class FilterInsightByCategoryDto {
	@IsOptional()
	@IsString()
	type?: string;
}
