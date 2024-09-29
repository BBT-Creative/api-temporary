import * as bcrypt from "bcrypt";

export const hash = async (pass: string) => {
	const hash = await bcrypt.hash(pass, 10);
	return hash;
};

export const isPasswordMatch = async (input: string, hashed: string) => {
	return bcrypt.compare(input, hashed);
};