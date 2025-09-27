import { AdminTitle } from "@/admin/components/AdminTitle"
import { CustomFullScreenLoading } from "@/components/custom/CustomFullScreenLoading"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { Button } from "@/components/ui/button"
import { Table, TableHead,TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { currencyFormatter } from "@/lib/currency-formatter";

import { useProducts } from "@/shop/hooks/useProducts"
import { PencilIcon, PlusIcon } from "lucide-react"
import { Link } from "react-router"
import { DeleteButton } from "./components/DeleteProductButton";

export const AdminProductsPage = () => {

  const { data, isLoading, deleteMutation } = useProducts();

  if( isLoading ) {
    return <CustomFullScreenLoading/>
  }

  return (
    <>

      <div className="flex justify-between items-center">

        <AdminTitle 
          title="Productos"
          subtitle="Aquí puedes ver y administrar tus productos"
        />

        <div className="flex justify-end mb-10 gap-4">
          <Link to={`/admin/products/new`}>
            <Button>
              <PlusIcon />
              Nuevo Producto
            </Button>
          </Link>
        </div>
      </div>

      <Table className="bg-white p-10 shadow-xs border border-gray-200 mb-10">
        <TableHeader>
          <TableRow>
            <TableHead>Imagen</TableHead>
            <TableHead>Nombre</TableHead>      
            <TableHead>Precio</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Inventario</TableHead>
            <TableHead>Tallas</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            data?.products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img
                    src={ product.images[0] }
                    alt={ product.title }
                    className="w-20 h-20 object-cover rounded-md"
                  />
                </TableCell>
                <TableCell>
                  <Link 
                    to={`/admin/products/${ product.id }`}
                    className="hover:text-blue-500"
                  >
                    {product.title}
                  </Link>
                </TableCell>
                <TableCell>{ currencyFormatter(product.price) }</TableCell>
                <TableCell>{ product.gender }</TableCell>
                <TableCell>{ product.stock }</TableCell>
                <TableCell>{ product.sizes.join(', ') }</TableCell>
               <TableCell className="text-right flex justify-end gap-2">
                {/* Editar */}
                <Link to={`/admin/products/${product.id}`}>
                  <PencilIcon className="w-4 h-4 text-blue-500" />
                </Link>

                {/* Eliminar */}
                <DeleteButton productId={product.id} deleteMutation={deleteMutation} />
              </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>

      {/* Sticky paginación */}
      <div className="sticky bottom-0 bg-white py-4 z-10 flex justify-center">
            <CustomPagination totalPages={ data?.pages || 0}  />
      </div>
    </>
  )
}
