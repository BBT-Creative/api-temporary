import { IsNumber } from "src/validator";

export class FindInsightCategoryByIdDto {
    @IsNumber()
    id: number;
}