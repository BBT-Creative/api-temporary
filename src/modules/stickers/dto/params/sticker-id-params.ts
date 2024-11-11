import { IsNumber } from "src/validator";

export class StickerIdParamsDto {
	@IsNumber()
	id: number;
}
