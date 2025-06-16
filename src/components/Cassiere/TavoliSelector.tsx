import type { FC } from "react";
import { useTavoliOccupati } from "../../hooks/tavoli";

interface TavoliSelectorProps {
  selectedTavoloId: number | null;
  onSelectTavolo: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const TavoliSelector: FC<TavoliSelectorProps> = ({
  selectedTavoloId,
  onSelectTavolo,
}) => {
  // Fetch occupied tables
  const { data: tavoliOccupati, isLoading: loadingTavoli } =
    useTavoliOccupati();

  return (
    <div className="mb-6">
      <label
        htmlFor="tavolo"
        className="block text-lg font-medium text-gray-700 mb-2"
      >
        Seleziona un tavolo occupato:
      </label>
      <select
        id="tavolo"
        className="w-full max-w-md p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={selectedTavoloId || ""}
        onChange={onSelectTavolo}
        disabled={loadingTavoli}
      >
        <option value="">-- Seleziona un tavolo --</option>
        {tavoliOccupati?.map((tavolo) => (
          <option key={tavolo.id} value={tavolo.id}>
            Tavolo {tavolo.id} ({tavolo.max_posti} posti)
          </option>
        ))}
      </select>
    </div>
  );
};

export default TavoliSelector;
