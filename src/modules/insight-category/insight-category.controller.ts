import { Controller, Get, Post, Body, Param, Query, Put, Delete } from "@nestjs/common";
import { InsightCategoryService } from "./insight-category.service";
import { CreateOrUpdateInsightCategoryDto } from "./dto/insight-category-dto";
import { FindInsightCategoryByIdDto } from "./dto/params/get-insight-category-by-id-dto";

@Controller("insight-category")
export class InsightCategoryController {
	constructor(private readonly insightCategoryService: InsightCategoryService) {}

	@Post()
	async createBlog(@Body() dto: CreateOrUpdateInsightCategoryDto) {
		return this.insightCategoryService.create(dto);
	}

	@Put(":id")
	async update(@Param() param: FindInsightCategoryByIdDto, @Body() dto: CreateOrUpdateInsightCategoryDto) {
		return this.insightCategoryService.update(param.id, dto);
	}

	@Get()
	async getAllInsightByType() {
		return this.insightCategoryService.getAll();
	}

	@Delete(":id")
	async getInsightById(@Param() param: FindInsightCategoryByIdDto) {
		return this.insightCategoryService.delete(param.id);
	}
}
