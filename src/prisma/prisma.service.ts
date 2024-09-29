import { HttpStatus, Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";
import { prismaErrorCodeMap } from "./error/prismaErrorCodeMap";
import { BbtHttpError } from "src/error/BbtHttpError";
import { isPasswordMatch } from "src/utils/hasher.util";
import { BbtErrorCode } from "src/error/enum/BbtErrorCode";

export const prismaExtendedClient = (prismaClient: PrismaClient) =>
	prismaClient.$extends({
		model: {
			$allModels: {
				async softDelete<M, A>(
					this: M,
					where: Prisma.Args<M, "update">["where"],
				): Promise<Prisma.Result<M, A, "update">> {
					const context = Prisma.getExtensionContext(this);

					// eslint-disable-next-line @typescript-eslint/no-explicit-any -- There is no way to type a Prisma model
					return (context as any).update({
						where,
						data: {
							deletedAt: new Date(),
						},
					});
				},
				async isDeleted<M>(this: M, where: Prisma.Args<M, "findUnique">["where"]): Promise<boolean> {
					const context = Prisma.getExtensionContext(this);

					// eslint-disable-next-line @typescript-eslint/no-explicit-any -- There is no way to type a Prisma model
					const result = await (context as any).findUnique({ where });

					return !!result.deletedAt;
				},
				async exists<T>(this: T, where: Prisma.Args<T, "findFirst">["where"]): Promise<boolean> {
					// Get the current model at runtime
					const context = Prisma.getExtensionContext(this);

					const result = await (context as any).findFirst({ where });
					return result !== null;
				},
			},
			/* admin: {
				async signIn(email: string, password: string) {
					const admin = await prismaClient.admin.findUniqueOrThrow({
						where: { email: email },
						include: {
							
						},
					});

					const passwordMatch = await isPasswordMatch(password, admin.password);

					if (!passwordMatch) {
						throw new XabsHttpError({
							message: "SignIn Error: Password Not Match.",
							statusCode: HttpStatus.UNAUTHORIZED,
							code: XabsErrorCode.authError.PASSWORD_NOT_MATCH,
						});
					}

					return admin;
				}
			} */
		},
		query: {
			$allModels: {
				async findUniqueOrThrow({ model, query, args }) {
					try {
						return query(args);
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
						return query(args);
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
				async update({ model, query, args }) {
					try {
						return query(args);
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

						throw new BbtHttpError({
							message: error.message,
							statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
							code: BbtErrorCode.otherError.UNKNOWN_ERROR,
						});
					}
				},
				async create({ model, query, args }) {
					try {
						return query(args);
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

						throw new BbtHttpError({
							message: error.message,
							statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
							code: BbtErrorCode.otherError.UNKNOWN_ERROR,
						});
					}
				},
				async findMany({ model, query, args }) {
					try {
						return query(args);
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

						throw new BbtHttpError({
							message: error.message,
							statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
							code: BbtErrorCode.otherError.UNKNOWN_ERROR,
						});
					}
				},
				async findFirst({ model, query, args }) {
					try {
						return query(args);
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

						throw new BbtHttpError({
							message: error.message,
							statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
							code: BbtErrorCode.otherError.UNKNOWN_ERROR,
						});
					}
				},
				async findUnique({ model, query, args }) {
					try {
						return query(args);
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

						throw new BbtHttpError({
							message: error.message,
							statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
							code: BbtErrorCode.otherError.UNKNOWN_ERROR,
						});
					}
				},
			},
		},
	});

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
	readonly extendedClient = prismaExtendedClient(this);

	constructor() {
		super();

		new Proxy(this, {
			get: (target, property) => Reflect.get(property in this.extendedClient ? this.extendedClient : target, property),
		});
	}

	async onModuleInit() {
		await this.$connect();
	}

	async onModuleDestroy() {
		await this.$disconnect();
	}
}

// Define Type Of Prisma Extension
type PrismaExtSingleton = ReturnType<typeof prismaExtendedClient>;

// Access Transaction With Extension
export type PrismaExtTransactionClient = Parameters<Parameters<PrismaExtSingleton["$transaction"]>[0]>[0];

// Access Transaction Without Extension
export type PrismaTransactionalClient = Parameters<Parameters<PrismaService["$transaction"]>[0]>[0];
