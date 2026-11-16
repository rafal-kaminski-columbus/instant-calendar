import { getEnv } from "../config/getEnv";

export const DATABASE = getEnv("DATABASE");
export const SECRET_ARN = getEnv("SECRET_ARN");
export const RESOURCE_ARN = getEnv("RESOURCE_ARN");
export const AWS_REGION = getEnv("AWS_REGION");
