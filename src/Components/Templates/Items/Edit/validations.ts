import { MIN_LENGTH, REQUIRED_ERROR, NON_EMPTY } from "@/utils/ErrorsMessages";
import { z } from "zod";

export const itemsSchema = z
  .object({
    name: z.string({ required_error: REQUIRED_ERROR }).min(3, MIN_LENGTH),
    price: z
      .string({
        required_error: REQUIRED_ERROR,
        invalid_type_error: "Insira o valor.",
      })
      .nonempty(NON_EMPTY),
    un: z.string({ required_error: REQUIRED_ERROR }).nonempty(NON_EMPTY),
  })
  .refine((ctx) => {
    return {
      ...ctx,
      price: Number(ctx.price.replace(/[^\d.-]/g, "")),
    };
  });

export type ItemsValidation = z.infer<typeof itemsSchema>;
