import { Layout } from "@/components";
import { ItemsPage } from "@/components/Templates/Items";
import { getItems } from "@/firebase/http/items";
import { GetServerSideProps } from "next";

export type IItems = {
  name: string;
  un: string;
  price: number;
};

export default function Pecas({ itemsData }: { itemsData: IItems[] }) {
  return (
    <Layout>
      <ItemsPage itemsData={itemsData} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const itemsResponse = await getItems();

  return {
    props: {
      itemsData: itemsResponse,
    },
  };
};
