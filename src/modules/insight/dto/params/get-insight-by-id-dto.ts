import { IsNumber } from "src/validator";

export class FindInsightByIdDto {
    @IsNumber()
    id: number;
}