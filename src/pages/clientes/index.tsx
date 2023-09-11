import { Layout } from "@/components";
import { CustomerPage } from "@/components/Templates/Customer";
import { ICustomers, getCustomers } from "@/firebase/http/customers";

import { GetServerSideProps } from "next";

export default function Customer({
  customersData,
}: {
  customersData: ICustomers[];
}) {
  return (
    <Layout>
      <CustomerPage customersData={customersData} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const customers = await getCustomers();

  return {
    props: {
      customersData: customers,
    },
  };
};

