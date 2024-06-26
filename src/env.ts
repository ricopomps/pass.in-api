import z from "zod";

const envSchema = z.object({
  PORT: z.coerce.number(),
  DATABASE_URL: z.string().min(1),
});

export const env = envSchema.parse(process.env);
