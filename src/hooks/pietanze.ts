import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPietanze,
  aggiungiPietanzaOrdine,
  aggiungiMenuFissoOrdine,
  getRicettaCompleta,
  addBevandaOrdine,
} from "../api/pietanze";

export function usePietanze() {
  return useQuery({
    queryKey: ["pietanze"],
    queryFn: getPietanze,
  });
}

export function useAggiungiPietanzaOrdine() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      idOrdine,
      idPietanza,
      quantita,
    }: {
      idOrdine: string | number;
      idPietanza: number;
      quantita: number;
    }) => aggiungiPietanzaOrdine(idOrdine, idPietanza, quantita),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["ordineCorrente"] });
      queryClient.invalidateQueries({ queryKey: ["ingredientiDaRiordinare"] });
      queryClient.invalidateQueries({ queryKey: ["ingredienti"] });
    },
  });
}

export function useAggiungiMenuFissoOrdine() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      idOrdine,
      idMenuFisso,
    }: {
      idOrdine: string | number;
      idMenuFisso: number;
    }) => aggiungiMenuFissoOrdine(idOrdine, idMenuFisso),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["ordineCorrente"] });
      queryClient.invalidateQueries({ queryKey: ["ingredientiDaRiordinare"] });
      queryClient.invalidateQueries({ queryKey: ["ingredienti"] });
    },
  });
}

export function useAggiungiBevandaOrdine() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      idOrdine,
      idPietanza,
      quantita,
    }: {
      idOrdine: string | number;
      idPietanza: number;
      quantita: number;
    }) => addBevandaOrdine(idOrdine, idPietanza, quantita),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["ordineCorrente"] });
      queryClient.invalidateQueries({ queryKey: ["ingredientiDaRiordinare"] });
      queryClient.invalidateQueries({ queryKey: ["ingredienti"] });
    },
  });
}

export function useRicettaByPietanzaId(id: number | string) {
  return useQuery({
    queryKey: ["ricetta", id],
    queryFn: () => getRicettaCompleta(id),
    enabled: !!id, // Only fetch if id is defined
  });
}
