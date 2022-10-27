import { useEffect, useState, useCallback } from "react";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";

import type {
  InventoryWithdrawAccepted,
  Item,
} from "@encontrei/@types/InventoryWithdrawAccepted";
import { Container } from "@encontrei/components/Container";
import { DownloadButton } from "@encontrei/components/DownloadButton";
import { ImagePreview } from "@encontrei/components/ImagePreview";
import { Modal } from "@encontrei/components/Modal";
import { SpinnerLoader } from "@encontrei/components/SpinnerLoader";
import { Table } from "@encontrei/components/Table";
import { capitalizeFirstLetter } from "@encontrei/utils/capitalizeFirstLetter";
import { getDisplayDateValues } from "@encontrei/utils/date";
import { downloadCSV } from "@encontrei/utils/downloadCSV";
import { getItems } from "@encontrei/utils/getItems";
import { getPublicUrl } from "@encontrei/utils/getPublicUrl";

async function fetchItems() {
  const data = await getItems<InventoryWithdrawAccepted>(
    "inventoryWithdrawAccepted",
    `
  *,
  user:userId ( email, raw_user_meta_data->name )
`
  );

  const itens =
    data?.map((item) => {
      const { displayDate, displayHour } = getDisplayDateValues(
        item.acceptedAt
      );

      return {
        ...item,
        date: displayDate,
        time: displayHour,
        photo: getPublicUrl("inventoryWithdrawAccepted/" + item.photoFilename),
      };
    }) ?? null;

  return itens;
}

export default function Found() {
  const [items, setItems] = useState<Item[] | null>(null);

  useEffect(() => {
    fetchItems()
      .then((data) => setItems(data))
      .catch(console.error);
  }, []);

  const handleDownload = useCallback(() => {
    if (items) {
      downloadCSV(items, "inventario");
    }
  }, [items]);

  return (
    <Container>
      <header>
        <h1>Entregues</h1>
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
