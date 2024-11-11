import { IsString } from "src/validator";

export class CreateStickerDto {
    @IsString()
	path: string;
}
