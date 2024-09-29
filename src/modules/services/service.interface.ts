import { Prisma } from "@prisma/client";

export type Service = Prisma.ServiceGetPayload<{
	include: {
		detail: {
			include: {
				calculation: true;
				contents: {
					include: {
						serviceItems: true;
					};
				};
			};
		};
	};
}>;
