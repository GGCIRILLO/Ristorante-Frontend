import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  cambiaStatoTavolo,
  getTavoliLiberi,
  getTavoliOccupati,
} from "../api/tavoli";
import type { Tavolo } from "../types";

export function useTavoliLiberi() {
  return useQuery<Tavolo[], Error>({
    queryKey: ["tavoliLiberi"],
    queryFn: getTavoliLiberi,
  });
}

export function useTavoliOccupati() {
  return useQuery<Tavolo[], Error>({
    queryKey: ["tavoliOccupati"],
    queryFn: () => getTavoliOccupati(),
  });
}

export function useCambiaStatoTavolo() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({
      idTavolo,
      nuovoStato,
    }: {
      idTavolo: number;
      nuovoStato: "libero" | "occupato";
    }) => cambiaStatoTavolo(idTavolo, nuovoStato),
    onSuccess: () => {
      // Invalidate and refetch
      client.invalidateQueries({ queryKey: ["tavoliLiberi"] });
      client.invalidateQueries({ queryKey: ["tavoliOccupati"] });
      client.invalidateQueries({ queryKey: ["ordineCorrente"] });
      client.invalidateQueries({ queryKey: ["ordini"] });
      client.invalidateQueries({ queryKey: ["scontrino"] });
    },
  });
}
