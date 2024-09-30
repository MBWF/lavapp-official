import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { IOrders } from "@/types/Orders";
import { convertDateToShow } from "@/utils/convertDate";
import { formatCurrency } from "@/utils/formatCurrency";
import {
  Calendar,
  CreditCard,
  MapPin,
  Package,
  Phone,
  Truck,
  User,
} from "lucide-react";
import { useFormContext } from "react-hook-form";
import { SelectedItemsProps } from "..";
import { OrderSchemaType } from "../validations";

type ConfirmationStepProps = {
  selectedItems: SelectedItemsProps[];
  totalPrice: number;
};

export function ConfirmationStep({
  selectedItems,
  totalPrice,
}: ConfirmationStepProps) {
  const { getValues, register } = useFormContext<OrderSchemaType>();

  const orderData = getValues();

  return (
    <section>
      <div className="p-6 pb-0">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Criação de pedido</h1>
        </div>
      </div>

      <div className="space-y-6 p-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Informações do Cliente
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Nome:</span>
              <span>{orderData.customer?.label || orderData.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{orderData.phone_number}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Detalhes do Pedido
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Data de Coleta:</span>
              </div>
              <span>{convertDateToShow(String(orderData.collect_date))}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Data de Entrega:</span>
              </div>
              <span>{convertDateToShow(String(orderData.delivery_date))}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-muted-foreground" />
                <span>Tipo:</span>
              </div>
              <Badge variant="outline">
                {orderData.isDelivery ? "Entrega" : "Retirada"}
              </Badge>
            </div>
            <Separator />
            <div className="flex items-center justify-between font-semibold">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <span>Total:</span>
              </div>
              <span className="text-lg">{formatCurrency(totalPrice)}</span>
            </div>
          </CardContent>
        </Card>

        {orderData.isDelivery && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Endereço de Entrega
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                {orderData.street}, {orderData.place_number}
              </p>
              <p>
                {orderData.district}, CEP: {orderData.cep}
              </p>
              {orderData.complement && (
                <p>
                  <b>Complemento:</b> {orderData.complement}
                </p>
              )}
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Itens do Pedido
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-right">Quantidade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell className="text-right">
                      {item.quantity}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
          <Label className="text-md">Obsevações:</Label>
          <Textarea
            className="border-gray-400 h-20"
            placeholder="Adicione observações sobre as peças ou o pedido."
            {...register("description")}
          />
        </div>
      </div>
    </section>
  );
}
