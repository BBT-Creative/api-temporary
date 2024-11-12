import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import {
	MainWebSSRAddAppMenuBranchDto,
	MainWebSSRAddClientsDto,
	MainWebSSRAddFaqDto,
	MainWebSSRAddMonthlyCollabsDto,
	MainWebSSRAddServicePlatformsDto,
	MainWebSSRUpdateAppMenuBranchDto,
	MainWebSSRUpdateClientsDto,
	MainWebSSRUpdateFaqDto,
	MainWebSSRUpdateMainVideoDto,
	MainWebSSRUpdateMonthlyCollabsDto,
	MainWebSSRUpdateServicePlatformsDto,
} from "./dto/main-web-ssr-dto";
import {
	webSSRAppMenuBranchPreset,
	webSSRHomeClientsPreset,
	webSSRHomeFaqPreset,
	webSSRHomeMainVideoPreset,
	webSSRServiceMonthlyCollaborationsPreset,
	webSSRServicePlatformsPreset,
} from "./preset/main-web-ssr-data-preset";
import { HomeMainVideo } from "@prisma/client";

@Injectable()
export class MainWebSSRService {
	constructor(private readonly prisma: PrismaService) {}

	/* ===== PRESET HANDLER ===== */

	async preset() {
		return this.prisma.extendedClient.mainWebSSR.create({
			data: {/* 
				homeMainVideo: {
					create: webSSRHomeMainVideoPreset,
				},
				homeClients: {
					create: webSSRHomeClientsPreset.map(({ ...item }) => ({
						...item,
						logoUrl: item.logoUrl,
					})),
				},
				appMenuBranch: {
					create: webSSRAppMenuBranchPreset.map(({ ...item }) => ({
						...item,
					})),
				},
				servicePlatforms: {
					create: webSSRServicePlatformsPreset.map(({ ...item }) => ({
						...item,
					})),
				},
				serviceMonthCollaboration: {
					create: webSSRServiceMonthlyCollaborationsPreset.map(({ ...item }) => ({
						...item,
					})),
				},
			 */},
		});
	}

	/* ===== NON LIST (SINGLE INSTANCE) UPDATE HANDLER ===== */

	async updateMainVideo(id: number, body: MainWebSSRUpdateMainVideoDto) {
		const mainSSR = await this.prisma.extendedClient.mainWebSSR.findFirstOrThrow({});
		return this.prisma.extendedClient.homeMainVideo.update({
			where: { id, mainWebSSRId: mainSSR.id },
			data: {
				...body,
			},
		});
	}

	/* ===== ADD TO LIST HANDLER ===== */

	async addClients(body: MainWebSSRAddClientsDto) {
		const mainSSR = await this.prisma.extendedClient.mainWebSSR.findFirstOrThrow({});

		return this.prisma.extendedClient.mainWebSSR.update({
			where: { id: mainSSR.id },
			data: {
				homeClients: {
					create: {
						...body,
					},
				},
			},
		});
	}

	async addFaq(body: MainWebSSRAddFaqDto) {
		const mainSSR = await this.prisma.extendedClient.mainWebSSR.findFirstOrThrow({});

		return this.prisma.extendedClient.mainWebSSR.update({
			where: { id: mainSSR.id },
			data: {
				homeFaq: {
					create: {
						...body,
					},
				},
			},
		});
	}

	async addFaqPreset() {
		const mainSSR = await this.prisma.extendedClient.mainWebSSR.findFirstOrThrow({});

		return this.prisma.extendedClient.mainWebSSR.update({
			where: { id: mainSSR.id },
			data: {
				homeFaq: {
					create: webSSRHomeFaqPreset.map(({ ...item }) => ({
						...item,
					})),
				},
			},
		});
	}

	async addAppMenuBranch(body: MainWebSSRAddAppMenuBranchDto) {
		const mainSSR = await this.prisma.extendedClient.mainWebSSR.findFirstOrThrow({});

		return this.prisma.extendedClient.mainWebSSR.update({
			where: { id: mainSSR.id },
			data: {
				appMenuBranch: {
					create: {
						...body,
					},
				},
			},
		});
	}

	async addServicePlatforms(body: MainWebSSRAddServicePlatformsDto) {
		const mainSSR = await this.prisma.extendedClient.mainWebSSR.findFirstOrThrow({});

		return this.prisma.extendedClient.mainWebSSR.update({
			where: { id: mainSSR.id },
			data: {
				servicePlatforms: {
					create: {
						...body,
					},
				},
			},
		});
	}

	async addServiceMonthCollaboration(body: MainWebSSRAddMonthlyCollabsDto) {
		const mainSSR = await this.prisma.extendedClient.mainWebSSR.findFirstOrThrow({});

		return this.prisma.extendedClient.mainWebSSR.update({
			where: { id: mainSSR.id },
			data: {
				serviceMonthCollaboration: {
					create: {
						...body,
					},
				},
			},
		});
	}

	/* ===== UPDATE LIST HANDLER ===== */

