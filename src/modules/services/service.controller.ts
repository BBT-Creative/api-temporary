import { Controller, Get, Post, Body, Param, Query } from "@nestjs/common";
import * as moment from "moment-timezone";
import { CreateServiceDto } from "./dto/create-service-dto";
import { ServiceService } from "./service.service";
import { FindServiceBySlugDto } from "./dto/params/get-service-by-slug-dto";
import { FindAllServicesDto } from "./dto/params/get-all-services-dto";
import { ConfigService } from "@nestjs/config";

@Controller("service")
export class ServiceController {
	constructor(
		private readonly serviceService: ServiceService,
		private readonly configService: ConfigService
	) { }

	@Post()
	async create(@Body() dto: CreateServiceDto) {
		return this.serviceService.create(dto);
	}

	@Post("preset")
	async presets() {
		return this.serviceService.preset();
	}

	@Get(":lang")
	findAllService(@Param() params: FindAllServicesDto) {
		const baseUrl = this.configService.get<string>("BASE_URL");
		return this.serviceService.getAll(params.lang, baseUrl);
	}

	@Get("/:lang/:slug")
	findServiceBySlug(@Param() params: FindServiceBySlugDto) {
		const baseUrl = this.configService.get<string>("BASE_URL");
		return this.serviceService.getDetailBySlug(params.lang, params.slug, baseUrl);
	}
}