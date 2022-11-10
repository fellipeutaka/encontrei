import { useEffect, useState, useCallback } from "react";
import { BsPencil, BsThreeDots, BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";

import type { SupabaseRealtimePayload } from "@supabase/supabase-js";

import type {
  Inventory as TInventory,
  Item,
} from "@encontrei/@types/Inventory";
import { Container } from "@encontrei/components/Container";
import { CreateItemDialog } from "@encontrei/components/CreateItemDialog";
import { DownloadButton } from "@encontrei/components/DownloadButton";
import { ImagePreview } from "@encontrei/components/ImagePreview";
import { SpinnerLoader } from "@encontrei/components/SpinnerLoader";
import { Table } from "@encontrei/components/Table";
import { supabase } from "@encontrei/lib/supabase";
import { capitalizeFirstLetter } from "@encontrei/utils/capitalizeFirstLetter";
import { getDisplayDateValues } from "@encontrei/utils/date";
import { deleteItemById } from "@encontrei/utils/deleteItemById";
import { downloadCSV } from "@encontrei/utils/downloadCSV";
import { getItems } from "@encontrei/utils/getItems";
import { getPublicUrl } from "@encontrei/utils/getPublicUrl";

import {
  DropdownMenu,
  DropdownMenuArrow,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./styles";

type RealtimePayload = SupabaseRealtimePayload<TInventory>;

async function fetchItems() {
  const data = await getItems<TInventory>("inventory");

  const items =
    data?.map((item) => {
      const { displayDate, displayHour } = getDisplayDateValues(
        item.includedAt
      );

      return {
        ...item,
        date: displayDate,
        time: displayHour,
        photo: getPublicUrl("inventory/" + item.photoFilename),
      };
    }) ?? null;

  return items;
}

export default function Inventory() {
  const [items, setItems] = useState<Item[] | null>(null);

  useEffect(() => {
    fetchItems()
      .then((data) => setItems(data))
      .catch(console.error);
  }, []);

  const realtimeOnInsert = useCallback((payload: RealtimePayload) => {
    setItems((state) => {
      if (state) {
        const { displayDate, displayHour } = getDisplayDateValues(
          payload.new.includedAt
        );
        const newItem = {
          ...payload.new,
          date: displayDate,
          time: displayHour,
          photo: getPublicUrl("inventory/" + payload.new.photoFilename),
        };
        return [...state, newItem];
      }
      return state;
    });
  }, []);

  const realtimeOnUpdate = useCallback((payload: RealtimePayload) => {
    console.log("UPDATE");
    console.log(payload);
  }, []);

  const realtimeOnDelete = useCallback((payload: RealtimePayload) => {
    setItems((state) => {
      if (state) {
        return state.filter((item) => item.id !== payload.old.id);
      }
      return state;
    });
  }, []);

  useEffect(() => {
    const subscription = supabase
      .from("inventory")
      .on("INSERT", realtimeOnInsert)
      .on("UPDATE", realtimeOnUpdate)
      .on("DELETE", realtimeOnDelete)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleDeleteItem = useCallback(async (currentItem: Item) => {
    try {
      const response = await window.Main.showMessageBox({
        options: {
          buttons: ["Não", "Sim"],
          title: "Encontrei",
          message: "Você realmente deseja excluir esse item?",
        },
      });
      if (response === 1) {
        await supabase
          .from("inventoryWithdraw")
          .delete()
          .match({ inventoryId: currentItem.id })
          .throwOnError();
        await deleteItemById({
          from: "inventory",
          id: currentItem.id,
          photoFilename: currentItem.photoFilename,
        });

        toast.success("Item excluído com sucesso");
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleDownload = useCallback(() => {
    if (items) {
      downloadCSV(items, "inventario");
    }
  }, [items]);

  return (
    <Container>
      <header>
        <h1>Inventário</h1>
        <div>
          <DownloadButton onClick={handleDownload} />
          <CreateItemDialog />
        </div>
      </header>
      {items ? (
        <Table
          body={items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{capitalizeFirstLetter(item.category)}</td>
              <td>{item.description}</td>
              <td>{capitalizeFirstLetter(item.local)}</td>
              <td>{item.date}</td>
              <td>{item.time}</td>
              <ImagePreview src={item.photo} name={item.name} />
              <DropdownMenu>
                <td>
                  <DropdownMenuTrigger aria-label="Options">
                    <BsThreeDots size={20} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent sideOffset={2}>
                    <DropdownMenuItem
                      onClick={() =>
                        toast.warn(
                          "Essa funcionalidade não está disponível no momento"
                        )
                      }
                    >
                      Editar
                      <BsPencil size={12} />
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={async () => await handleDeleteItem(item)}
                    >
                      Excluir
                      <BsTrash size={12} />
                    </DropdownMenuItem>
                    <DropdownMenuArrow />
                  </DropdownMenuContent>
                </td>
              </DropdownMenu>
            </tr>
          ))}
        />
      ) : (
        <SpinnerLoader size={48} />
      )}
    </Container>
  );
}
