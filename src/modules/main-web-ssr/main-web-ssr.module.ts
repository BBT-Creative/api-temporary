import { Module } from "@nestjs/common";
import { MainWebSSRController } from "./main-web-ssr.controller";
import { MainWebSSRService } from "./main-web-ssr.service";

@Module({
	controllers: [MainWebSSRController],
	providers: [MainWebSSRService],
})
export class MainWebSSRModule {}
