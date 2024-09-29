import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { useContainer, ValidationError } from "class-validator";
import { ResponseInterceptor } from "./interceptor/response/response.interceptor";
import { AllExceptionsFilter } from "./error/filter/allExceptions.filter";
import { ValidationPipe } from "@nestjs/common";
import { BbtValidationError } from "./error/BbtValidationError";
import { ConfigService } from "@nestjs/config";
import * as bodyParser from "body-parser";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
	const { httpAdapter } = app.get(HttpAdapterHost);
	
	const configService = app.get<ConfigService>(ConfigService);
	const port = configService.get<number>("PORT") || 3000;

    /* Enable Static Assets */
    app.useStaticAssets(join(__dirname, "..", "public"));

    app.enableCors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
	});
	
	app.use(bodyParser.json({ limit: "100mb" }));
	app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.useGlobalInterceptors(new ResponseInterceptor());
	app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			transformOptions: {
				enableImplicitConversion: true,
			},
			stopAtFirstError: true,
			validationError: { target: false },
			exceptionFactory: (validationErrors: ValidationError[] = []) => {
				return new BbtValidationError(validationErrors);
			},
		}),
	);

	await app.listen(port);
}

bootstrap();