	async updateClients(id: number, body: MainWebSSRUpdateClientsDto) {
		const mainSSR = await this.prisma.extendedClient.mainWebSSR.findFirstOrThrow({});
		return this.prisma.extendedClient.homeClient.update({
			where: { id, mainWebSSRId: mainSSR.id },
			data: {
				...body,
			},
		});
	}

	async updateFaq(id: number, body: MainWebSSRUpdateFaqDto) {
		const mainSSR = await this.prisma.extendedClient.mainWebSSR.findFirstOrThrow({});
		return this.prisma.extendedClient.homeFaq.update({
			where: { id, mainWebSSRId: mainSSR.id },
			data: {
				...body,
			},
		});
	}

	async updateAppMenuBranch(id: number, body: MainWebSSRUpdateAppMenuBranchDto) {
		const mainSSR = await this.prisma.extendedClient.mainWebSSR.findFirstOrThrow({});
		return this.prisma.extendedClient.appMenuBranch.update({
			where: { id, mainWebSSRId: mainSSR.id },
			data: {
				...body,
			},
		});
	}

	async updateServicePlatforms(id: number, body: MainWebSSRUpdateServicePlatformsDto) {
		const mainSSR = await this.prisma.extendedClient.mainWebSSR.findFirstOrThrow({});
		return this.prisma.extendedClient.servicePlatform.update({
			where: { id, mainWebSSRId: mainSSR.id },
			data: {
				...body,
			},
		});
	}

	async updateServiceMonthCollaboration(id: number, body: MainWebSSRUpdateMonthlyCollabsDto) {
		const mainSSR = await this.prisma.extendedClient.mainWebSSR.findFirstOrThrow({});
		return this.prisma.extendedClient.serviceMonthCollaboration.update({
			where: { id, mainWebSSRId: mainSSR.id },
			data: {
				...body,
			},
		});
	}

	/* ===== REMOVE FROM LIST HANDLER ===== */

	async removeClients(id: number) {
		const mainSSR = await this.prisma.extendedClient.mainWebSSR.findFirstOrThrow({});
		return this.prisma.extendedClient.homeClient.delete({
			where: { id, mainWebSSRId: mainSSR.id },
		});
	}

	async removeFaq(id: number) {
		const mainSSR = await this.prisma.extendedClient.mainWebSSR.findFirstOrThrow({});
		return this.prisma.extendedClient.homeFaq.delete({
			where: { id, mainWebSSRId: mainSSR.id },
		});
	}

	async removeAppMenuBranch(id: number) {
		const mainSSR = await this.prisma.extendedClient.mainWebSSR.findFirstOrThrow({});
		return this.prisma.extendedClient.appMenuBranch.delete({
			where: { id, mainWebSSRId: mainSSR.id },
		});
	}

	async removeServicePlatforms(id: number) {
		const mainSSR = await this.prisma.extendedClient.mainWebSSR.findFirstOrThrow({});
		return this.prisma.extendedClient.servicePlatform.delete({
			where: { id, mainWebSSRId: mainSSR.id },
		});
	}

	async removeServiceMonthCollaboration(id: number) {
		const mainSSR = await this.prisma.extendedClient.mainWebSSR.findFirstOrThrow({});
		return this.prisma.extendedClient.serviceMonthCollaboration.delete({
			where: { id, mainWebSSRId: mainSSR.id },
		});
	}

	/* ===== GET MAIN WEB SSR WITH ALL DATA ===== */

	async getMainWebSSR(baseUrl: string, lang: "en" | "id") {
		const mainWebSSR = await this.prisma.extendedClient.mainWebSSR.findFirstOrThrow({
			include: {
				homeClients: true,
				homeFaq: true,
				appMenuBranch: true,
				homeMainVideo: true,
				servicePlatforms: true,
				serviceMonthCollaboration: true,
			},
		});

		const { homeMainVideo, homeClients, homeFaq, ...otherData } = mainWebSSR;

		let homeMainVideoData: HomeMainVideo | null = null;

		// Modify home main video data.
		if (homeMainVideo) {
			const { videoUrl, ...homeVideoData } = homeMainVideo;

			homeMainVideoData = {
				...homeVideoData,
				videoUrl: `${baseUrl}${videoUrl}`,
			};
		}

		const homeClientsData = homeClients.map((item) => {
			const { logoUrl, ...otherClientData } = item;

			const modifiedLogoUrl = (): string => {
				if (logoUrl.startsWith("http") || logoUrl.startsWith("https")) {
					return logoUrl;
				}

				return `${baseUrl}${logoUrl}`;
			};

			return {
				...otherClientData,
				logoUrl: modifiedLogoUrl(),
			};
		});

		const homeNewFaq = homeFaq.map((item) => {
			const { question, questionIndonesian, answer, answerIndonesian, id } = item;

			return {
				id: id,
				question: lang === "en" ? question : questionIndonesian,
				answer: lang === "en" ? answer : answerIndonesian,
			};
		});

		return {
			...otherData,
			homeMainVideo: homeMainVideoData,
			homeClients: homeClientsData,
			homeFaq: homeNewFaq,
		};
	}
}
