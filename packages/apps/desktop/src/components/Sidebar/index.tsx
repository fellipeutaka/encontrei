import { useState, useMemo, useCallback, useEffect } from "react";
import { BsBoxSeam, BsTruck } from "react-icons/bs";
import { IoExitOutline, IoNotificationsOutline } from "react-icons/io5";
import { RiFileList3Line } from "react-icons/ri";
import { useLocation } from "react-router-dom";

import type { SidebarLink } from "../../@types/SidebarLink";
import { useTheme } from "../../hooks/useTheme";
import { supabase } from "../../lib/supabase";
import { Badge } from "../Badge";
import Logo from "../Icons/Logo";
import ThemeIcon from "../Icons/Theme";
import { Tooltip } from "../Tooltip";
import { Button, Container, LeaveButton, Options, ThemeButton } from "./styles";

const paths = {
  inventory: "/",
  withdraw: "/withdraw",
  found: "/found",
  delivered: "/delivered",
} as const;

type ValueOf<T> = T[keyof T];

type INotifications = {
  [K in "inventory" | "withdraw" | "found" | "delivered"]: {
    path: ValueOf<typeof paths>;
    amount: number;
  };
};

export default function Sidebar() {
  const [notifications, setNotifications] = useState<INotifications>({
    inventory: {
      path: paths.inventory,
      amount: 0,
    },
    withdraw: {
      path: paths.withdraw,
      amount: 0,
    },
    found: {
      path: paths.found,
      amount: 0,
    },
    delivered: {
      path: paths.delivered,
      amount: 0,
    },
  });
  const { pathname } = useLocation();
  const { toggleTheme: handleToggleTheme } = useTheme();

  const createLink = useCallback(
    ({ path, icon, text }: SidebarLink) => {
      return {
        path,
        active: pathname === path,
        icon,
        text,
      };
    },
    [pathname]
  );

  const sidebarLinks = useMemo(() => {
    return [
      createLink({
        path: paths.inventory,
        icon: <BsBoxSeam aria-label="Inventory icon" size={18} />,
        text: "Inventário",
      }),
      createLink({
        path: paths.withdraw,
        icon: <RiFileList3Line aria-label="Withdraw icon" size={18} />,
        text: "Solicitados",
      }),
      createLink({
        path: paths.found,
        icon: <IoNotificationsOutline aria-label="Found icon" size={18} />,
        text: "Encontrados",
      }),
      createLink({
        path: paths.delivered,
        icon: <BsTruck aria-label="Delivered icon" size={18} />,
        text: "Entregues",
      }),
    ];
  }, [pathname]);

  const handleSignOut = useCallback(async () => {
    try {
      const response = await window.Main.showMessageBox({
        options: {
          buttons: ["Não", "Sim"],
          title: "Encontrei",
          message: "Você realmente deseja sair?",
        },
      });
      if (response === 1) {
        await supabase.auth.signOut();
      }
    } catch (err) {
      console.error(err);
      window.Main.showError("Ocorreu um erro. Tente novamente mais tarde!");
    }
  }, []);

  const getNotificationAmount = useCallback(
    (link: SidebarLink) => {
      return Object.values(notifications).filter(
        (item) => item.path === link.path
      )[0].amount;
    },
    [notifications]
  );

  useEffect(() => {
    const [name, { amount }] = Object.entries(notifications).filter(
      (item) => item[1].path === pathname
    )[0];

    if (amount > 0) {
      setNotifications((state) => ({
        ...state,
        [name]: {
          ...state[name as keyof INotifications],
          amount: 0,
        },
      }));
    }
  }, [pathname]);

  useEffect(() => {
    const subscription = supabase
      .from("*")
      .on("INSERT", (payload) => {
        if (payload.table === "inventoryFound") {
          setNotifications((state) => ({
            ...state,
            found: {
              ...state.found,
              amount: pathname === paths.found ? 0 : state.found.amount + 1,
            },
          }));
        } else if (payload.table === "inventoryWithdraw") {
          setNotifications((state) => ({
            ...state,
            withdraw: {
              ...state.withdraw,
              amount:
                pathname === paths.withdraw ? 0 : state.withdraw.amount + 1,
            },
          }));
        }
      })
      .on("DELETE", (payload) => {
        if (payload.table === "inventoryFound") {
          setNotifications((state) => ({
            ...state,
            found: {
              ...state.found,
              amount: pathname === paths.found ? 0 : state.found.amount - 1,
            },
          }));
        } else if (payload.table === "inventoryWithdraw") {
          setNotifications((state) => ({
            ...state,
            withdraw: {
              ...state.withdraw,
              amount:
                pathname === paths.withdraw ? 0 : state.withdraw.amount - 1,
            },
          }));
        }
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <Container>
      <Options>
        <Logo />
        {sidebarLinks.map((link) => (
          <Badge content={getNotificationAmount(link)} max={9} key={link.path}>
            <Tooltip tooltipContent={link.text}>
              <Button
                to={link.path}
                aria-label={link.text}
                aria-checked={link.active}
              >
                {link.icon}
              </Button>
            </Tooltip>
          </Badge>
        ))}
      </Options>
      <div>
        <Tooltip tooltipContent="Trocar tema">
          <ThemeButton aria-label="Toggle theme" onClick={handleToggleTheme}>
            <ThemeIcon />
          </ThemeButton>
        </Tooltip>
        <Tooltip tooltipContent="Sair">
          <LeaveButton aria-label="Sign Out" onClick={handleSignOut}>
            <IoExitOutline />
          </LeaveButton>
        </Tooltip>
      </div>
    </Container>
  );
}
