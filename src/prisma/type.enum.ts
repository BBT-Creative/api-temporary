/*
 * ======================================
 * NON-PRISMA ENUM TYPE MODELS FOR PRISMA
 * ======================================
 */

export const SubscriptionPlanType = {
	trial: "TRIAL",
	corePackage: "CORE",
	corePlusPackage: "CORE_PLUS",
	proPackage: "PRO",
};

export const PaymentStatusType = {
	paid: "PAID",
	unpaid: "UNPAID",
	pending: "PENDING",
	cancelled: "CANCELLED",
};

export const PlanType = {
	yearly: "yearly",
	monthly: "monthly",
	trial: "trial",
};

export const SubscriptionStatusType = {
	active: "active",
	expired: "expired",
	pending: "pending",
};

export const PurchaseOrderStatusType = {
	pending: "pending",
	onProgress: "onProgress",
	done: "done",
	closed: "closed",
};

export const PurchaseInvoiceStatusType = {
	unpaid: "unpaid",
	partiallyPaid: "partiallyPaid",
	paid: "paid",
};

export type SubscriptionPlanType = (typeof SubscriptionPlanType)[keyof typeof SubscriptionPlanType];
export type PaymentStatusType = (typeof PaymentStatusType)[keyof typeof PaymentStatusType];
export type PlanType = (typeof PlanType)[keyof typeof PlanType];
export type SubscriptionStatusType = (typeof SubscriptionStatusType)[keyof typeof SubscriptionStatusType];
export type PurchaseOrderStatusType = (typeof PurchaseOrderStatusType)[keyof typeof PurchaseOrderStatusType];
export type PurchaseInvoiceStatusType = (typeof PurchaseInvoiceStatusType)[keyof typeof PurchaseInvoiceStatusType];
