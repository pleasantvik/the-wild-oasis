import { useQuery } from "@tanstack/react-query";
import { getCabins } from "src/services/apiCabins";

export const useGetCabin = () => {
  const {
    data: cabins,
    isLoading,
    // error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { cabins, isLoading };
};
