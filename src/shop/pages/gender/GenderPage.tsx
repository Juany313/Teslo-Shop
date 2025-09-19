import { CustomPagination } from "@/components/custom/CustomPagination"
import CustomJumbotron from "@/shop/components/CustomJumbotron"
import { ProductsGrid } from "@/shop/components/ProductsGrid"
import { useProducts } from "@/shop/hooks/useProducts"
import { useParams } from "react-router"


export const GenderPage = () => {

  const { data } = useProducts();

  const { gender } = useParams();

  const genderLabel = gender === 'men'
  ? 'Hombres'
  : gender === 'women'
  ? 'Mujeres'
  : 'Niños';

  return (
    <div className="flex flex-col min-h-screen">
      <CustomJumbotron title={`Productos para ${genderLabel}`} subTitle="" />

      <ProductsGrid products={data?.products || []} />


      <div className="sticky bottom-0 bg-white py-4 z-10 flex justify-center">
            <CustomPagination totalPages={ data?.pages || 0}  />
      </div>
    </div>
  )
}
