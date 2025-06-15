import { useQuery } from "@tanstack/react-query";
import { getRistoranti } from "../api/ristorante";

export function useRistorante() {
  return useQuery({
    queryKey: ["ristorante"],
    queryFn: getRistoranti,
  });
}
