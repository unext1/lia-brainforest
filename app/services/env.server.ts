import z from "zod";

const envSchema = z.object({
  API_KEY: z.string().min(1),
  WEBSITE_URL: z.string().min(1),
  AZURE_SUBSCRIPTION_KEY: z.string().min(1),
  JWT_SECRET_KEY: z.string().min(1),
  HASURA_GRAPHQL_URL: z.string().min(1),
  HASURA_GRAPHQL_ADMIN_SECRET: z.string().min(1),
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
  HASURA_GRAPHQL_JWT_SECRET: z.string().transform((item) =>
    z
      .object({
        key: z.string(),
        type: z.enum(["HS256", "HS512"]).default("HS256"),
      })
      .parse(JSON.parse(item))
  ),
});

export const env = envSchema.parse(process.env);
