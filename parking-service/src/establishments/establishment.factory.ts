import { Establishment } from "./establishment.entity";

export class EstablishmentFactory {
    static get(id?: number, nome?: string, cnpj?: string, endereco?: string, telefone?: string, quantidadeVagasMotos?: number, quantidadeVagasCarros?: number):Establishment{
        const obj = new Establishment();
        obj.id = id;
        obj.nome = nome;
        obj.cnpj = cnpj;
        obj.endereco = endereco;
        obj.telefone = telefone;
        obj.quantidadeVagasMotos = quantidadeVagasMotos;
        obj.quantidadeVagasCarros = quantidadeVagasCarros;
        return obj;
    }
}