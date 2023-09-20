import { Layout } from "@/components";
import EditCustomer from "@/components/Templates/Customer/Edit";
import { getCustomersById } from "@/firebase/http/customers";
import { ICustomers } from "@/types/Customers";
import { GetServerSideProps } from "next";

type EditCustomerPageProps = {
  customerData: ICustomers;
};

export default function EditCustomerPage({
  customerData,
}: EditCustomerPageProps) {
  return (
    <Layout>
      <EditCustomer customerData={customerData} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const customer = await getCustomersById(String(ctx.query.id));
  return {
    props: {
      customerData: customer,
    },
  };
};
