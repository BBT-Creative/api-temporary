import { IsOptional } from "class-validator";
import { IsString } from "src/validator";

export class UpdateStickerDto {
	@IsOptional()
	@IsString()
	path: string | null;
}
