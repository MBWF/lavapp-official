import { Layout } from "@/components";
import { CreateNewOrderTemplate } from "@/components/Templates/Orders/Create";
import { getCustomers } from "@/firebase/http/customers";
import { getItems } from "@/firebase/http/items";
import { ICustomers } from "@/types/Customers";
import { IItems } from "@/types/Items";
import { GetServerSideProps } from "next";

type OrdersPageProps = {
  customerData: ICustomers[];
  itemsData: IItems[];
};

export default function CreateOrder({
  customerData,
  itemsData,
}: OrdersPageProps) {
  return (
    <Layout>
      <CreateNewOrderTemplate
        customerData={customerData}
        itemsData={itemsData}
      />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const itemsResponse = await getItems();
  const customerResponse = await getCustomers();

  return {
    props: {
      customerData: customerResponse,
      itemsData: itemsResponse,
    },
  };
};
