import { REQUIRED_ERROR } from "@/utils/ErrorsMessages";
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
    phone_number: z
      .string({
        required_error: REQUIRED_ERROR,
      })
      .optional(),

    // email: z.string().email({
    //   message: "Email inválido",
    // }),
    //     cpf: z.string({ required_error: REQUIRED_ERROR }),
    //     gender: z.object(
    //       { label: z.string(), value: z.string() },
    //       { required_error: REQUIRED_ERROR }
    //     ),
    //     item_code: z
    //       .string({ required_error: REQUIRED_ERROR })
    //       .min(1, REQUIRED_ERROR),
    //     district: z
    //       .string({
    //         required_error: REQUIRED_ERROR,
    //       })
    //       .min(2, "O bairro deve ter mais de dois caracteres"),
    //     cep: z.string({ required_error: REQUIRED_ERROR }).min(3, MIN_LENGTH),
    //     state: z.string({ required_error: REQUIRED_ERROR }).min(3, MIN_LENGTH),
    //     city: z.string({ required_error: REQUIRED_ERROR }).min(3, MIN_LENGTH),
    //     place_number: z
    //       .string({
    //         required_error: REQUIRED_ERROR,
    //       })
    //       .min(1, REQUIRED_ERROR),
    //     street: z
    //       .string({
    //         required_error: REQUIRED_ERROR,
    //       })
    //       .min(2, "O endereço deve ter mais de dois caracteres"),
    //     complement: z.string({ required_error: REQUIRED_ERROR }).optional(),
    //   })

    //   .refine((arg) => !isValidCPFDocument(arg.cpf.replace(/\D/g, "")), {
    //     path: ["cpf"],
    //     message: "CPF inválido",
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
    } else {
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
  });

export type OrderSchemaType = z.infer<typeof orderSchema>;
