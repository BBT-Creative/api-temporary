import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateServiceDto } from "./dto/create-service-dto";
import { servicesPresets } from "./dto/presets";
import { Prisma } from "@prisma/client";

@Injectable()
export class ServiceService {
	constructor(private readonly prisma: PrismaService) {}

	async preset() {
		return Promise.all(
			servicesPresets.map((body) => {
				const { title, description, detail, titleIndonesian, descriptionIndonesian, tags, videoUrl } = body;
				const { contents, calculation, pageTitles, backgroundColor, imageUrl, flagIconPath, flagTitle } = detail;

				const pageTitleJson = pageTitles.map((title) => ({
					text: title.text,
					type: title.type,
				})) as Prisma.JsonArray;

				const createSlug = () =>
					pageTitles.map((title) => title.text.trim().toLowerCase().replace(/\s+/g, "-")).join("-");

				const {
					title: serviceDetailTitle,
					description: serviceDetailDescription,
					titleIndonesian: serviceDetailTitleIndonesian,
					descriptionIndonesian: serviceDetailDescriptionIndonesian,
					serviceItems,
				} = contents;

				return this.prisma.extendedClient.service.create({
					data: {
						title: title,
						description: description,
						...(titleIndonesian && { titleIndonesian: titleIndonesian }),
						...(descriptionIndonesian && { descriptionIndonesian: descriptionIndonesian }),
						tags: tags,
						slug: createSlug(),
						videoUrl: videoUrl,
						detail: {
							create: {
								backgroundColor: backgroundColor,
								imageUrl: imageUrl,
								flagIconPath: flagIconPath,
								flagTitle: flagTitle,
								pageTitles: pageTitleJson,
								contents: {
									create: {
										title: serviceDetailTitle,
										description: serviceDetailDescription,
										...(serviceDetailTitleIndonesian && { titleIndonesian: serviceDetailTitleIndonesian }),
										...(serviceDetailDescriptionIndonesian && {
											descriptionIndonesian: serviceDetailDescriptionIndonesian,
										}),
										serviceItems: {
											create: serviceItems.map(({ ...serviceItem }) => ({
												...serviceItem,
											})),
										},
									},
								},
								...(calculation && {
									calculation: {
										create: {
											title: calculation.title,
											description: calculation.description,
											realTimeTitle: calculation.realTimeTitle,
											realTimeDescription: calculation.realTimeDescription,
											realTimeEstimatedPriceTextDesc: calculation.realTimeEstimatedPriceTextDesc,
											realTimeEstimatedResultTextDesc: calculation.realTimeEstimatedResultTextDesc,
											realTimeConsultablePrice: calculation.realTimeConsultablePrice,
											realTimeTermsAndConditionApply: calculation.realTimeTermsAndConditionApply,
											form: calculation.form,
											titleIndonesian: calculation.titleIndonesian,
											descriptionIndonesian: calculation.descriptionIndonesian,
											realTimeTitleIndonesian: calculation.realTimeTitleIndonesian,
											realTimeDescriptionIndonesian: calculation.realTimeDescriptionIndonesian,
											realTimeEstimatedPriceTextDescIndonesian:
												calculation.realTimeEstimatedPriceTextDescIndonesian,
											realTimeEstimatedResultTextDescIndonesian:
												calculation.realTimeEstimatedResultTextDescIndonesian,
											realTimeConsultablePriceIndonesian: calculation.realTimeConsultablePriceIndonesian,
											realTimeTermsAndConditionApplyIndonesian:
												calculation.realTimeTermsAndConditionApplyIndonesian,
											formIndonesian: calculation.formIndonesian,
										},
									},
								}),
							},
						},
					},
				});
			}),
		);
	}

