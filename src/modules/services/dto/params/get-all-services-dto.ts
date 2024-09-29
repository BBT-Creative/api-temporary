import { IsIn } from "class-validator";

export class FindAllServicesDto {
	@IsIn(["id", "en"])
	lang: "id" | "en";
}
