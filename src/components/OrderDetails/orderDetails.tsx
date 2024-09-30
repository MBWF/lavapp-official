import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Phone,
  Calendar,
  Package,
  Truck,
  CreditCard,
  User,
  FileText,
} from "lucide-react";
import { IOrders, statusSteps } from "@/types/Orders";
import { formatCurrency } from "@/utils/formatCurrency";
import OrderStatusStepper from "./orderStatus";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: IOrders;
}

export default function OrderModal({
  isOpen,
  onClose,
  order,
}: OrderModalProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const currentStatus = statusSteps.find(
    (step) => step.status === order.status.name
  )?.label;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">
              Pedido #{order.order_number}
            </DialogTitle>
            <Badge className="text-white px-3 py-1 text-sm font-medium">
              {currentStatus}
            </Badge>
          </div>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
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
                  <span>{order.customer?.name || order.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{order.phone_number}</span>
                </div>
                <div>
                  <Badge
                    variant={order.isNewCustomer ? "default" : "secondary"}
                  >
                    {order.isNewCustomer
                      ? "Novo Cliente"
                      : "Cliente Recorrente"}
                  </Badge>
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
                <div className="w-full flex justify-center items-center">
                  <div>
                    <OrderStatusStepper initialStatus={order.status.name} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Data de Coleta:</span>
                  </div>
                  <span>{formatDate(order.collect_date)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Data de Entrega:</span>
                  </div>
                  <span>{formatDate(order.delivery_date)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-muted-foreground" />
                    <span>Tipo:</span>
                  </div>
                  <Badge variant="outline">
                    {order.isDelivery ? "Entrega" : "Retirada"}
                  </Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between font-semibold">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <span>Total:</span>
                  </div>
                  <span className="text-lg">{formatCurrency(order.total)}</span>
                </div>
              </CardContent>
            </Card>

            {order.address && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Endereço de Entrega
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    {order.address.street}, {order.address.place_number}
                  </p>
                  <p>
                    {order.address.district}, CEP: {order.address.zip_code}
                  </p>
                  {order.address.complement && (
                    <p>Complemento: {order.address.complement}</p>
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
                    {order.items.map((item) => (
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

            {order.description && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Oberservações
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{order.description}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