	async create(body: CreateServiceDto) {
		const { title, description, detail, titleIndonesian, descriptionIndonesian, tags, videoUrl } = body;
		const { contents, calculation, pageTitles, backgroundColor, imageUrl, flagIconPath, flagTitle } = detail;

		const createSlug = () => pageTitles.map((title) => title.text.trim().toLowerCase().replace(/\s+/g, "-")).join("-");

		const {
			title: serviceDetailTitle,
			description: serviceDetailDescription,
			titleIndonesian: serviceDetailTitleIndonesian,
			descriptionIndonesian: serviceDetailDescriptionIndonesian,
			serviceItems,
		} = contents;

		return this.prisma.extendedClient.service.create({
			data: {
				title: title,
				description: description,
				...(titleIndonesian && { titleIndonesian: titleIndonesian }),
				...(descriptionIndonesian && { descriptionIndonesian: descriptionIndonesian }),
				tags: tags,
				slug: createSlug(),
				videoUrl: videoUrl,
				detail: {
					create: {
						backgroundColor: backgroundColor,
						imageUrl: imageUrl,
						flagIconPath: flagIconPath,
						flagTitle: flagTitle,
						pageTitles: {
							create: pageTitles.map((title) => ({
								text: title.text,
								type: title.type,
							})),
						},
						contents: {
							create: {
								title: serviceDetailTitle,
								description: serviceDetailDescription,
								...(serviceDetailTitleIndonesian && { titleIndonesian: serviceDetailTitleIndonesian }),
								...(serviceDetailDescriptionIndonesian && {
									descriptionIndonesian: serviceDetailDescriptionIndonesian,
								}),
								serviceItems: {
									create: serviceItems.map(({ ...serviceItem }) => ({
										...serviceItem,
									})),
								},
							},
						},
						...(calculation && {
							calculation: {
								create: {
									title: calculation.title,
									description: calculation.description,
									realTimeTitle: calculation.realTimeTitle,
									realTimeDescription: calculation.realTimeDescription,
									realTimeEstimatedPriceTextDesc: calculation.realTimeEstimatedPriceTextDesc,
									realTimeEstimatedResultTextDesc: calculation.realTimeEstimatedResultTextDesc,
									realTimeConsultablePrice: calculation.realTimeConsultablePrice,
									realTimeTermsAndConditionApply: calculation.realTimeTermsAndConditionApply,
									form: calculation.form,
									titleIndonesian: calculation.titleIndonesian,
									descriptionIndonesian: calculation.descriptionIndonesian,
									realTimeTitleIndonesian: calculation.realTimeTitleIndonesian,
									realTimeDescriptionIndonesian: calculation.realTimeDescriptionIndonesian,
									realTimeEstimatedPriceTextDescIndonesian:
										calculation.realTimeEstimatedPriceTextDescIndonesian,
									realTimeEstimatedResultTextDescIndonesian:
										calculation.realTimeEstimatedResultTextDescIndonesian,
									realTimeConsultablePriceIndonesian: calculation.realTimeConsultablePriceIndonesian,
									realTimeTermsAndConditionApplyIndonesian:
										calculation.realTimeTermsAndConditionApplyIndonesian,
									formIndonesian: calculation.formIndonesian,
								},
							},
						}),
					},
				},
			},
		});
	}

	async getAll(lang: "en" | "id", baseUrl?: string) {
		const services = await this.prisma.service.findMany({
			orderBy: {
				id: "asc",
			},
			include: {
				detail: {
					include: {
						calculation: true,
						contents: {
							include: {
								serviceItems: true,
							},
						},
					},
				},
			},
		});

		return services.map((item) => ({
			id: item.id,
			title: lang === "id" ? item.titleIndonesian || item.title : item.title,
			description: lang === "id" ? item.descriptionIndonesian || item.description : item.description,
			tags: item.tags,
			href: `/services/${item.slug}`,
			slug: item.slug,
			videoUrl: `${baseUrl}${item.videoUrl}`,
			detail: {
				id: item.detail?.id,
				backgroundColor: item.detail?.backgroundColor,
				imageUrl: `${baseUrl}${item.detail?.imageUrl}`,
				flagIconPath: `${baseUrl}${item.detail?.flagIconPath}`,
				flagTitle: item.detail?.flagTitle,
				pageTitles: item.detail?.pageTitles,
				calculation: {
					id: item.detail?.calculation?.id,
					title:
						lang === "id"
							? item.detail?.calculation?.titleIndonesian || item.detail?.calculation?.title
							: item.detail?.calculation?.title,
					form:
						lang === "id"
							? item.detail?.calculation?.formIndonesian || item.detail?.calculation?.form
							: item.detail?.calculation?.form,
					description:
						lang === "id"
							? item.detail?.calculation?.descriptionIndonesian || item.detail?.calculation?.description
							: item.detail?.calculation?.description,
					realTimeTitle:
						lang === "id"
							? item.detail?.calculation?.realTimeTitleIndonesian || item.detail?.calculation?.realTimeTitle
							: item.detail?.calculation?.realTimeTitle,
					realTimeDescription:
						lang === "id"
							? item.detail?.calculation?.realTimeDescriptionIndonesian ||
								item.detail?.calculation?.realTimeDescription
							: item.detail?.calculation?.realTimeDescription,
					realTimeEstimatedPriceTextDesc:
						lang === "id"
							? item.detail?.calculation?.realTimeEstimatedPriceTextDescIndonesian ||
								item.detail?.calculation?.realTimeEstimatedPriceTextDesc
							: item.detail?.calculation?.realTimeEstimatedPriceTextDesc,
					realTimeEstimatedResultTextDesc:
						lang === "id"
							? item.detail?.calculation?.realTimeEstimatedResultTextDescIndonesian ||
								item.detail?.calculation?.realTimeDescription
							: item.detail?.calculation?.realTimeDescription,
					realTimeConsultablePrice:
						lang === "id"
							? item.detail?.calculation?.realTimeConsultablePriceIndonesian ||
								item.detail?.calculation?.realTimeConsultablePrice
							: item.detail?.calculation?.realTimeConsultablePrice,
					realTimeTermsAndConditionApply:
						lang === "id"
							? item.detail?.calculation?.realTimeTermsAndConditionApplyIndonesian ||
								item.detail?.calculation?.realTimeTermsAndConditionApply
							: item.detail?.calculation?.realTimeTermsAndConditionApply,
				},
				contents: {
					contents: {
						id: item?.detail?.id,
						title:
							lang === "id"
								? item?.detail?.contents?.titleIndonesian || item?.detail?.contents?.title
								: item?.detail?.contents?.title,
						description:
							lang === "id"
								? item?.detail?.contents?.descriptionIndonesian || item?.detail?.contents?.description
								: item?.detail?.contents?.description,
						serviceItems: item?.detail?.contents?.serviceItems.map((serviceItem) => ({
							id: serviceItem.id,
							title: lang === "id" ? serviceItem.titleIndonesian || serviceItem.title : serviceItem.title,
							description:
								lang === "id"
									? serviceItem.descriptionIndonesian || serviceItem.description
									: serviceItem.description,
							tags: serviceItem.tags,
							imageUrl: `${baseUrl}${serviceItem.imageUrl}`,
						})),
					},
				},
			},
		}));
	}

