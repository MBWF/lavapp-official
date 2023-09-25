import { MIN_LENGTH, REQUIRED_ERROR } from "@/utils/ErrorsMessages";
import { parseISO } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import { IssueData, z } from "zod";

const customAddIssueString: IssueData = {
  code: "too_small",
  minimum: 3,
  inclusive: false,
  type: "string",
  message: REQUIRED_ERROR,
};

export const orderSchema = z
  .object({
    customer: z
      .object(
        { label: z.string(), value: z.string() },
        { required_error: REQUIRED_ERROR }
      )
      .optional(),
    name: z.string().optional(),
    isNewCustomer: z.boolean(),
    isDelivery: z.boolean().optional(),
    phone_number: z
      .string({
        required_error: REQUIRED_ERROR,
      })
      .optional(),
    collect_date: z
      .string({
        invalid_type_error: "Insira uma data",
        required_error: REQUIRED_ERROR,
      })
      .nullable()
      .optional()
      .refine((date) => date !== null, {
        message: "Insira uma data",
      })
      .transform((date) => {
        if (date) {
          const parsed_date = parseISO(date);

          const dateWithTimeZone = zonedTimeToUtc(
            parsed_date,
            "America/Sao_Paulo"
          );

          return dateWithTimeZone.toISOString();
        }

        return date;
      }),
    delivery_date: z
      .string({
        invalid_type_error: "Insira uma data",
        required_error: REQUIRED_ERROR,
      })
      .nullable()
      .optional()
      .refine((date) => date !== null, {
        message: "Insira uma data",
      })
      .transform((date) => {
        if (date) {
          const parsed_date = parseISO(date);

          const dateWithTimeZone = zonedTimeToUtc(
            parsed_date,
            "America/Sao_Paulo"
          );

          return dateWithTimeZone.toISOString();
        }

        return date;
      }),

    cep: z.string().optional(),
    city: z.string().optional(),
    place_number: z.string().optional(),
    district: z.string().optional(),
    street: z.string().optional(),
    complement: z.string({ required_error: REQUIRED_ERROR }).optional(),
  })
  .superRefine((ctx, val) => {
    if (ctx.isNewCustomer) {
      if (String(ctx.name).length < 3) {
        val.addIssue({
          ...customAddIssueString,
          path: ["name"],
        });
      }
      if (Number(ctx.phone_number?.length) < 13 || !ctx.phone_number) {
        val.addIssue({
          ...customAddIssueString,
          path: ["phone_number"],
        });
      }
    }
    if (!ctx.isNewCustomer) {
      if (!ctx.customer)
        val.addIssue({
          code: "too_small",
          minimum: 1,
          type: "array",
          inclusive: true,
          path: ["customer"],
          message: REQUIRED_ERROR,
        });
    }

    if (ctx.isDelivery) {
      if (Number(ctx.cep?.length) < 3) {
        val.addIssue({
          ...customAddIssueString,
          path: ["cep"],
        });
      }
      if (Number(ctx.district?.length) < 3) {
        val.addIssue({
          ...customAddIssueString,
          path: ["district"],
        });
      }
      if (Number(ctx.street?.length) < 3) {
        val.addIssue({
          ...customAddIssueString,
          path: ["street"],
        });
      }
      if (Number(ctx.place_number?.length) < 1) {
        val.addIssue({
          code: "too_small",
          minimum: 1,
          inclusive: true,
          type: "string",
          message: REQUIRED_ERROR,
          path: ["place_number"],
        });
      }
    }
  });

export type OrderSchemaType = z.infer<typeof orderSchema>;
