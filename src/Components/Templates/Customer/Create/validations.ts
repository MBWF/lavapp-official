import { validateCPF } from "@/utils/validateCpf";
import { parseISO } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import { z } from "zod";

const isValidCPFDocument = (document: string) =>
  document.length <= 11 && !validateCPF(document);

export const customerSchema = z
  .object({
    name: z.string().min(2, "Nome é obrigatório"),
    email: z.string().email({
      message: "Email inválido",
    }),
    cpf: z.string(),
    phone_number: z
      .string({
        required_error: "Número de telefone é obrigatório",
      })
      .min(2, "Número de telefone é obrigatório"),
    gender: z.object(
      { label: z.string(), value: z.string() },
      { required_error: "Esse campo é obrigatório." }
    ),
    birthdate: z
      .string({
        invalid_type_error: "Insira uma data",
      })
      .nullable()
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

          return dateWithTimeZone;
        }

        return date;
      }),
    address: z.object({
      cep: z.string(),
      state: z.object(
        {
          value: z.string(),
          label: z.string().optional(),
        },
        {
          required_error: "Selecione um Estado",
          invalid_type_error: "Selecione um Estado",
        }
      ),
      city: z
        .object(
          {
            value: z.string(),
            label: z.string().optional(),
          },
          {
            required_error: "Selecione uma Cidade",
            invalid_type_error: "Selecione um Cidade",
          }
        )
        .nullable(),
      district: z
        .string({
          required_error: "O bairro é obrigatório",
        })
        .min(2, "O bairro deve ter mais de dois caracteres"),
      place_number: z
        .string({
          required_error: "O número da residencia é obrigatório",
        })
        .min(1, "Número obrigatório"),
      street: z
        .string({
          required_error: "O endereço é obrigatório",
        })
        .min(2, "O endereço deve ter mais de dois caracteres"),
      complement: z.string().optional(),
    }),
  })
  .refine((arg) => arg.address.city, {
    path: ["address.city"],
    message: "Cidade é obrigatório",
  })

  .refine((arg) => !isValidCPFDocument(arg.cpf.replace(/\D/g, "")), {
    path: ["cpf"],
    message: "CPF inválido",
  });

export type CustomerSchemaType = z.infer<typeof customerSchema>;
