import { NotaCreditoService } from "../services/nota_credito_service";

export class FindNotaCreditoByCodeUseCase{
    constructor(private readonly notaCreditoRepository: NotaCreditoService){}

    async getNotasCreditos(code:string){
        return this.notaCreditoRepository.getByCode(code);
    }
}