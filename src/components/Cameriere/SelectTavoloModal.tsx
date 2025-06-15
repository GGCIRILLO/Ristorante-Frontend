import { Fragment, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useCambiaStatoTavolo, useTavoliLiberi } from "../../hooks/tavoli";
import { useCreateOrdine } from "../../hooks/ordini";
import type { Tavolo } from "../../types";

interface SelectTavoloModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrdineCreato?: (ordineId: number) => void;
}

export const SelectTavoloModal: React.FC<SelectTavoloModalProps> = ({
  isOpen,
  onClose,
  onOrdineCreato,
}) => {
  const { data: tavoli, isLoading } = useTavoliLiberi();
  const createOrdineMutation = useCreateOrdine();
  const updateStatotavolo = useCambiaStatoTavolo();

  const [selectedTavolo, setSelectedTavolo] = useState<Tavolo | null>(null);
  const [numCoperti, setNumCoperti] = useState<number>(1);

  const isValid = selectedTavolo
    ? numCoperti > 0 && numCoperti <= selectedTavolo.max_posti
    : false;

  const handleCreateOrdine = async () => {
    if (!selectedTavolo || !isValid) return;

    try {
      const response = await createOrdineMutation.mutateAsync({
        id_tavolo: selectedTavolo.id,
        num_persone: numCoperti,
        id_ristorante: 1,
      });

      updateStatotavolo.mutate({
        idTavolo: selectedTavolo.id,
        nuovoStato: "occupato",
      });

      // Notifichiamo il componente genitore dell'ID dell'ordine creato
      if (onOrdineCreato) {
        onOrdineCreato(response.id);
      }

      // Chiudiamo la modale
      onClose();
    } catch (error) {
      console.error("Errore durante la creazione dell'ordine:", error);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Inizio Nuovo Ordine
                </DialogTitle>

                {isLoading ? (
                  <div className="mt-4 flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tavolo
                      </label>{" "}
                      <select
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        onChange={(e) => {
                          const tavoloId = parseInt(e.target.value);
                          const tavolo =
                            tavoli?.find((t) => t.id === tavoloId) || null;
                          setSelectedTavolo(tavolo);
                        }}
                        value={selectedTavolo?.id?.toString() || ""}
                      >
                        <option value="">Seleziona un tavolo</option>
                        {tavoli?.map((tavolo) => (
                          <option key={tavolo.id} value={String(tavolo.id)}>
                            Tavolo {tavolo.id} - ({tavolo.max_posti} posti)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Numero di Coperti
                      </label>
                      <input
                        type="number"
                        value={numCoperti}
                        onChange={(e) => {
                          const val = e.target.value;

                          const n = val.toString().replace(/^0+/, "");

                          const num = Number(n);
                          if (!Number.isNaN(num)) {
                            setNumCoperti(
                              selectedTavolo
                                ? Math.min(num, selectedTavolo.max_posti)
                                : num
                            );
                          }
                        }}
                        className="block w-full pl-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                      <button
                        type="button"
                        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        onClick={onClose}
                      >
                        Annulla
                      </button>
                      <button
                        type="button"
                        disabled={!isValid || createOrdineMutation.isPending}
                        className={`rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          isValid && !createOrdineMutation.isPending
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-blue-300 cursor-not-allowed"
                        }`}
                        onClick={handleCreateOrdine}
                      >
                        {createOrdineMutation.isPending
                          ? "Creazione..."
                          : "Inizia Ordine"}
                      </button>
                    </div>

                    {createOrdineMutation.isError && (
                      <div className="mt-4 p-2 bg-red-50 text-red-700 rounded-md text-sm">
                        Si è verificato un errore:{" "}
                        {createOrdineMutation.error.message}
                      </div>
                    )}
                  </div>
                )}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
