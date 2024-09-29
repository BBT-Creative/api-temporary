import { Prisma, PrismaClient } from "@prisma/client";
import { CustomPrismaClient } from "./CustomPrismaClient";
import { prismaErrorCodeMap } from "../error/prismaErrorCodeMap";
import { BbtHttpError } from "src/error/BbtHttpError";
import { HttpStatus } from "@nestjs/common";
 
export const customPrismaClient = (prismaClient: PrismaClient) => {
	return prismaClient.$extends({
		model: {
			$allModels: {
				async exists<T>(this: T, where: Prisma.Args<T, "findFirst">["where"]): Promise<boolean> {
					// Get the current model at runtime
					const context = Prisma.getExtensionContext(this);

					const result = await (context as any).findFirst({ where });
					return result !== null;
				},
			},
		},
		query: {
			$allModels: {
				async findUniqueOrThrow({ model, query, args }) {
					try {
						await query(args);
					} catch (error) {
						if (error instanceof Prisma.PrismaClientKnownRequestError) {
							if (error.code in prismaErrorCodeMap && model in prismaErrorCodeMap[error.code]) {
								const { message, code } = prismaErrorCodeMap[error.code][model];
								throw new BbtHttpError({
									message,
									statusCode: HttpStatus.NOT_FOUND,
									code,
								});
							}
						}

						throw error;
					}
				},
				async findFirstOrThrow({ model, query, args }) {
					try {
						await query(args);
					} catch (error) {
						if (error instanceof Prisma.PrismaClientKnownRequestError) {
							if (error.code in prismaErrorCodeMap && model in prismaErrorCodeMap[error.code]) {
								const { message, code } = prismaErrorCodeMap[error.code][model];
								throw new BbtHttpError({
									message,
									statusCode: HttpStatus.NOT_FOUND,
									code,
								});
							}
						}

						throw error;
					}
				},
			},
		},
	});
};

export class PrismaClientExtended extends PrismaClient {
	customPrismaClient: CustomPrismaClient;

	get client() {
		if (!this.customPrismaClient) this.customPrismaClient = customPrismaClient(this);
		return this.customPrismaClient;
	}
}
