import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from "@nestjs/common";
import { AbstractHttpAdapter } from "@nestjs/core";
import { BbtHttpError } from "../BbtHttpError";
import { BbtValidationError } from "../BbtValidationError";
import { MulterError } from "multer";
import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";

interface ErrorResponse {
	status: number;
	message: string | string[];
	extensions: {
		code: string;
		servicePath?: string;
		timestamp: string;
	};
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	constructor(private readonly httpAdapterHost: AbstractHttpAdapter) {}

	catch(exception: unknown, host: ArgumentsHost): void {
		const httpAdapter = this.httpAdapterHost;
		const ctx = host.switchToHttp();

		const requestUrl = httpAdapter.getRequestUrl(ctx.getRequest());
		const timestamp = new Date().toISOString();

		let errorResponseBody: ErrorResponse = {
			status: HttpStatus.BAD_GATEWAY,
			message: (exception as any).message,
			extensions: {
				code: "ER:5000",
				servicePath: requestUrl,
				timestamp: timestamp,
			},
		};

		if (exception instanceof BbtHttpError || exception instanceof BbtValidationError) {
			const serializedError = exception.serializeErrors();
			errorResponseBody = {
				status: serializedError.statusCode,
				message: serializedError.message,
				extensions: {
					code: serializedError.code,
					servicePath: requestUrl,
					timestamp: serializedError.timestamp,
				},
			};
		}
		
		if (exception instanceof MulterError) {
			errorResponseBody = {
				status: HttpStatus.BAD_REQUEST,
				message: exception.message,
				extensions: {
					code: "ER:7000",
					servicePath: requestUrl,
					timestamp: timestamp,
				},
			};
		}

		httpAdapter.reply(ctx.getResponse(), errorResponseBody, errorResponseBody.status);
	}
}
