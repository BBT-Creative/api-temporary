import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCaseStudyDto } from "./dto/create-casestudy-dto";
import { CreateBlogDto } from "./dto/create-blog-dto";
import { CaseStudy, InsightType, Prisma } from "@prisma/client";
import { caseStudyPreset } from "./dto/preset/caseStudyPreset";

@Injectable()
export class InsightService {
	constructor(private readonly prisma: PrismaService) {}

	async createBlog({ category, ...restOfBody }: CreateBlogDto) {
		const type = "blog" as InsightType;

		const allBlogCategory = await this.prisma.extendedClient.insightCategory.findFirstOrThrow({
			where: {
				name: "Blog",
			},
			select: { id: true },
		});

		const categoryIds = category.map((cat) => cat.id);
		const blogCategoryIndex = categoryIds.findIndex((id) => id === allBlogCategory.id);

		if (blogCategoryIndex !== -1) {
			category[blogCategoryIndex] = { id: allBlogCategory.id };
		} else {
			category.push({ id: allBlogCategory.id });
		}

		return this.prisma.extendedClient.insight.create({
			data: {
				type: type,
				...restOfBody,
				category: {
					connect: category.map((item) => ({
						id: item.id,
					})),
				},
			},
		});
	}

	async createCaseStudy({ category, caseStudy, ...restOfBody }: CreateCaseStudyDto) {
		const type = "caseStudy" as InsightType;
		const { result, ...restOfCaseStudy } = caseStudy;

		const allCaseStudyCategory = await this.prisma.extendedClient.insightCategory.findFirstOrThrow({
			where: {
				name: "Case Study",
			},
			select: { id: true },
		});

		const categoryIds = category.map((cat) => cat.id);
		const caseStudyCategoryIndex = categoryIds.findIndex((id) => id === allCaseStudyCategory.id);

		if (caseStudyCategoryIndex !== -1) {
			category[caseStudyCategoryIndex] = { id: allCaseStudyCategory.id };
		} else {
			category.push({ id: allCaseStudyCategory.id });
		}

		return this.prisma.extendedClient.insight.create({
			data: {
				type: type,
				...restOfBody,
				category: {
					connect: category.map((item) => ({
						id: item.id,
					})),
				},
				caseStudy: {
					create: {
						...restOfCaseStudy,
						result: {
							create: result.map((item) => ({
								resultName: item.resultName,
								value: item.value,
								type: item.type,
							})),
						},
					},
				},
			},
		});
	}

	async createCaseStudyPresets() {
		const caseStudies = caseStudyPreset.map(async (item) => {
			const { category, caseStudy, ...restOfBody } = item;
			const type = "caseStudy" as InsightType;
			const { result, ...restOfCaseStudy } = caseStudy;

			const allCaseStudyCategory = await this.prisma.extendedClient.insightCategory.findFirstOrThrow({
				where: {
					name: "Case Study",
				},
				select: { id: true },
			});

			const categoryIds = category.map((cat) => cat.id);
			const caseStudyCategoryIndex = categoryIds.findIndex((id) => id === allCaseStudyCategory.id);

			if (caseStudyCategoryIndex !== -1) {
				category[caseStudyCategoryIndex] = { id: allCaseStudyCategory.id };
			} else {
				category.push({ id: allCaseStudyCategory.id });
			}

			return this.prisma.extendedClient.insight.create({
				data: {
					type: type,
					...restOfBody,
					category: {
						connect: category.map((item) => ({
							id: item.id,
						})),
					},
					caseStudy: {
						create: {
							...restOfCaseStudy,
							result: {
								create: result.map((item) => ({
									resultName: item.resultName,
									value: item.value,
									type: item.type,
								})),
							},
						},
					},
				},
			});
		});

		return await Promise.all(caseStudies);
	}

	async getAllInsight() {
		return this.prisma.insight.findMany({
			include: {
				category: true,
				caseStudy: {
					include: {
						result: true,
					},
				},
			},
		});
	}

	async getAllInsightByType(type?: "blog" | "caseStudy") {
		return this.prisma.extendedClient.insight.findMany({
			where: {
				type: type,
			},
			include: {
				category: true,
				caseStudy: {
					include: {
						result: true,
					},
				},
			},
		});
	}

	async getInsightById(id: number, baseUrl?: string) {
		const insight = await this.prisma.extendedClient.insight.findUniqueOrThrow({
			where: {
				id: id,
			},
			include: {
				category: true,
				caseStudy: {
					include: {
						result: true,
					},
				},
			},
		});

		const { content, caseStudy, ...otherInsightData } = insight;

		const modifiedHtmlContent = content.replace(/src="(\/clouds[^"]*)"/g, (match, group1) => {
			if (!group1.startsWith("http") && !group1.startsWith("https")) {
				return baseUrl ? `src="${baseUrl}${group1}"` : match;
			}

			return match;
		});

		let caseStudyData: CaseStudy | null = null;

		if (caseStudy) {
			const { clientLogoUrl, ...otherCaseStudyData } = caseStudy;
			caseStudyData = {
				...otherCaseStudyData,
				clientLogoUrl: baseUrl ? `${baseUrl}${clientLogoUrl}` : clientLogoUrl,
			};
		}

		return {
			...otherInsightData,
			posterPath: baseUrl ? `${baseUrl}${insight.posterPath}` : insight.posterPath,
			content: modifiedHtmlContent,
			caseStudy: caseStudyData,
		};
	}

	async getInsightByCategory(category?: string) {
		return this.prisma.extendedClient.insight.findMany({
			where: {
				category: {
					some: {
						name: category,
					},
				},
			},
			include: {
				category: true,
				caseStudy: {
					include: {
						result: true,
					},
				},
			},
		});
	}
}
