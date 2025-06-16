import { useState } from "react";
import type { FC } from "react";
import { useScontrinoByTavolo, useOrdineById } from "../hooks/ordini";
import { useQueryClient } from "@tanstack/react-query";
import { useCambiaStatoTavolo } from "../hooks/tavoli";
import { updateOrdine } from "../api/ordini";
import TavoliSelector from "../components/Cassiere/TavoliSelector";
import ActionButtons from "../components/Cassiere/ActionButtons";
import ScontrinoDetails from "../components/Cassiere/ScontrinoDetails";
import { useNavigate } from "react-router-dom";

const CassierePage: FC = () => {
  const navigate = useNavigate();
  const [selectedTavoloId, setSelectedTavoloId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  // Variabili utilizzate dai componenti

  // Fetch bill for selected table
  const {
    data: scontrino,
    isLoading: loadingScontrino,
    refetch: refetchScontrino,
  } = useScontrinoByTavolo(selectedTavoloId || 0);

  // Fetch order details using id_ordine from scontrino
  const { data: ordineCompleto, isLoading: loadingOrdine } = useOrdineById(
    scontrino?.id_ordine || 0
  );

  // Mutation to change table status
  const { mutate: cambiaStatoTavolo } = useCambiaStatoTavolo();

  // Handle table selection
  const handleSelectTavolo = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = parseInt(e.target.value);
    setSelectedTavoloId(id || null);
  };

  // Handle calculate bill (refetch)
  const handleCalculateBill = () => {
    if (selectedTavoloId) {
      refetchScontrino();
      // Ricaricherà automaticamente anche ordineCompleto quando scontrino cambia
      queryClient.invalidateQueries({ queryKey: ["ordineCorrente"] });
    }
  };

  // Handle print bill
  const handlePrintBill = () => {
    if (scontrino) {
      window.print();
    }
  };

  // Handle register payment
  const handleRegisterPayment = async () => {
    if (!scontrino || !selectedTavoloId) return;

    try {
      // Update order status to paid
      await updateOrdine(scontrino.id_ordine, { stato: "pagato" });

      // Mark table as free
      cambiaStatoTavolo({
        idTavolo: selectedTavoloId,
        nuovoStato: "libero",
      });

      // Refetch scontrino after payment
      queryClient.invalidateQueries({ queryKey: ["scontrino"] });

      // Reset selection
      setSelectedTavoloId(null);

      // Show success message
      alert("Pagamento registrato con successo!");
    } catch (error) {
      console.error("Errore durante la registrazione del pagamento:", error);
      alert("Errore durante la registrazione del pagamento. Riprova.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col max-h-screen overflow-hidden">
      <header className="flex-none top-0 z-10 h-16 bg-[#0080c8] flex items-center shadow-md px-4">
        <button
          onClick={() => navigate("/")}
          className="text-white font-bold text-lg mr-4"
        >
          GESTIONE RISTORANTE - Cassiere
        </button>
      </header>

      <main className="flex-grow container mx-auto py-8 px-4 flex flex-col overflow-hidden">
        <h1 className="flex-none text-3xl font-bold text-gray-800 mb-6">
          Gestione Cassa
        </h1>

        {/* Table selection dropdown */}
        <TavoliSelector
          selectedTavoloId={selectedTavoloId}
          onSelectTavolo={handleSelectTavolo}
        />

        {/* Bill display with scrollable content */}
        <div className="flex-grow overflow-hidden">
          <ScontrinoDetails
            selectedTavoloId={selectedTavoloId}
            scontrino={scontrino}
            ordineCompleto={ordineCompleto}
            loadingScontrino={loadingScontrino}
            loadingOrdine={loadingOrdine}
          />
        </div>

        {/* Action buttons */}
        <ActionButtons
          selectedTavoloId={selectedTavoloId}
          scontrino={scontrino}
          onCalculateBill={handleCalculateBill}
          onPrintBill={handlePrintBill}
          onRegisterPayment={handleRegisterPayment}
          onBack={() => window.history.back()}
        />
      </main>
    </div>
  );
};

export default CassierePage;
