import { MIN_LENGTH, REQUIRED_ERROR } from "@/utils/ErrorsMessages";
import { validateCPF } from "@/utils/validateCpf";
import { parseISO } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import { z } from "zod";

const isValidCPFDocument = (document: string) =>
  document.length <= 11 && !validateCPF(document);

export const customerSchema = z
  .object({
    name: z.string({ required_error: REQUIRED_ERROR }).min(2, REQUIRED_ERROR),
    email: z.string().email({
      message: "Email inválido",
    }),
    cpf: z.string({ required_error: REQUIRED_ERROR }),
    phone_number: z
      .string({
        required_error: REQUIRED_ERROR,
      })
      .min(2, REQUIRED_ERROR),
    gender: z.object(
      { label: z.string(), value: z.string() },
      { required_error: REQUIRED_ERROR }
    ),
    item_code: z
      .string({ required_error: REQUIRED_ERROR })
      .min(1, REQUIRED_ERROR),
    birthdate: z
      .string({
        invalid_type_error: "Insira uma data",
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
    district: z
      .string({
        required_error: REQUIRED_ERROR,
      })
      .min(2, "O bairro deve ter mais de dois caracteres"),
    cep: z.string({ required_error: REQUIRED_ERROR }).min(3, MIN_LENGTH),
    state: z.string({ required_error: REQUIRED_ERROR }).min(3, MIN_LENGTH),
    city: z.string({ required_error: REQUIRED_ERROR }).min(3, MIN_LENGTH),
    place_number: z
      .string({
        required_error: REQUIRED_ERROR,
      })
      .min(1, REQUIRED_ERROR),
    street: z
      .string({
        required_error: REQUIRED_ERROR,
      })
      .min(2, "O endereço deve ter mais de dois caracteres"),
    complement: z.string({ required_error: REQUIRED_ERROR }).optional(),
  })

  .refine((arg) => !isValidCPFDocument(arg.cpf.replace(/\D/g, "")), {
    path: ["cpf"],
    message: "CPF inválido",
  });

export type CustomerSchemaType = z.infer<typeof customerSchema>;
