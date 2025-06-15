import type { FC } from "react";
import { useRicettaByPietanzaId } from "../../hooks/pietanze";

interface RicettaModalProps {
  isOpen: boolean;
  onClose: () => void;
  pietanzaId: number | undefined;
  nomePietanza: string;
}

export const RicettaModal: FC<RicettaModalProps> = ({
  isOpen,
  onClose,
  pietanzaId,
  nomePietanza,
}) => {
  // Hook per recuperare i dettagli della ricetta
  const { data: ricettaCompleta, isLoading } = useRicettaByPietanzaId(
    pietanzaId || 0
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          {isLoading
            ? "Caricamento..."
            : ricettaCompleta
            ? `Ricetta: ${ricettaCompleta.ricetta.nome}`
            : `Dettagli preparazione: ${nomePietanza}`}
        </h2>

        {isLoading ? (
          <div className="text-center py-4">Caricamento dettagli...</div>
        ) : ricettaCompleta ? (
          <div>
            <h3 className="font-semibold mb-2">Ingredienti:</h3>
            <ul className="list-disc ml-6 mb-4">
              {ricettaCompleta.ingredienti.map((item) => (
                <li key={item.ingrediente.id} className="mb-1">
                  {item.ingrediente.nome}: {item.quantita}{" "}
                  {item.ingrediente.unita_misura}
                </li>
              ))}
            </ul>

            {ricettaCompleta?.ricetta?.tempo_preparazione && (
              <p className="mb-2">
                <span className="font-semibold">Tempo di preparazione:</span>{" "}
                {ricettaCompleta.ricetta.tempo_preparazione} minuti
              </p>
            )}

            {ricettaCompleta?.ricetta?.istruzioni && (
              <>
                <h3 className="font-semibold mb-2">Istruzioni:</h3>
                <pre className="whitespace-pre-wrap bg-gray-50 p-3 rounded border border-gray-200 overflow-auto">
                  {ricettaCompleta?.ricetta?.istruzioni}
                </pre>
              </>
            )}
          </div>
        ) : (
          <div className="text-center py-4">
            Nessuna ricetta disponibile per questa pietanza.
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-800"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};
