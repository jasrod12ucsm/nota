export class Client {
  constructor(
    public ruc: string,
    public departamento: string,
    public calle: string,
    public avenida: string|null,
    public distrito: string,
    public ciudad: string,
    public nombre: string,
  ) {
    this.ruc = ruc;
    this.departamento = departamento;
    this.calle = calle;
    this.avenida = avenida;
    this.distrito = distrito;
    this.ciudad = ciudad;
    this.nombre = nombre;
  }
}
