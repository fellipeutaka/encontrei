import { motion } from "framer-motion";

import { DownloadButton } from "@encontrei/components/DownloadButton";
import { SpinnerLoader } from "@encontrei/components/SpinnerLoader";
import { Table } from "@encontrei/components/Table";
import { useDelivered } from "@encontrei/hooks/useDelivered";

export function Delivered() {
  const { items, setItems, table, handleDownload } = useDelivered();

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <header className="flex min-w-[64rem] w-full max-w-7xl justify-between items-center opacity-0 animate-fade">
        <h1 className="text-6xl font-semibold">Entregues</h1>
        <div className="flex items-center gap-2">
          <DownloadButton
            disabled={!items ?? items?.length === 0}
            onClick={handleDownload}
          />
        </div>
      </header>
      {!items ? (
        <SpinnerLoader size={48} />
      ) : items.length === 0 ? (
        <motion.div
          className="min-w-[64rem] w-full max-w-7xl animate-fade"
          animate={{ y: 64 }}
        >
          <span className="text-2xl font-semibold">
            Não há nenhum item entregue
          </span>
        </motion.div>
      ) : (
        <Table items={items} setItems={setItems} table={table} />
      )}
    </main>
  );
}
