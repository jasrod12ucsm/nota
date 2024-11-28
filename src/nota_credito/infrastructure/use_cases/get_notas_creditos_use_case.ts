import { NotaCreditoService } from "../services/nota_credito_service";



export class GetNotasCreditosUseCase{
    constructor(private readonly notaCreditoRepository: NotaCreditoService){}

    async getNotasCreditos(){
        return this.notaCreditoRepository.getNotasCreditos();
    }
}