import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { InsightType } from "@prisma/client";
import { CreateOrUpdateInsightCategoryDto } from "./dto/insight-category-dto";
import { insightCategoryPresets } from "./dto/presets";

@Injectable()
export class InsightCategoryService {
	constructor(private readonly prisma: PrismaService) {}

	async preset() {
		return Promise.all(
			insightCategoryPresets.map((item) => {
				return this.prisma.extendedClient.insightCategory.create({
					data: {
						name: item.name,
					},
				});
			}),
		);
	}

	async create(body: CreateOrUpdateInsightCategoryDto) {
		return this.prisma.extendedClient.insightCategory.create({
			data: {
				name: body.name,
			},
		});
	}

	async update(id: number, body: CreateOrUpdateInsightCategoryDto) {
		return this.prisma.extendedClient.insightCategory.update({
			where: { id },
			data: {
				name: body.name,
			},
		});
	}

	async getAll() {
		return this.prisma.extendedClient.insightCategory.findMany({});
	}

	async delete(id: number) {
		return this.prisma.extendedClient.insightCategory.delete({
			where: { id },
		});
	}
}
