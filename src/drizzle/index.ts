import "server-only";
import { RDSDataClient } from "@aws-sdk/client-rds-data";
import { drizzle } from "drizzle-orm/aws-data-api/pg";
import { AWS_REGION, DATABASE, RESOURCE_ARN, SECRET_ARN } from "@/config/env";
import { relations } from "@/drizzle/relations";

export const rdsClient = new RDSDataClient({ region: AWS_REGION });

export const db = drizzle({
  client: rdsClient,
  database: DATABASE,
  secretArn: SECRET_ARN,
  resourceArn: RESOURCE_ARN,
  relations,
});
