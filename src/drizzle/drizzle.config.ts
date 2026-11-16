import { defineConfig } from "drizzle-kit";
import { DATABASE, RESOURCE_ARN, SECRET_ARN } from "@/config/env";

export default defineConfig({
  dialect: "postgresql",
  driver: "aws-data-api",
  out: "src/drizzle",
  dbCredentials: {
    database: DATABASE,
    secretArn: SECRET_ARN,
    resourceArn: RESOURCE_ARN,
  },
});
