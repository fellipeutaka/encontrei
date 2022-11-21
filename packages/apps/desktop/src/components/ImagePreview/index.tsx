import { forwardRef } from "react";
import { BsDownload } from "react-icons/bs";
import { FaRegCopy } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { toast } from "react-toastify";

import * as Context from "@radix-ui/react-context-menu";
import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";

interface ImagePreviewProps {
  src: string;
  name: string;
}

const ContextItem = (props: Context.ContextMenuItemProps) => (
  <Context.Item
    className="flex justify-between items-center h-6 gap-4 px-1.5 text-sm rounded select-none outline-none transition-colors data-[highlighted]:bg-violet-600"
    {...props}
  />
);

const ContextMenuContent = motion(Context.Content);
const DialogContent = motion(Dialog.Content);

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
    window.Main.openExternal(src);
  }

  function handleCopyImageLink() {
    try {
      window.Main.copyText(src);
      toast.success("Copiado com sucesso!", {
        autoClose: 2000,
      });
    } catch (err) {
      console.error(err);
      toast.error(
        "Ocorreu um erro ao tentar copiar o link para a área de transferência!"
      );
    }
  }

  const ContextContent = forwardRef(() => (
    <ContextMenuContent
      initial={{ y: 4 }}
      animate={{ y: 0 }}
      className="min-w-[160px] bg-zinc-900 text-zinc-200 rounded-md p-1.5 shadow-md"
    >
      <ContextItem onClick={handleOpenImage}>
        Abrir no navegador <TbWorld />
      </ContextItem>
      <ContextItem onClick={handleCopyImageLink}>
        Copiar link <FaRegCopy />
      </ContextItem>
      <ContextItem onClick={handleDownloadImage}>
        Download <BsDownload />
      </ContextItem>
    </ContextMenuContent>
  ));

  return (
    <Dialog.Root>
      <Context.Root>
        <Context.Trigger>
          <Dialog.Trigger className="flex w-full justify-center items-center outline-none transition ring-zinc-400 hover:opacity-70 focus-visible:ring-2">
            <img src={src} alt={name} className="w-12 h-12 rounded-full" />
          </Dialog.Trigger>
        </Context.Trigger>
        <Context.Portal>
          <ContextContent />
        </Context.Portal>
      </Context.Root>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 fixed inset-0 opacity-0 animate-fade" />
        <DialogContent
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ translateX: "-50%", translateY: "-50%" }}
          className="fixed top-1/2 left-1/2 outline-none w-64 h-64"
        >
          <Context.Root>
            <Context.Trigger>
              <img src={src} alt={name} className="rounded-md" />
            </Context.Trigger>
            <ContextContent />
          </Context.Root>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
