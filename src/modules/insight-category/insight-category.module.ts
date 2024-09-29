import { Module } from "@nestjs/common";
import { InsightCategoryController } from "./insight-category.controller";
import { InsightCategoryService } from "./insight-category.service";

@Module({
	controllers: [InsightCategoryController],
	providers: [InsightCategoryService],
})
export class InsightCategoryModule {}
