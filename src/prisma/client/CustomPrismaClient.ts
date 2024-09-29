import { customPrismaClient } from "./PrismaExtendedClient";

export type CustomPrismaClient = ReturnType<typeof customPrismaClient>;