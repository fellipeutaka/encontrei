import { motion } from "framer-motion";

import { CreateItemDialog } from "@encontrei/components/CreateItemDialog";
import { DeleteButton } from "@encontrei/components/DeleteButton";
import { DownloadButton } from "@encontrei/components/DownloadButton";
import { SpinnerLoader } from "@encontrei/components/SpinnerLoader";
import { Table } from "@encontrei/components/Table";
import { useInventory } from "@encontrei/hooks/useInventory";

export function Inventory() {
  const {
    response,
    mutate,
    isLoading,
    error,
    table,
    handleDeleteItem,
    handleDownload,
  } = useInventory();

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <header className="flex min-w-[64rem] w-full max-w-7xl justify-between items-center opacity-0 animate-fade">
        <h1 className="text-6xl font-semibold">Inventário</h1>
        <div className="flex items-center gap-2">
          <DownloadButton
            disabled={!response || response?.data.length === 0}
            onClick={handleDownload}
          />
          <CreateItemDialog />
          <DeleteButton
            disabled={table.getSelectedRowModel().flatRows.length === 0}
            onClick={handleDeleteItem}
          />
        </div>
      </header>
      {isLoading ? (
        <SpinnerLoader size={48} />
      ) : response?.data.length === 0 ? (
        <motion.div
          className="min-w-[64rem] w-full max-w-7xl animate-fade"
          animate={{ y: 64 }}
        >
          <span className="text-2xl font-semibold">
            Não há nenhum item no inventário
          </span>
        </motion.div>
      ) : (
        <Table items={response?.data ?? []} setItems={mutate} table={table} />
      )}
    </main>
  );
}
