import { IsIn, IsOptional } from "class-validator";

export class FilterInsightByTypeDto {
	@IsOptional()
	@IsIn(["blog", "caseStudy"])
	type?: "blog" | "caseStudy";
}