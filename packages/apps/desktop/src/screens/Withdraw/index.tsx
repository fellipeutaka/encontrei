import { useEffect, useState, useCallback } from "react";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";
import { toast } from "react-toastify";

import type {
  InventoryWithdraw,
  Item,
} from "@encontrei/@types/InventoryWithdraw";
import type { InventoryWithdrawAccepted } from "@encontrei/@types/InventoryWithdrawAccepted";
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
import { moveFile } from "@encontrei/utils/moveFile";

async function fetchItems() {
  const data = await getItems<InventoryWithdraw>(
    "inventoryWithdraw",
    `
  id,
  requestedAt,
  user:userId ( id, email, raw_user_meta_data->name ),
  inventory:inventoryId ( * )
`
  );

  const items =
    data?.map((item) => {
      const { displayDate, displayHour } = getDisplayDateValues(
        item.requestedAt
      );

      return {
        ...item,
        inventory: {
          ...item.inventory,
          date: displayDate,
          time: displayHour,
          photo: getPublicUrl("inventory/" + item.inventory.photoFilename),
        },
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

  const handleAcceptItem = useCallback(
    async ({
      id,
      user: { id: userId },
      inventory: {
        id: inventoryId,
        name,
        description,
        category,
        local,
        photoFilename,
      },
    }: Item) => {
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
            .from<InventoryWithdrawAccepted>("inventoryWithdrawAccepted")
            .insert({
              name,
              description,
              category,
              local,
              photoFilename,
              userId,
            })
            .throwOnError();
          await supabase
            .from<InventoryWithdraw>("inventoryWithdraw")
            .delete()
            .match({ inventoryId })
            .throwOnError();

          await deleteItemById({
            from: "inventory",
            id: inventoryId,
          });
          await deleteItemById({
            from: "inventoryWithdraw",
            id,
          });

          await moveFile({
            from: "inventory/" + photoFilename,
            to: "inventoryWithdrawAccepted/" + photoFilename,
          });

          toast.success("Solicitação aceita com sucesso!");
        }
      } catch (err) {
        toast.success("Ocorreu um erro ao aceitar a solicitação!");
        console.error(err);
      }
    },
    []
  );

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
        await deleteItemById({
          from: "inventoryWithdraw",
          id: currentItem.id,
        });

        toast.success("Solicitação recusada com sucesso!");
      }
    } catch (err) {
      toast.error("Ocorreu um erro ao recusar a solicitação!");
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
        <h1>Solicitados</h1>
        <DownloadButton onClick={handleDownload} />
      </header>
      {items ? (
        <Table
          body={items.map((item) => (
            <tr key={item.id}>
              <td>{item.inventory.name}</td>
              <td>{capitalizeFirstLetter(item.inventory.category)}</td>
              <td>{item.inventory.description}</td>
              <td>{capitalizeFirstLetter(item.inventory.local)}</td>
              <td>{item.inventory.date}</td>
              <td>{item.inventory.time}</td>
              <ImagePreview
                src={item.inventory.photo}
                name={item.inventory.name}
              />
              <Modal
                content={
                  <>
                    <h1>{item.inventory.name}</h1>
                    <img src={item.inventory.photo} alt={item.inventory.name} />
                    <h2>{item.inventory.description}</h2>
                    <div>
                      <BiCategory size={20} />
                      <h2>{capitalizeFirstLetter(item.inventory.category)}</h2>
                    </div>
                    <div>
                      <IoLocationOutline size={20} />
                      <h2>{capitalizeFirstLetter(item.inventory.local)}</h2>
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
                      <button onClick={async () => await handleRefuseItem(item)}>
                        Recusar
                      </button>
                      <button onClick={async () => await handleAcceptItem(item)}>
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
