import { Vehicle } from "./vehicle.entity";
import { VehicleType } from "./vehicleType.enum";

export class VehicleFactory {
    static get(id?: number, marca?: string, modelo?: string, placa?: string, tipo?: VehicleType):Vehicle{
        const obj = new Vehicle();
        obj.id = id;
        obj.marca = marca;
        obj.modelo = modelo;
        obj.placa = placa;
        obj.tipo = tipo;
        return obj;
    }
}