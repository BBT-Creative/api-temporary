import { IsNumber } from "src/validator";

export class GetServiceByIdDto {
	@IsNumber()
	id: number;
}
