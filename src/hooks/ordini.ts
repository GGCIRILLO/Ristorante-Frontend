import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createOrdine, getOrdineCompleto, getOrdini } from "../api/ordini";
import type { Ordine } from "../types";

interface CreateOrdinePayload {
  id_tavolo: number;
  num_persone: number;
  id_ristorante: number;
}

export function useCreateOrdine() {
  const client = useQueryClient();
  return useMutation<Ordine, Error, CreateOrdinePayload>({
    mutationFn: createOrdine,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["ordini"] });
      client.invalidateQueries({ queryKey: ["tavoliLiberi"] });
    },
  });
}

export function useOrdini() {
  return useQuery({
    queryKey: ["ordini"],
    queryFn: getOrdini,
  });
}

export function useOrdineById(id: number | string) {
  return useQuery({
    queryKey: ["ordineCorrente"],
    queryFn: () => getOrdineCompleto(id),
    enabled: !!id, // Only fetch if id is defined
  });
}
