import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsOptional, ValidateNested } from "class-validator";
import { IsEmail, IsNumber, IsString } from "src/validator";

class CalculationDataDto {
	@IsNumber()
	liveStreamDailyHour: number;

	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	@ArrayMinSize(0)
	livePlatforms: string[];

	@IsString()
	monthOfCollaboration: string;

	@IsNumber()
	estimationPrice: number;

	@IsNumber()
	estimationViewers: number;
}

export class RequestCalculationDto {
	@IsEmail()
	email: string;

	@ValidateNested()
	@Type(() => CalculationDataDto)
	dataCalculation: CalculationDataDto;
}

