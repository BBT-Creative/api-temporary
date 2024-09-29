import { Global, Module } from "@nestjs/common";
import { PrismaHelperService } from "./prismaHelper.service";

@Global()
@Module({
	providers: [PrismaHelperService],
	exports: [PrismaHelperService],
})
export class PrismaHelperModule {}
