import { Controller, Get, Post, Body, Param, Query } from "@nestjs/common";
import { InsightService } from "./insight.service";
import { CreateCaseStudyDto } from "./dto/create-casestudy-dto";
import { CreateBlogDto } from "./dto/create-blog-dto";
import { FindInsightByIdDto } from "./dto/params/get-insight-by-id-dto";
import { FilterInsightByCategoryDto } from "./dto/params/filter-insight-by-category-dto";
import { FilterInsightByTypeDto } from "./dto/params/filter-insight-by-type-dto";
import { ConfigService } from "@nestjs/config";

@Controller("insight")
export class InsightController {
	constructor(
		private readonly insightService: InsightService,
		private readonly configService: ConfigService,
	) {}

	@Post("blog")
	async createBlog(@Body() dto: CreateBlogDto) {
		return this.insightService.createBlog(dto);
	}

	@Post("case-study")
	async createCaseStudy(@Body() dto: CreateCaseStudyDto) {
		return this.insightService.createCaseStudy(dto);
	}

	@Post("case-study/presets")
	async createCaseStudyPresets() {
		return this.insightService.createCaseStudyPresets();
	}

	@Get()
	async getAllInsight() {
		const baseUrl = this.configService.get<string>("BASE_URL");
		return this.insightService.getAllInsight(baseUrl);
	}

	@Get()
	async getAllInsightByType(@Query() query: FilterInsightByTypeDto) {
		const baseUrl = this.configService.get<string>("BASE_URL");
		return this.insightService.getAllInsightByType(query.type, baseUrl);
	}

	@Get(":id")
	async getInsightById(@Param() params: FindInsightByIdDto) {
		const baseUrl = this.configService.get<string>("BASE_URL");
		return this.insightService.getInsightById(params.id, baseUrl);
	}

	@Get()
	async getInsightByCategory(@Query() query: FilterInsightByCategoryDto) {
		const baseUrl = this.configService.get<string>("BASE_URL");
		return this.insightService.getInsightByCategory(query.type, baseUrl);
	}
}
