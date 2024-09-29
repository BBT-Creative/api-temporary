import { Prisma } from "@prisma/client";

export type Insight = Prisma.InsightGetPayload<{
	include: {
		category: true;
		caseStudy: {
			include: {
				result: true;
			};
		};
	};
}>;
