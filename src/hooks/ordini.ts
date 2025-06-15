import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrdine } from "../api/ordini";
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
