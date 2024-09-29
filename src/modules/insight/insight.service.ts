import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCaseStudyDto } from "./dto/create-casestudy-dto";
import { CreateBlogDto } from "./dto/create-blog-dto";
import { CaseStudy, InsightType } from "@prisma/client";
import { caseStudyPreset } from "./dto/preset/caseStudyPreset";
import { Insight } from "./insight.interface";

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

	async getAllInsight(baseUrl?: string) {
		const insights = await this.prisma.insight.findMany({
			include: {
				category: true,
				caseStudy: {
					include: {
						result: true,
					},
				},
			},
		});

		return Promise.all(insights.map((insight) => this.transformInsightData(insight, baseUrl)));
	}

	async getAllInsightByType(type?: "blog" | "caseStudy", baseUrl?: string) {
		const insights = await this.prisma.extendedClient.insight.findMany({
			where: {
				type: {
					equals: type,
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

		return Promise.all(insights.map((insight) => this.transformInsightData(insight, baseUrl)));
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

		return this.transformInsightData(insight, baseUrl);
	}

	async getInsightByCategory(category?: string, baseUrl?: string) {
		const insights = await this.prisma.extendedClient.insight.findMany({
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

		return Promise.all(insights.map((insight) => this.transformInsightData(insight, baseUrl)));
	}

	private transformInsightData(insight: Insight, baseUrl?: string) {
		const { content, caseStudy, posterPath, ...otherInsightData } = insight;

		const modifiedHtmlContent = content.replace(/src="(\/clouds[^"]*)"/g, (match, group1) => {
			if (!group1.startsWith("http") && !group1.startsWith("https")) {
				return baseUrl ? `src="${baseUrl}${group1}"` : match;
			}

			return match;
		});

		let modifiedPosterPath: string = "";

		if (posterPath) {
			const isBase64 = posterPath.startsWith("data:");
			const isUrl = posterPath.startsWith("http://") || posterPath.startsWith("https://");
			if (isBase64 || isUrl) {
				modifiedPosterPath = posterPath; // Return as is if base64 or URL
			} else {
				// If it's a path (relative), prepend the base URL
				modifiedPosterPath = `${baseUrl}${posterPath}`;
			}
		}

		let caseStudyData: CaseStudy | null = null;

		if (caseStudy) {
			const { clientLogoUrl, ...otherCaseStudyData } = caseStudy;

			let modifiedClientLogoUrl: string | null = null;

			if (clientLogoUrl) {
				const isBase64 = clientLogoUrl.startsWith("data:");
				const isUrl = clientLogoUrl.startsWith("http://") || clientLogoUrl.startsWith("https://");
				if (isBase64 || isUrl) {
					modifiedClientLogoUrl = clientLogoUrl; // Return as is if base64 or URL
				} else {
					// If it's a path (relative), prepend the base URL
					modifiedClientLogoUrl = `${baseUrl}${clientLogoUrl}`;
				}
			}

			caseStudyData = {
				...otherCaseStudyData,
				clientLogoUrl: modifiedClientLogoUrl,
			};
		}

		return {
			...otherInsightData,
			posterPath: modifiedPosterPath,
			content: modifiedHtmlContent,
			caseStudy: caseStudyData,
		};
	}
}
