import { IsString } from "src/validator";

export class CreateOrUpdateInsightCategoryDto {
    @IsString()
    name: string;
}