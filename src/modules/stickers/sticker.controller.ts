import { Controller, Get, Post, Body, Param, Query, Put, Delete } from "@nestjs/common";
import { StickerService } from "./sticker.service";
import { CreateStickerDto } from "./dto/create-sticker-dto";
import { StickerIdParamsDto } from "./dto/params/sticker-id-params";
import { UpdateStickerDto } from "./dto/update-sticker-dto";
import { ConfigService } from "@nestjs/config";

@Controller("sticker")
export class StickerController {
	constructor(
		private readonly service: StickerService,
		private readonly configService: ConfigService,
	) {}

	@Post("preset")
	async preset() {
		return this.service.preset();
	}

	@Post()
	async create(body: CreateStickerDto) {
		return this.service.create(body);
	}

	@Get("all")
    async getAll() {
        const baseUrl = this.configService.get<string>("BASE_URL") || "";
		return this.service.getAll(baseUrl);
	}

	@Put("update/:id")
	async update(@Param() params: StickerIdParamsDto, @Body() body: UpdateStickerDto) {
		return this.service.updateStickerFile(params.id, body.path);
	}
}
