import { AdminTitle } from "@/admin/components/AdminTitle"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { Button } from "@/components/ui/button"
import * as table from "@/components/ui/table"
import { PlusIcon } from "lucide-react"
import { Link } from "react-router"

export const AdminProductsPage = () => {
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

      <table.Table className="bg-white p-10 shadow-xs border border-gray-200 mb-10">
        <table.TableHeader>
          <table.TableRow>
            <table.TableHead className="w-[100px]">ID</table.TableHead>
            <table.TableHead>Imagen</table.TableHead>
            <table.TableHead>Nombre</table.TableHead>
            <table.TableHead>Precio</table.TableHead>
            <table.TableHead>Categoría</table.TableHead>
            <table.TableHead>Inventario</table.TableHead>
            <table.TableHead>Tallas</table.TableHead>
            <table.TableHead className="text-right">Acciones</table.TableHead>
          </table.TableRow>
        </table.TableHeader>
        <table.TableBody>
          <table.TableRow>
            <table.TableCell className="font-medium">1</table.TableCell>
            <table.TableCell>
              <img
                src="https://placehold.co/250x250"
                className="w-20 h-20 object-cover rounded-md"
              />
            </table.TableCell>
            <table.TableCell>Producto 1</table.TableCell>
            <table.TableCell>$250.00</table.TableCell>
            <table.TableCell>Categoría 1</table.TableCell>
            <table.TableCell>100 stock</table.TableCell>
            <table.TableCell>XS,S,L</table.TableCell>
            <table.TableCell className="text-right">
              <Link to='/admin/products/t-shirt-teslo'>
                Editar
              </Link>
            </table.TableCell>
          </table.TableRow>
        </table.TableBody>
      </table.Table>

      <CustomPagination totalPages={10} />
    </>
  )
}
