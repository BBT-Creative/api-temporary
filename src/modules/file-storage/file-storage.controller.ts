import {
	Controller,
	Get,
	Post,
	Param,
	UseInterceptors,
	UploadedFile,
	UploadedFiles,
	Delete,
	NotFoundException,
	Req,
} from "@nestjs/common";
import { FileStorageService } from "./file-storage.service";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { Request } from "express";
import * as fs from "fs";
import * as path from "path";
import { ConfigService } from "@nestjs/config";
import { FileStorageType } from "@prisma/client";

@Controller("file-storage")
export class FileStorageController {
	constructor(
		private readonly fileStorageService: FileStorageService,
		private readonly configService: ConfigService,
	) {}

	@Post("preset")
	async preset() {
		return this.fileStorageService.preset();
	}

	@Post("upload")
	@UseInterceptors(
		FileInterceptor("file", {
			storage: diskStorage({
				destination: (req, file, callback) => {
					// Check if category exists in the request body, otherwise null
					const category = req.body.category || null;

					// Determine the base folder (if no category, place in /public/clouds directly)
					const baseFolder = path.join(__dirname, "..", "..", "..", "public", "clouds");
					const destinationPath = category
						? path.join(baseFolder, category) // If category exists, create a subfolder
						: baseFolder; // Otherwise, place file directly in /public/clouds

					// Ensure the folder exists
					if (!fs.existsSync(destinationPath)) {
						fs.mkdirSync(destinationPath, { recursive: true });
					}

					// Return the final destination path
					callback(null, destinationPath);
				},
				filename: (_, file, callback) => {
					callback(null, `${path.extname(file.originalname)}`);
				},
			}),
			limits: {
				fileSize: 1 * 1024 * 1024 * 1024, // 1 GB in bytes
			},
			fileFilter: (_, file, callback) => {
				const allowedMimeTypes = [
					"video/mp4",
					"video/quicktime", // For .mov files
					"video/webm",
					"image/png",
					"image/jpeg",
					"image/svg+xml",
					"application/pdf",
					"application/msword",
					"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
					"application/vnd.ms-powerpoint",
					"application/vnd.openxmlformats-officedocument.presentationml.presentation",
					"application/vnd.ms-excel",
					"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
				];
				if (allowedMimeTypes.includes(file.mimetype)) {
					callback(null, true);
				} else {
					callback(new Error("Invalid file type"), false);
				}
			},
		}),
	)
	async upload(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
		const fileSizeInBytes = file.size;
		const fileSizeInMB = fileSizeInBytes / (1024 * 1024); // Convert to MB
		const baseUrl = this.configService.get<string>("BASE_URL");

		const category = req.body.category || null;
		const fileType = file.mimetype.startsWith("image/") ? "image" : file.mimetype.startsWith("video/") ? "video" : "document";

		const filePath = category ? `/clouds/${category}/${file.filename}` : `/clouds/${file.filename}`;
		const fullUrl = category ? `${baseUrl}/clouds/${category}/${file.filename}` : `${baseUrl}/clouds/${file.filename}`;

		return this.fileStorageService.saveFile({
			path: filePath,
			filename: file.filename,
			mimeType: file.mimetype,
			size: fileSizeInMB,
			fullUrl,
			type: fileType,
		});
	}

	@Post("upload/batch")
	@UseInterceptors(
		FilesInterceptor("files", 10, {
			storage: diskStorage({
				destination: (req, file, callback) => {
					const category = req.body.category || null;

					// Define base folder path (/public/clouds)
					const baseFolder = path.join(__dirname, "..", "..", "..", "public", "clouds");

					// If a category is provided, create a subfolder. Otherwise, use base folder.
					const destinationPath = category ? path.join(baseFolder, category) : baseFolder;

					// Ensure directory exists
					if (!fs.existsSync(destinationPath)) {
						fs.mkdirSync(destinationPath, { recursive: true });
					}

					callback(null, destinationPath);
				},
				filename: (req, file, callback) => {
					callback(null, `${path.extname(file.originalname)}`);
				},
			}),
			limits: {
				fileSize: 1 * 1024 * 1024 * 1024, // 1 GB in bytes
			},
			fileFilter: (req, file, callback) => {
				const allowedMimeTypes = [
					"video/mp4",
					"video/quicktime", // For .mov files
					"video/webm",
					"image/png",
					"image/jpeg",
					"image/svg+xml",
					"application/pdf",
					"application/msword",
					"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
				];
				if (allowedMimeTypes.includes(file.mimetype)) {
					callback(null, true);
				} else {
					callback(new Error("Invalid file type"), false);
				}
			},
		}),
	)
	async uploadFiles(@UploadedFiles() files: Express.Multer.File[], @Req() req: Request) {
		return Promise.all(
			files.map(async (file) => {
				const fileSizeInBytes = file.size;
				const fileSizeInMB = fileSizeInBytes / (1024 * 1024); // Convert to MB
				const baseUrl = this.configService.get<string>("BASE_URL");

				const category = req.body.category || null;
				const fileType = file.mimetype.startsWith("image/")
					? "image"
					: file.mimetype.startsWith("video/")
						? "video"
						: "document";

				const filePath = category ? `/clouds/${category}/${file.filename}` : `/clouds/${file.filename}`;
				const fullUrl = category
					? `${baseUrl}/clouds/${category}/${file.filename}`
					: `${baseUrl}/clouds/${file.filename}`;

				return this.fileStorageService.saveFile({
					path: filePath,
					filename: file.filename,
					mimeType: file.mimetype,
					size: fileSizeInMB,
					fullUrl,
					type: fileType,
				});
			}),
		);
	}

	@Get()
	async getAllFiles() {
		const baseUrl = this.configService.get<string>("BASE_URL");
		return this.fileStorageService.getAllFile(baseUrl);
	}

	@Get(":id")
	async getById(@Param("id") id: number) {
		const baseUrl = this.configService.get<string>("BASE_URL");
		return this.fileStorageService.getFileById(id, baseUrl);
	}

	@Delete(":id")
	async deleteById(@Param("id") id: number) {
		const fileStorage = await this.fileStorageService.getFileById(id);

		if (!fileStorage) {
			throw new NotFoundException("File not found.");
		}

		// Construct the file path
		const filePath = path.join(__dirname, "..", "public", "clouds", fileStorage.filename);

		try {
			fs.unlinkSync(filePath);
		} catch (error) {
			throw new Error("Failed to delete file from the filesystem");
		}

		return this.fileStorageService.deleteFileById(id);
	}
}
