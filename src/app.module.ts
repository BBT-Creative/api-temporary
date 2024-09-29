import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { PrismaHelperModule } from "./prisma/helper/prismaHelper.module";
import { CalculationModule } from "./modules/calculation/calculation.module";
import { FileStorageModule } from "./modules/file-storage/file-storage.module";
import { InsightModule } from "./modules/insight/insight.module";
import { InsightCategoryModule } from "./modules/insight-category/insight-category.module";
import { MainWebSSRModule } from "./modules/main-web-ssr/main-web-ssr.module";
import { ServiceModule } from "./modules/services/service.module";

const ENV = process.env.NODE_ENV;

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: !ENV ? ".env" : `.env.${ENV}`,
		}),
		PrismaModule,
		PrismaHelperModule,
		CalculationModule,
		FileStorageModule,
		InsightModule,
		InsightCategoryModule,
		MainWebSSRModule,
		ServiceModule
	],
})
export class AppModule {}
