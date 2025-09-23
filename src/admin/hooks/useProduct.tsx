import { useQuery } from "@tanstack/react-query"
import { getProductByIdAction } from "../actions/get-product-by-id.action"



export const useProduct = (id: string) => {

    const query = useQuery({
        queryKey: ['Product', { id }],
        queryFn: () => getProductByIdAction(id),
        retry: false,
        staleTime: 1000 * 60 * 5, //5 minutos
    })

    //TODO: Manejar la mutación


  return {
    ...query
  }
}
