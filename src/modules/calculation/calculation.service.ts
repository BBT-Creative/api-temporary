import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { RequestCalculationDto } from "./dto/request-calculation-dto";

@Injectable()
export class CalculationService {
	constructor(private readonly prisma: PrismaService) {}

	async requestCalculation(data: RequestCalculationDto) {
		return this.prisma.extendedClient.requestCalculation.create({
			data: data,
		});
	}
}