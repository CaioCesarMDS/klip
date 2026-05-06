import { logger } from "./logger";

type NodeEnv = "development" | "production" | "test";

interface EnvSchema {
	NODE_ENV: NodeEnv;
	PORT: number;
}

const parseNodeEnv = (value: unknown): NodeEnv => {
	if (value === "development" || value === "production" || value === "test") {
		return value;
	}

	throw new Error(
		`Invalid NODE_ENV: "${value}". Expected "development" | "production" | "test"`,
	);
};

const parsePort = (value: unknown): number => {
	if (value === undefined || value === null || value === "") {
		return 3000;
	}
  
	const port = Number(value);

	if (!Number.isInteger(port) || port <= 0) {
		throw new Error(`Invalid PORT: "${value}". Expected a positive integer`);
	}

	return port;
};

export const loadEnv = (input: NodeJS.ProcessEnv): EnvSchema => {
	return {
		NODE_ENV: parseNodeEnv(input.NODE_ENV),
		PORT: parsePort(input.PORT),
	};
};

const initEnv = (): EnvSchema => {
	try {
		return loadEnv(process.env);
	} catch (error) {
		logger.fatal({ error }, "Environment validation failed");
		process.exit(1);
	}
};

export const env = initEnv();
export type Env = typeof env;
