import { Controller, Get, Post, Body, Param, Query, Put, Delete } from "@nestjs/common";
import { CalculationService } from "./calculation.service";
import { RequestCalculationDto } from "./dto/request-calculation-dto";

@Controller("calculation")
export class CalculationController {
	constructor(private readonly calculationService: CalculationService) {}

	@Post("request")
	async requestCalculation(@Body() body: RequestCalculationDto) {
		return this.calculationService.requestCalculation(body);
	}
}
