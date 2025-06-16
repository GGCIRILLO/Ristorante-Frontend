import type { FC } from "react";
import type { Scontrino } from "../../types";

interface ActionButtonsProps {
  selectedTavoloId: number | null;
  scontrino: Scontrino | undefined;
  onCalculateBill: () => void;
  onPrintBill: () => void;
  onRegisterPayment: () => void;
  onBack: () => void;
}

const ActionButtons: FC<ActionButtonsProps> = ({
  selectedTavoloId,
  scontrino,
  onCalculateBill,
  onPrintBill,
  onRegisterPayment,
  onBack,
}) => {
  return (
    <div className="flex flex-wrap gap-4 mt-6">
      <button
        onClick={onCalculateBill}
        disabled={!selectedTavoloId}
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Calcola Conto
      </button>

      <button
        onClick={onPrintBill}
        disabled={!scontrino}
        className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Stampa Conto
      </button>

      <button
        onClick={onRegisterPayment}
        disabled={!scontrino}
        className="px-6 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Registra Pagamento
      </button>

      <button
        onClick={onBack}
        className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
      >
        Indietro
      </button>
    </div>
  );
};

export default ActionButtons;
