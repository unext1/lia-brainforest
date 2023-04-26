import z from "zod";

const envSchema = z.object({
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