	async getDetailBySlug(lang: string, slug: string, baseUrl?: string) {
		const service = await this.prisma.service.findFirstOrThrow({
			where: {
				slug: {
					equals: slug,
				},
			},
			include: {
				detail: {
					include: {
						calculation: true,
						contents: {
							include: {
								serviceItems: true,
							},
						},
					},
				},
			},
		});

		return {
			id: service.id,
			title: lang === "id" ? service.titleIndonesian || service.title : service.title,
			description: lang === "id" ? service.descriptionIndonesian || service.description : service.description,
			tags: service.tags,
			href: `/services/${service.slug}`,
			slug: service.slug,
			videoUrl: `${baseUrl}${service.videoUrl}`,
			detail: {
				id: service?.detail?.id,
				backgroundColor: service?.detail?.backgroundColor,
				imageUrl: `${baseUrl}${service.detail?.imageUrl}`,
				flagIconPath: `${baseUrl}${service.detail?.flagIconPath}`,
				flagTitle: service?.detail?.flagTitle,
				pageTitles: service?.detail?.pageTitles,
				calculation: {
					id: service.detail?.calculation?.id,
					title:
						lang === "id"
							? service.detail?.calculation?.titleIndonesian || service.detail?.calculation?.title
							: service.detail?.calculation?.title,
					form:
						lang === "id"
							? service.detail?.calculation?.formIndonesian || service.detail?.calculation?.form
							: service.detail?.calculation?.form,
					description:
						lang === "id"
							? service.detail?.calculation?.descriptionIndonesian || service.detail?.calculation?.description
							: service.detail?.calculation?.description,
					realTimeTitle:
						lang === "id"
							? service.detail?.calculation?.realTimeTitleIndonesian || service.detail?.calculation?.realTimeTitle
							: service.detail?.calculation?.realTimeTitle,
					realTimeDescription:
						lang === "id"
							? service.detail?.calculation?.realTimeDescriptionIndonesian ||
								service.detail?.calculation?.realTimeDescription
							: service.detail?.calculation?.realTimeDescription,
					realTimeEstimatedPriceTextDesc:
						lang === "id"
							? service.detail?.calculation?.realTimeEstimatedPriceTextDescIndonesian ||
								service.detail?.calculation?.realTimeEstimatedPriceTextDesc
							: service.detail?.calculation?.realTimeEstimatedPriceTextDesc,
					realTimeEstimatedResultTextDesc:
						lang === "id"
							? service.detail?.calculation?.realTimeEstimatedResultTextDescIndonesian ||
								service.detail?.calculation?.realTimeDescription
							: service.detail?.calculation?.realTimeDescription,
					realTimeConsultablePrice:
						lang === "id"
							? service.detail?.calculation?.realTimeConsultablePriceIndonesian ||
								service.detail?.calculation?.realTimeConsultablePrice
							: service.detail?.calculation?.realTimeConsultablePrice,
					realTimeTermsAndConditionApply:
						lang === "id"
							? service.detail?.calculation?.realTimeTermsAndConditionApplyIndonesian ||
								service.detail?.calculation?.realTimeTermsAndConditionApply
							: service.detail?.calculation?.realTimeTermsAndConditionApply,
				},
				contents: {
					id: service?.detail?.id,
					title:
						lang === "id"
							? service?.detail?.contents?.titleIndonesian || service?.detail?.contents?.title
							: service?.detail?.contents?.title,
					description:
						lang === "id"
							? service?.detail?.contents?.descriptionIndonesian || service?.detail?.contents?.description
							: service?.detail?.contents?.description,
					serviceItems: service?.detail?.contents?.serviceItems.map((serviceItem) => ({
						id: serviceItem.id,
						title: lang === "id" ? serviceItem.titleIndonesian || serviceItem.title : serviceItem.title,
						description:
							lang === "id"
								? serviceItem.descriptionIndonesian || serviceItem.description
								: serviceItem.description,
						tags: serviceItem.tags,
						imageUrl: `${baseUrl}${serviceItem.imageUrl}`,
					})),
				},
			},
		};
	}
}
