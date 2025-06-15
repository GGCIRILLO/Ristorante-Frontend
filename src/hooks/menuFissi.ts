import { useQuery } from "@tanstack/react-query";
import { getMenuFissi } from "../api/menuFissi";

export function useMenuFissi() {
  return useQuery({
    queryKey: ["menuFissi"],
    queryFn: getMenuFissi,
  });
}
