export type ICustomers = {
  id: string;
  name: string;
  code: string;
  birthdate?: string;
  cpf: string;
  gender: string;
  phone_number: string;
  address: {
    zip_code: string;
    district: string;
    number: string;
    street: string;
    complement?: string;
  };
};
