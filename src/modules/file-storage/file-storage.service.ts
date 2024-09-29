import { Injectable } from "@nestjs/common";
import { FileStorageType } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { allPresets } from "./preset/preset";

@Injectable()
export class FileStorageService {
	constructor(private readonly prisma: PrismaService) {}

	async preset() {
		const dataToInsert = allPresets.map((item) => {
			return {
				filename: item.filename,
				path: item.path,
				mimeType: item.mimeType,
				type: item.type as FileStorageType,
				size: item.size,
				publicUrl: item.path,
			};
		});

		return this.prisma.extendedClient.fileStorage.createMany({
			data: dataToInsert, // Ensure that this matches the FileStorageCreateInput type
			skipDuplicates: true, // This can help to skip duplicate entries, if needed
		});
	}

	async saveFile({
		path,
		filename,
		mimeType,
		size,
		fullUrl,
		type,
	}: {
		path: string;
		filename: string;
		mimeType: string;
		size: number;
		fullUrl: string;
		type: FileStorageType;
	}) {
		return this.prisma.extendedClient.fileStorage.create({
			data: {
				path,
				filename,
				mimeType,
				size,
				publicUrl: fullUrl,
				type,
			},
		});
	}

	async getAllFile(baseUrl?: string) {
		const files = await this.prisma.extendedClient.fileStorage.findMany({});

		return Promise.all(
			files.map((item) => {
				return {
					...item,
					publicUrl: baseUrl ? `${baseUrl}${item.publicUrl}` : item.publicUrl,
				};
			}),
		);
	}

	async getFileById(id: number, baseUrl?: string) {
		const file = await this.prisma.extendedClient.fileStorage.findUniqueOrThrow({
			where: { id },
		});

		const { publicUrl, ...otherFileData } = file;

		return {
			...otherFileData,
			publicUrl: baseUrl ? `${baseUrl}${file.publicUrl}` : file.publicUrl,
		};
	}

	async deleteFileById(id: number) {
		const fileStorage = await this.getFileById(id);

		return this.prisma.extendedClient.fileStorage.delete({
			where: { id: fileStorage.id },
		});
	}
}
