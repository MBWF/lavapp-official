import {
  CalendarCheck,
  Home,
  Settings,
  Shirt,
  ShoppingCart,
  Users,
} from "lucide-react";
import { ReactNode } from "react";

type routesProps = {
  img: ReactNode;
  path: string;
  name: string;
};

const ICON_SIZE = 28;

const HomeIcon = () => {
  return <Home size={ICON_SIZE} />;
};

const SettingsIcon = () => {
  return <Settings size={ICON_SIZE} />;
};

const UsersIcon = () => {
  return <Users size={ICON_SIZE} />;
};

const ShirtIcon = () => {
  return <Shirt size={ICON_SIZE} />;
};

const CalendarCheckIcon = () => {
  return <CalendarCheck size={ICON_SIZE} />;
};

const ShoppingCartIcon = () => {
  return <ShoppingCart size={ICON_SIZE} />;
};

export const routes: routesProps[] = [
  {
    name: "Home",
    img: <HomeIcon />,
    path: "/home",
  },
  {
    name: "Clientes",
    img: <UsersIcon />,
    path: "/clientes",
  },
  {
    name: "Peças",
    img: <ShirtIcon />,
    path: "/pecas",
  },
  {
    name: "Pedidos",
    img: <ShoppingCartIcon />,
    path: "/pedidos",
  },
  {
    name: "Agenda",
    img: <CalendarCheckIcon />,
    path: "/agenda",
  },
];
