export interface CreateFacture{
    codigo:string;
    precioNeto:number;
    guiaRemisionTransportista:string;
    igv:number;
    guiaRemisionRemitente:string;
    importeTotal:number;
    fechaEmision:string;
    rucCliente:number;
    rutas:string[];
    observaciones:string[];
}