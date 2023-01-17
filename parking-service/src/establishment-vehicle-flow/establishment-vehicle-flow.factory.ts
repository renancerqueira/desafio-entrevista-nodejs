import { EstablishmentFactory } from "../establishments/establishment.factory";
import { VehicleFactory } from "../vehicles/vehicle.factory";
import { EstablishmentVehicleFlow } from "./establishment-vehicle-flow.entity";

export class EstablishmentVehicleFlowFactory {
    static get(id?: number, idVehicle?: number, idEstablishment?: number, dataEntrada?: Date, dataSaida?: Date) {
        const obj = new EstablishmentVehicleFlow();
        obj.id = id;
        obj.vehicle = VehicleFactory.get(idVehicle);
        obj.establishment = EstablishmentFactory.get(idEstablishment);
        obj.dataEntrada = dataEntrada;
        obj.dataSaida = dataSaida;
        return obj;
    }
}