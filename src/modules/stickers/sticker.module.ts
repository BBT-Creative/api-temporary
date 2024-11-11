import { Module } from "@nestjs/common";
import { StickerController } from "./sticker.controller";
import { StickerService } from "./sticker.service";

@Module({
	controllers: [StickerController],
	providers: [StickerService],
})
export class StickerModule {}
