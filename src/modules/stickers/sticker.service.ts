import { Injectable } from "@nestjs/common";
import { join } from "path";
import { PrismaService } from "src/prisma/prisma.service";
import * as fs from "fs";

@Injectable()
export class StickerService {
	constructor(private readonly prisma: PrismaService) {}

	async create({ path }: { path: string }) {
		const lastSticker = await this.prisma.extendedClient.sticker.findFirst({
			orderBy: { name: "desc" },
			where: { name: { startsWith: "sticker-" } },
			select: { name: true },
		});

		// Determine the next sticker number
		let nextNumber = 0;
		if (lastSticker) {
			const lastNumber = parseInt(lastSticker.name.split("-")[1], 10);
			nextNumber = isNaN(lastNumber) ? 0 : lastNumber + 1;
		}

		const name = `sticker-${nextNumber}`;

		return this.prisma.extendedClient.sticker.create({
			data: { path, name },
		});
	}

	async getAll(baseUrl: string) {
		const stickers = await this.prisma.sticker.findMany({
			orderBy: { id: "asc" },
		});

		return Promise.all(
			stickers.map((sticker) => {
                const { id, name, path } = sticker;
                
                return {
					id,
					name,
					path: path === null ? null : `${baseUrl}${path}`,
				};
			}),
		);
	}

	async preset() {
		await this.prisma.extendedClient.sticker.deleteMany({});

		const paths = [
			"/clouds/stickers/sticker-0.webp",
			"/clouds/stickers/sticker-1.webp",
			"/clouds/stickers/sticker-2.webp",
			"/clouds/stickers/sticker-3.webp",
			"/clouds/stickers/sticker-4.webp",
			"/clouds/stickers/sticker-5.webp",
			"/clouds/stickers/sticker-6.webp",
			"/clouds/stickers/sticker-7.webp",
			"/clouds/stickers/sticker-8.webp",
		];

		const results: { id: number; path: string | null; name: string }[] = [];

		for (const path of paths) {
			const sticker = await this.create({ path });
			results.push(sticker);
		}

		return results;
	}

	async updateStickerFile(id: number, path: string | null) {
		const sticker = await this.prisma.extendedClient.sticker.findUniqueOrThrow({ where: { id } });
		

		if (sticker.path === null) return;

		// Reset the ID counter (raw SQL query)
		await this.prisma.$executeRawUnsafe(`ALTER SEQUENCE "Sticker_id_seq" RESTART WITH 1;`);

		this.removeStickerFile(sticker.path);

		return this.prisma.sticker.update({
			where: { id: sticker.id },
			data: {
				path: path,
			},
		});
	}

	private removeStickerFile(filePath: string) {
		try {
			const fullPath = join(process.cwd(), "public", filePath);
			console.log(`Attempting to delete file at: ${fullPath}`);

			if (fs.existsSync(fullPath)) {
				fs.unlinkSync(fullPath);
				console.log(`File deleted: ${fullPath}`);
			} else {
				console.log(`File not found: ${fullPath}`);
			}
		} catch (error) {
			console.error(`Error deleting file: ${error}`);
		}
	}
}
