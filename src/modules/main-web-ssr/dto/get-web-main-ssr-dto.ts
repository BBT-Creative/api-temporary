import { IsIn } from "class-validator";

export class GetMainWebSSRDto {
	@IsIn(["id", "en"])
	lang: "id" | "en";
}
