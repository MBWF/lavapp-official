export type ICustomers = {
  id: string;
  name: string;
  code: string;
  birthdate?: string;
  email: string;
  cpf: string;
  gender: string;
  phone_number: string;
  address: {
    city: string;
    state: string;
    zip_code: string;
    district: string;
    number: string;
    street: string;
    complement?: string;
  };
};
