import { useEffect, useState, useCallback } from "react";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";
import { toast } from "react-toastify";

import type { Inventory } from "@encontrei/@types/Inventory";
import type { InventoryFound, Item } from "@encontrei/@types/InventoryFound";
import { Container } from "@encontrei/components/Container";
import { DownloadButton } from "@encontrei/components/DownloadButton";
import { ImagePreview } from "@encontrei/components/ImagePreview";
import { Modal } from "@encontrei/components/Modal";
import { SpinnerLoader } from "@encontrei/components/SpinnerLoader";
import { Table } from "@encontrei/components/Table";
import { supabase } from "@encontrei/lib/supabase";
import { capitalizeFirstLetter } from "@encontrei/utils/capitalizeFirstLetter";
import { getDisplayDateValues } from "@encontrei/utils/date";
import { deleteItemById } from "@encontrei/utils/deleteItemById";
import { downloadCSV } from "@encontrei/utils/downloadCSV";
import { getItems } from "@encontrei/utils/getItems";
import { getPublicUrl } from "@encontrei/utils/getPublicUrl";
import { handleScape } from "@encontrei/utils/handleScape";
import { moveFile } from "@encontrei/utils/moveFile";

async function fetchItems() {
  const data = await getItems<InventoryFound>(
    "inventoryFound",
    `
  *,
  user:userId ( email, raw_user_meta_data->name )
`
  );

  const items =
    data?.map((item) => {
      const { displayDate, displayHour } = getDisplayDateValues(item.foundAt);

      return {
        ...item,
        date: displayDate,
        time: displayHour,
        photo: getPublicUrl("inventoryFound/" + item.photoFilename),
      };
    }) ?? null;

  return items;
}

export default function Found() {
  const [items, setItems] = useState<Item[] | null>(null);

  useEffect(() => {
    fetchItems()
      .then((data) => setItems(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const subscription = supabase
      .from<InventoryFound>("inventoryFound")
      .on("INSERT", async (payload) => {
        try {
          const { data } = await supabase
            .from("users")
            .select("email, raw_user_meta_data->name")
            .match({ id: payload.new.userId })
            .throwOnError();
          if (data) {
            setItems((state) => {
              const { displayDate, displayHour } = getDisplayDateValues(
                payload.new.foundAt
              );
              const newItem = {
                ...payload.new,
                user: {
                  ...data[0],
                },
                date: displayDate,
                time: displayHour,
                photo: getPublicUrl(
                  `inventoryFound/${payload.new.photoFilename}`
                ),
              };
              if (state) {
                return [...state, newItem];
              }
              return state;
            });
          }
        } catch (err) {
          console.error(err);
        }
      })
      .on("DELETE", (payload) => {
        setItems((state) => {
          if (state) {
            return state.filter((item) => item.id !== payload.old.id);
          }
          return state;
        });
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleAcceptItem = useCallback(async (currentItem: Item) => {
    try {
      const response = await window.Main.showMessageBox({
        options: {
          buttons: ["Não", "Sim"],
          title: "Encontrei",
          message: "Você realmente deseja aceitar esse item?",
        },
      });
      if (response === 1) {
        await supabase
          .from<Inventory>("inventory")
          .insert({
            name: currentItem.name,
            description: currentItem.description,
            category: currentItem.category,
            local: currentItem.local,
            photoFilename: currentItem.photoFilename,
          })
          .throwOnError();

        await supabase
          .from<Inventory>("inventoryFound")
          .delete()
          .match({ id: currentItem.id })
          .throwOnError();

        await deleteItemById({
          from: "inventoryFound",
          id: currentItem.id,
        });

        await moveFile({
          from: "inventoryFound/" + currentItem.photoFilename,
          to: "inventory/" + currentItem.photoFilename,
        });
        handleScape();
        toast.success("Item aceito com sucesso!");
      }
    } catch (err) {
      toast.error("Ocorreu um erro ao aceitar o item!");
      console.error(err);
    }
  }, []);

  const handleRefuseItem = useCallback(async (currentItem: Item) => {
    try {
      const response = await window.Main.showMessageBox({
        options: {
          buttons: ["Não", "Sim"],
          title: "Encontrei",
          message: "Você realmente deseja recusar esse item?",
        },
      });
      if (response === 1) {
        await supabase
          .from<Inventory>("inventoryFound")
          .delete()
          .match({ id: currentItem.id })
          .throwOnError();

        const { error } = await supabase.storage
          .from("item-photo")
          .remove(["inventoryFound/" + currentItem.photoFilename]);

        if (error) throw error;
        handleScape();
        toast.success("Item recusado com sucesso!");
      }
    } catch (err) {
      toast.error("Ocorreu um erro ao recusar o item!");
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
        <h1>Encontrados</h1>
        <DownloadButton onClick={handleDownload} />
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
              <Modal
                content={
                  <>
                    <h1>{item.name}</h1>
                    <img src={item.photo} alt={item.name} />
                    <h2>{item.description}</h2>
                    <div>
                      <BiCategory size={20} />
                      <h2>{capitalizeFirstLetter(item.category)}</h2>
                    </div>
                    <div>
                      <IoLocationOutline size={20} />
                      <h2>{capitalizeFirstLetter(item.local)}</h2>
                    </div>
                    <div>
                      <AiOutlineUser size={20} />
                      <h2>{item.user.name}</h2>
                    </div>
                    <div>
                      <AiOutlineMail size={20} />
                      <h2>{item.user.email}</h2>
                    </div>
                    <div className="buttons">
                      <button
                        onClick={async () => await handleRefuseItem(item)}
                      >
                        Recusar
                      </button>
                      <button
                        onClick={async () => await handleAcceptItem(item)}
                      >
                        Aceitar
                      </button>
                    </div>
                  </>
                }
              />
            </tr>
          ))}
        />
      ) : (
        <SpinnerLoader size={48} />
      )}
    </Container>
  );
}
