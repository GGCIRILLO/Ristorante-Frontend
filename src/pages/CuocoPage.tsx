import { useState, useEffect } from "react";
import type { FC } from "react";
import { useOrdini, useUpdateOrdine } from "../hooks/ordini";
import type { OrdineCompleto, DettaglioPietanza, StatoOrdine } from "../types";
import { RicettaModal } from "../components/Cuoco/RicettaModal";
import { OrdiniDaPreparare } from "../components/Cuoco/OrdiniDaPreparare";
import { DettaglioOrdine } from "../components/Cuoco/DettaglioOrdine";
import { PulsantieraOrdine } from "../components/Cuoco/PulsantieraOrdine";

const CuocoPage: FC = () => {
  const { data: ordini, isLoading } = useOrdini();
  const updateOrdineMutation = useUpdateOrdine();

  // Stati per la gestione della UI
  const [selectedOrdine, setSelectedOrdine] = useState<OrdineCompleto | null>(
    null
  );
  const [selectedPietanza, setSelectedPietanza] =
    useState<DettaglioPietanza | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Stato locale per gestire l'aggiornamento immediato dell'UI
  const [localStato, setLocalStato] = useState<StatoOrdine | null>(null);

  // Aggiorna lo stato locale quando viene selezionato un nuovo ordine
  useEffect(() => {
    if (selectedOrdine) {
      setLocalStato(selectedOrdine.ordine.stato);
    } else {
      setLocalStato(null);
    }
  }, [selectedOrdine]);

  // Filtriamo gli ordini escludendo quelli pagati e in attesa
  const ordiniDaPreparare =
    ordini?.filter((ordine) => ordine.ordine.stato !== "in_attesa") || [];

  // Funzione per selezionare un ordine
  const handleSelectOrdine = (ordine: OrdineCompleto) => {
    setSelectedOrdine(ordine);
    setSelectedPietanza(null); // Reset della pietanza selezionata quando si cambia ordine
    setLocalStato(ordine.ordine.stato); // Reset dello stato locale
  };

  // Funzione per selezionare una pietanza
  const handleSelectPietanza = (pietanza: DettaglioPietanza) => {
    setSelectedPietanza(pietanza);
  };

  // Funzione per aggiornare lo stato dell'ordine
  const handleUpdateStato = (nuovoStato: StatoOrdine) => {
    if (!selectedOrdine) return;

    // Aggiorna immediatamente lo stato locale per l'UI
    setLocalStato(nuovoStato);

    // Invia l'aggiornamento al server
    updateOrdineMutation.mutate({
      id: selectedOrdine.ordine.id,
      payload: { stato: nuovoStato },
    });

    // Quando un ordine viene contrassegnato come consegnato, resetta l'ordine selezionato
    if (nuovoStato === "consegnato") {
      setSelectedOrdine(null);
      setSelectedPietanza(null);
      setLocalStato(null);
    }
  };

  // Funzione per formattare la data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  // Funzione per determinare la categoria di pietanza
  const getPietanzaTipo = (pietanza: DettaglioPietanza) => {
    if (pietanza.parte_di_menu) {
      return "Menu Fisso";
    }
    return "Singola";
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="top-0 z-10 h-16 bg-[#0080c8] flex items-center shadow-md px-4">
        <button
          className="text-white font-bold text-lg"
          onClick={() => (window.location.href = "/")}
        >
          GESTIONE RISTORANTE - Cucina
        </button>
      </header>

      <main className="container mx-auto py-8 px-4 flex flex-col h-[calc(100vh-64px)]">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Gestione Preparazione
        </h1>

        {/* Sezione Ordini da Preparare */}
        <OrdiniDaPreparare
          ordiniDaPreparare={ordiniDaPreparare}
          isLoading={isLoading}
          selectedOrdine={selectedOrdine}
          onSelectOrdine={handleSelectOrdine}
          formatDate={formatDate}
        />

        {/* Sezione Dettaglio Ordine Selezionato */}
        <DettaglioOrdine
          selectedOrdine={selectedOrdine}
          selectedPietanza={selectedPietanza}
          onSelectPietanza={handleSelectPietanza}
          getPietanzaTipo={getPietanzaTipo}
        />

        {/* Pulsantiera in basso */}
        <PulsantieraOrdine
          selectedOrdine={selectedOrdine}
          selectedPietanza={selectedPietanza}
          localStato={localStato}
          onUpdateStato={handleUpdateStato}
          onOpenModal={() => setIsModalOpen(true)}
        />
      </main>

      {/* Modale "Dettagli di Preparazione" */}
      <RicettaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pietanzaId={selectedPietanza?.pietanza.id}
        nomePietanza={selectedPietanza?.pietanza.nome || ""}
      />
    </div>
  );
};

export default CuocoPage;
