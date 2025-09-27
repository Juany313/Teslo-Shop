import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getProductByIdAction } from "../actions/get-product-by-id.action"
import type { Product } from "@/interfaces/product.interface"
import { CreateUpdateProductAction } from "../actions/create-update-product.action"



export const useProduct = (id: string) => {


  const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['product', { id }],
        queryFn: () => getProductByIdAction(id),
        retry: false,
        staleTime: 1000 * 60 * 5, //5 minutos
    })

  // Mutación
  const mutation = useMutation({
    mutationFn: CreateUpdateProductAction,
    onSuccess: (product: Product) => {
      console.log('Todo salió bien!', product);

      // Invalidar lista completa de productos
      queryClient.invalidateQueries({ queryKey: ['products'] });

      // Invalidar el producto actualizado
      queryClient.invalidateQueries({ queryKey: ['product', {id: product.id}] });

      // O actualizarlo directamente en caché
      queryClient.setQueryData(['products', {id: product.id}], product);
    },
  });



  return {
    ...query,
    mutation
  }
}
