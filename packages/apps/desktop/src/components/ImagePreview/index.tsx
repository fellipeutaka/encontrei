import { BsDownload } from "react-icons/bs";
import { FaRegCopy } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { toast } from "react-toastify";

import {
  Container,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from "./styles";

interface ImagePreviewProps {
  src: string;
  name: string;
}

export function ImagePreview({ src, name }: ImagePreviewProps) {
  async function handleDownloadImage() {
    const response = await fetch(src);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const htmlAElement = document.createElement("a");
    htmlAElement.href = url;
    htmlAElement.download = `${name}.jpg`;
    htmlAElement.click();
  }

  function handleOpenImage() {
    console.log(window.Main);
    window.Main.openExternal(src);
  }

  function handleCopyImageLink() {
    try {
      window.Main.copyText(src);
      toast.success("Copiado com sucesso!", {
        autoClose: 2000,
      });
    } catch (err) {
      console.log(err);
      toast.error(
        "Ocorreu um erro ao tentar copiar o link para a área de transferência!"
      );
    }
  }

  const ContextContent = () => (
    <ContextMenuContent>
      <ContextMenuItem onClick={handleOpenImage}>
        Abrir no navegador <TbWorld />
      </ContextMenuItem>
      <ContextMenuItem onClick={handleCopyImageLink}>
        Copiar link <FaRegCopy />
      </ContextMenuItem>
      <ContextMenuItem onClick={handleDownloadImage}>
        Download <BsDownload />
      </ContextMenuItem>
    </ContextMenuContent>
  );

  return (
    <Container>
      <td>
        <ContextMenu>
          <ContextMenuTrigger>
            <DialogTrigger>
              <img src={src} alt={name} />
            </DialogTrigger>
          </ContextMenuTrigger>
          <ContextContent />
        </ContextMenu>
        <DialogOverlay />
        <DialogContent>
          <ContextMenu>
            <ContextMenuTrigger>
              <img src={src} alt={name} />
            </ContextMenuTrigger>
            <ContextContent />
          </ContextMenu>
        </DialogContent>
      </td>
    </Container>
  );
}
