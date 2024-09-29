import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateServiceDto } from "./dto/create-service-dto";
import { servicesPresets } from "./dto/presets";
import { Prisma } from "@prisma/client";
import { Service } from "./service.interface";

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

		return Promise.all(services.map((service) => this.transformServiceData(service, lang, baseUrl)));
	}

	async getDetailBySlug(lang: "en" | "id", slug: string, baseUrl?: string) {
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

		return this.transformServiceData(service, lang, baseUrl);
	}

	/* Transform some data like URL */
	private transformServiceData(service: Service, lang: "en" | "id", baseUrl?: string) {
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
