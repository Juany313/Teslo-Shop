

export const currencyFormatter = ( value:number ) => {
    return value.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2,
    })
}