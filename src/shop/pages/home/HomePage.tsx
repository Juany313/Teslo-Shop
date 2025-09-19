import { CustomPagination } from "@/components/custom/CustomPagination"
import CustomJumbotron from "@/shop/components/CustomJumbotron"
import { ProductsGrid } from "@/shop/components/ProductsGrid"
import { useProducts } from "@/shop/hooks/useProducts"


export const HomePage = () => {
  const { data } = useProducts();
  
  


  return (
    <div className="flex flex-col min-h-screen">
      <CustomJumbotron title='Todos los productos' subTitle="" />

      <ProductsGrid products={data?.products || []} />

      {/* Sticky paginación */}
      <div className="sticky bottom-0 bg-white py-4 z-10 flex justify-center">
            <CustomPagination totalPages={ data?.pages || 0}  />
      </div>
    </div>
  )
}
