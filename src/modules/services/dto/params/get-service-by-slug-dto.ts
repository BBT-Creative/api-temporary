import { IsIn } from "class-validator";
import { IsString } from "src/validator";

export class FindServiceBySlugDto {
	@IsIn(["id", "en"])
	lang: "id" | "en";

	@IsString()
	slug: string;
}