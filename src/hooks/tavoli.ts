import { useMutation, useQuery } from "@tanstack/react-query";
import { cambiaStatoTavolo, getTavoliLiberi } from "../api/tavoli";
import type { Tavolo } from "../types";

export function useTavoliLiberi() {
  return useQuery<Tavolo[], Error>({
    queryKey: ["tavoliLiberi"],
    queryFn: getTavoliLiberi,
  });
}

export function useCambiaStatoTavolo() {
  return useMutation({
    mutationFn: ({
      idTavolo,
      nuovoStato,
    }: {
      idTavolo: number;
      nuovoStato: "libero" | "occupato";
    }) => cambiaStatoTavolo(idTavolo, nuovoStato),
  });
}
