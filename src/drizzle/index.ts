import "server-only";
import { RDSDataClient } from "@aws-sdk/client-rds-data";
import { drizzle } from "drizzle-orm/aws-data-api/pg";
import { DATABASE, RESOURCE_ARN, SECRET_ARN } from "@/config/env";

const rdsClient = new RDSDataClient({ region: "eu-central-1" });

export const db = drizzle({
  client: rdsClient,
  database: DATABASE,
  secretArn: SECRET_ARN,
  resourceArn: RESOURCE_ARN,
});
