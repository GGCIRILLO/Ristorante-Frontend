import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import type {
  OrdineCompleto,
  DettaglioPietanza,
  StatoOrdine,
} from "../../types";

interface PulsantieraOrdineProps {
  selectedOrdine: OrdineCompleto | null;
  selectedPietanza: DettaglioPietanza | null;
  localStato: StatoOrdine | null;
  onUpdateStato: (nuovoStato: StatoOrdine) => void;
  onOpenModal: () => void;
}

export const PulsantieraOrdine: FC<PulsantieraOrdineProps> = ({
  selectedOrdine,
  selectedPietanza,
  localStato,
  onUpdateStato,
  onOpenModal,
}) => {
  const navigate = useNavigate();

  // Determina lo stato dell'ordine da usare per i controlli di disabilitazione
  const statoEffettivo = localStato || selectedOrdine?.ordine.stato || null;

  return (
    <div className="flex flex-wrap gap-4 mt-auto">
      <button
        onClick={() => navigate(-1)}
        className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-medium"
      >
        ← Indietro
      </button>

      <button
        onClick={() => onUpdateStato("in_preparazione")}
        disabled={!selectedOrdine || statoEffettivo !== "confermato"}
        className={`px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded font-medium ${
          !selectedOrdine || statoEffettivo !== "confermato"
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
      >
        Inizia Preparazione
      </button>

      <button
        onClick={() => onUpdateStato("pronto")}
        disabled={!selectedOrdine || statoEffettivo !== "in_preparazione"}
        className={`px-5 py-2 bg-emerald-500 text-white rounded font-medium ${
          !selectedOrdine || statoEffettivo !== "in_preparazione"
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
      >
        Segna come Pronto
      </button>

      <button
        onClick={() => onUpdateStato("consegnato")}
        disabled={!selectedOrdine || statoEffettivo !== "pronto"}
        className={`px-5 py-2 bg-sky-300 text-gray-700 rounded font-medium ${
          !selectedOrdine || statoEffettivo !== "pronto"
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
      >
        Segna come Consegnato
      </button>

      <button
        onClick={onOpenModal}
        disabled={
          !selectedPietanza || selectedPietanza.pietanza.id_categoria === 7
        }
        className={`px-5 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded font-medium ${
          !selectedPietanza || selectedPietanza.pietanza.id_categoria === 7
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
      >
        Visualizza Dettagli
      </button>
    </div>
  );
};
