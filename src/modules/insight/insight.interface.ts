import { Prisma } from "@prisma/client";

/* Use This For Insight single response */
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

/* Use This For Insights LIST Response */
export type InsightListItem = Prisma.InsightGetPayload<{
	select: {
		id: true;
		type: true;
		featured: true;
		title: true;
		posterPath: true;
		category: true;
	};
}>;
