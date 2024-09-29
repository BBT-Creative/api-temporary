/* ===== UPDATE SINGLE INSTANCE DTO ===== */

import { HomeMainVideoType } from "@prisma/client";
import { IsOptional } from "class-validator";
import { IsEnum, IsString } from "src/validator";

export class MainWebSSRUpdateMainVideoDto {
    @IsOptional()
    @IsString()
    videoUrl?: string;

    @IsOptional()
    @IsEnum(HomeMainVideoType)
    type?: HomeMainVideoType;
}

/* ===== ADD LIST DTO ===== */

export class MainWebSSRAddClientsDto {
	@IsString()
    logoUrl: string;
    
	@IsString()
	name: string;
}

export class MainWebSSRAddFaqDto {
	@IsString()
    question: string;
    
	@IsString()
    questionIndonesian: string;
    
	@IsString()
    answer: string;
    
	@IsString()
	answerIndonesian: string;
}

export class MainWebSSRAddAppMenuBranchDto {
	@IsString()
	title: string;

	@IsString()
	addressPhone: string;

	@IsString()
	mapLink: string;
}

export class MainWebSSRAddServicePlatformsDto {
	@IsString()
	name: string;
}

export class MainWebSSRAddMonthlyCollabsDto {
	@IsString()
	name: string;
	
	@IsString()
	suffix: string;
}

/* ===== UPDATE LIST DTO ===== */

export class MainWebSSRUpdateClientsDto {
	@IsOptional()
	@IsString()
	logoUrl?: string;

	@IsOptional()
	@IsString()
	name?: string;
}

export class MainWebSSRUpdateFaqDto {
	@IsOptional()
	@IsString()
	question?: string;

	@IsOptional()
	@IsString()
	questionIndonesian?: string;

	@IsOptional()
	@IsString()
	answer?: string;

	@IsOptional()
	@IsString()
	answerIndonesian?: string;
}

export class MainWebSSRUpdateAppMenuBranchDto {
	@IsOptional()
	@IsString()
	title?: string;

	@IsOptional()
	@IsString()
	addressPhone?: string;

	@IsOptional()
	@IsString()
	mapLink?: string;
}

export class MainWebSSRUpdateServicePlatformsDto {
	@IsOptional()
	@IsString()
	name?: string;
}

export class MainWebSSRUpdateMonthlyCollabsDto {
	@IsOptional()
	@IsString()
	name?: string;
}
