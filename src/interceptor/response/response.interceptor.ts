import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

export type Response<T> = {
	status: number;
	message: string;
	data: T;
	extensions?: {
		code: string;
		meta: any | null;
		servicePath?: string;
		timestamp: string;
	};
};

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
	intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
		return next.handle().pipe(map((res: unknown) => this.responseHandler(res, context)));
	}

	responseHandler(res: any, context: ExecutionContext) {
		const ctx = context.switchToHttp();
		const response = ctx.getResponse();
		const statusCode = response.statusCode;

		return {
			status: statusCode,
			message: "OK",
			data: res,
		};
	}
}
