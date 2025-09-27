import { tesloApi } from "@/api/tesloApi";



export const deleteProductAction = async (id: string) => {
  try {
    const { data } = await tesloApi.delete(`/products/${id}`);
    return data; 
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    throw error; // para que React Query capture el error
  }
}
