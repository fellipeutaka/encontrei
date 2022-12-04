import { useState, useMemo, useCallback, useEffect } from "react";
import { BsBoxSeam, BsTruck } from "react-icons/bs";
import { IoExitOutline, IoNotificationsOutline } from "react-icons/io5";
import { RiFileList3Line } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

import type { SidebarLink } from "@encontrei/@types/SidebarLink";
import { useTheme } from "@encontrei/hooks/useTheme";
import { supabase } from "@encontrei/lib/supabase";

import { Badge } from "../Badge";
import { Logo } from "../Icons/Logo";
import { ThemeIcon } from "../Icons/Theme";
import { Tooltip } from "../Tooltip";

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

function createLink(pathname: string, { path, icon, text }: SidebarLink) {
  return {
    path,
    active: pathname === path,
    icon,
    text,
  };
}

export function Sidebar() {
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
  const { toggleTheme } = useTheme();

  const sidebarLinks = useMemo(() => {
    return [
      createLink(pathname, {
        path: paths.inventory,
        icon: <BsBoxSeam aria-label="Inventory icon" size={18} />,
        text: "Inventário",
      }),
      createLink(pathname, {
        path: paths.withdraw,
        icon: <RiFileList3Line aria-label="Withdraw icon" size={18} />,
        text: "Solicitados",
      }),
      createLink(pathname, {
        path: paths.found,
        icon: <IoNotificationsOutline aria-label="Found icon" size={18} />,
        text: "Encontrados",
      }),
      createLink(pathname, {
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
    <aside className="flex flex-col justify-between items-center w-14 h-screen dark:bg-neutral-900 bg-zinc-200 border-r border-r-zinc-600 py-4 px-2 absolute top-0 -left-16 transition animate-sidebarEntrance">
      <section className="flex flex-col items-center gap-6">
        <Logo />
        {sidebarLinks.map((link) => (
          <Badge content={getNotificationAmount(link)} max={9} key={link.path}>
            <Tooltip content={link.text}>
              <Link
                to={link.path}
                aria-label={link.text}
                aria-checked={link.active}
                className="w-10 h-10 flex justify-center items-center rounded outline-none text-zinc-400 text-xl font-semibold transition aria-[checked='true']:bg-zinc-600 aria-[checked='true']:text-white hover:bg-zinc-500 hover:text-zinc-800 focus-visible:bg-zinc-500 focus-visible:text-zinc-800"
              >
                {link.icon}
              </Link>
            </Tooltip>
          </Badge>
        ))}
      </section>
      <div>
        <Tooltip content="Trocar tema">
          <button
            className="w-10 h-10 flex justify-center items-center rounded outline-none text-zinc-100 text-xl font-semibold mb-2 transition hover:bg-zinc-500 hover:text-zinc-100 focus-visible:bg-zinc-500 focus-visible:text-zinc-100"
            aria-label="Toggle theme"
            onClick={toggleTheme}
          >
            <ThemeIcon />
          </button>
        </Tooltip>
        <Tooltip content="Sair">
          <button
            className="w-10 h-10 flex justify-center items-center rounded outline-none text-red-600 text-xl font-semibold mb-2 transition hover:text-red-800 focus-visible:text-red-800"
            aria-label="Sign Out"
            onClick={handleSignOut}
          >
            <IoExitOutline />
          </button>
        </Tooltip>
      </div>
    </aside>
  );
}
