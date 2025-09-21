import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { Link, useParams, useSearchParams } from "react-router";
import { cn } from "@/lib/utils";
import { CustomLogo } from "@/components/custom/CustomLogo";
import { useAuthStore } from "@/auth/store/auth.store";

export const CustomHeader = () => {

  //Zustand
  const { authStatus, isAdmin, logout } = useAuthStore();

  // Para querys
  const [ searchParams, setSearchParams ] = useSearchParams();
  // Para Ids
  const {gender} = useParams();
  

  const inputRef = useRef<HTMLInputElement>(null);
  const query = searchParams.get('query') || '';

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key !== 'Enter') return;
    const query = inputRef.current?.value;
    
    const newSearchParams = new URLSearchParams();

    if( !query ){
      newSearchParams.delete('query')
    } else {
      newSearchParams.set('query', inputRef.current?.value || '')
    }


    setSearchParams(newSearchParams)
  }

  return <header className="sticky top-0 z-50 w-full border-b backdrop-blur bg-slate-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <CustomLogo />

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={cn(`text-sm font-medium transition-colors text-primary`,
                !gender ? 'text-muted-foreground' : ''
              )}
            >
              Todos
            </Link>
            <Link 
              to='gender/men' 
              className={cn(`text-sm font-medium transition-colors text-primary`,
                gender === 'men' ? 'text-muted-foreground' : ''
              )}
            >
              Hombres
            </Link>
            <Link 
              to='gender/women' 
              className={cn(`text-sm font-medium transition-colors text-primary`,
                gender === 'women' ? 'text-muted-foreground' : ''
              )}
            >
              Mujeres
            </Link>
            <Link 
              to='gender/kid' 
              className={cn(`text-sm font-medium transition-colors text-primary`,
                gender === 'kid' ? 'text-muted-foreground' : ''
              )}
            >
              Niños
            </Link>
          </nav>

          {/* Search and Cart */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  ref={inputRef}
                  placeholder="Buscar productos..." 
                  className="pl-9 w-64 h-9 bg-white" 
                  onKeyDown={handleSearch}
                  defaultValue={query}
                />
              </div>
            </div>
            
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>

            {
              authStatus === 'not-authenticated' ? (
              <Link to='/auth/login'>
                <Button
                  variant='default'
                  size='sm'
                  className="ml-2"
                >
                  Login
                </Button>
              </Link>
              ) : (
                <Button
                onClick={logout}
                  variant='outline'
                  size='sm'
                  className="ml-2"
                >
                  Cerrar sesión
                </Button>
              )
            }

            {
              isAdmin() && (
                <Link to='/admin'>
                  <Button
                    variant='destructive'
                    size='sm'
                    className="ml-2"
                    type="button"
                  >
                    Admin
                  </Button>
                </Link>
              )
            }
            
            
          </div>
        </div>
      </div>
    </header>;
};