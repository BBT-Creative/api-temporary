import { Controller, Get, Post, Body, Param, Query, Put, Delete } from "@nestjs/common";
import { MainWebSSRService } from "./main-web-ssr.service";
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
import { ConfigService } from "@nestjs/config";
import { GetMainWebSSRDto } from "./dto/get-web-main-ssr-dto";

@Controller("mainwebssr")
export class MainWebSSRController {
	constructor(
		private readonly service: MainWebSSRService,
		private readonly configService: ConfigService,
	) {}

	@Post("preset")
	async preset() {
		return this.service.preset();
	}

	/* ===== NON LIST (SINGLE INSTANCE) UPDATE HANDLER ===== */

	@Put("main-vids/:mainVidId")
	async updateMainVideo(@Param("mainVidId") mainVidId: number, @Body() body: MainWebSSRUpdateMainVideoDto) {
		return this.service.updateMainVideo(mainVidId, body);
	}

	/* ===== ADD TO LIST HANDLER ===== */

	@Post("home-clients")
	async addClients(@Body() body: MainWebSSRAddClientsDto) {
		return this.service.addClients(body);
	}

	@Post("home-faq")
	async addFaq(@Body() body: MainWebSSRAddFaqDto) {
		return this.service.addFaq(body);
	}

	@Post("home-faq-preset")
	async addFaqPreset() {
		return this.service.addFaqPreset();
	}

	@Post("appmenu-branch")
	async addAppMenuBranch(@Body() body: MainWebSSRAddAppMenuBranchDto) {
		return this.service.addAppMenuBranch(body);
	}

	@Post("service-platforms")
	async addServicePlatforms(@Body() body: MainWebSSRAddServicePlatformsDto) {
		return this.service.addServicePlatforms(body);
	}

	@Post("monthly-collabs")
	async addServiceMonthCollaboration(@Body() body: MainWebSSRAddMonthlyCollabsDto) {
		return this.service.addServiceMonthCollaboration(body);
	}

	/* ===== UPDATE LIST HANDLER ===== */

	@Put("home-clients/:clientId")
	async updateClients(@Param("clientId") clientId: number, @Body() body: MainWebSSRUpdateClientsDto) {
		return this.service.updateClients(clientId, body);
	}

	@Put("home-faq/:faqId")
	async updateFaq(@Param("faqId") faqId: number, @Body() body: MainWebSSRUpdateFaqDto) {
		return this.service.updateFaq(faqId, body);
	}

	@Put("appmenu-branch/:branchId")
	async updateAppMenuBranch(@Param("branchId") branchId: number, @Body() body: MainWebSSRUpdateAppMenuBranchDto) {
		return this.service.updateAppMenuBranch(branchId, body);
	}

	@Put("service-platforms/:platformId")
	async updateServicePlatforms(@Param("platformId") platformId: number, @Body() body: MainWebSSRUpdateServicePlatformsDto) {
		return this.service.updateServicePlatforms(platformId, body);
	}

	@Put("monthly-collabs/:collaborationId")
	async updateServiceMonthCollaboration(
		@Param("collaborationId") collaborationId: number,
		@Body() body: MainWebSSRUpdateMonthlyCollabsDto,
	) {
		return this.service.updateServiceMonthCollaboration(collaborationId, body);
	}

	/* ===== GET MAIN WEB SSR WITH ALL DATA ===== */

	@Get(":lang")
	async getMainWebSSR(@Param() param: GetMainWebSSRDto) {
		const baseUrl = this.configService.get<string>("BASE_URL") || "";
		return this.service.getMainWebSSR(baseUrl, param.lang);
	}

	/* ===== REMOVE FROM LIST HANDLER ===== */

	@Delete("home-clients/:clientId")
	async removeClients(@Param("clientId") clientId: number) {
		return this.service.removeClients(clientId);
	}

	@Delete("home-faq/:faqId")
	async removeFaq(@Param("faqId") faqId: number) {
		return this.service.removeFaq(faqId);
	}

	@Delete("appmenu-branch/:branchId")
	async removeAppMenuBranch(@Param("branchId") branchId: number) {
		return this.service.removeAppMenuBranch(branchId);
	}

	@Delete("service-platforms/:platformId")
	async removeServicePlatforms(@Param("platformId") platformId: number) {
		return this.service.removeServicePlatforms(platformId);
	}

	@Delete("monthly-collabs/:collaborationId")
	async removeServiceMonthCollaboration(@Param("collaborationId") collaborationId: number) {
		return this.service.removeServiceMonthCollaboration(collaborationId);
	}
}
