import { HttpStatus } from "@nestjs/common";

export const httpErrorMappings: Record<number, { status: number; message: string; code: string }> = {
	400: {
		status: HttpStatus.BAD_REQUEST,
		message: "The request could not be understood or was missing required parameters.",
		code: "ER0001",
	},
	401: {
		status: HttpStatus.UNAUTHORIZED,
		message: "Authentication failed or user does not have permissions for the desired action.",
		code: "ER0002",
	},
	403: {
		status: HttpStatus.FORBIDDEN,
		message: "Access is forbidden to the requested resource.",
		code: "ER0003",
	},
	404: {
		status: HttpStatus.NOT_FOUND,
		message: "The resource could not be found on this server.",
		code: "ER0004",
	},
	405: {
		status: HttpStatus.METHOD_NOT_ALLOWED,
		message: "The request method is not supported for the requested resource.",
		code: "ER0005",
	},
	409: {
		status: HttpStatus.CONFLICT,
		message: "A conflict occurred with the current state of the resource.",
		code: "ER0006",
	},
	429: {
		status: HttpStatus.TOO_MANY_REQUESTS,
		message: "Too many requests have been made in a short period of time.",
		code: "ER0007",
	},
	500: {
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		message: "Internal server error. Please try again later.",
		code: "ER0008",
	},
	502: {
		status: HttpStatus.BAD_GATEWAY,
		message: "The server was acting as a gateway or proxy and received an invalid response from the upstream server.",
		code: "ER0009",
	},
	503: {
		status: HttpStatus.SERVICE_UNAVAILABLE,
		message: "The server is currently unavailable (overloaded or down).",
		code: "ER0010",
	},
	504: {
		status: HttpStatus.GATEWAY_TIMEOUT,
		message: "The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.",
		code: "ER0011",
	}
};
