import { useQuery } from "@tanstack/react-query";
import { getIngredienteDaRiordinare, getIngredienti } from "../api/ingredienti";

export function useIngredientiDaRiordinare() {
  return useQuery({
    queryKey: ["ingredientiDaRiordinare"],
    queryFn: getIngredienteDaRiordinare,
  });
}

export function useIngredienti() {
  return useQuery({
    queryKey: ["ingredienti"],
    queryFn: getIngredienti,
  });
}
