import { ShipmentDTO, ShipmentModel } from "./shipment.model";

class ShipmentMapper {
    public static toDTO (shipments: ShipmentModel[]): ShipmentDTO {
        const organizationCodes = shipments.map(s => s.organizationCode);
        const shipment: ShipmentModel = shipments[0];
        return {
            type: shipment.type,
            referenceId: shipment.referenceId,
            organizations: organizationCodes,
            estimatedTimeArrival: shipment.estimatedTimeArrival,
            transportPacks: {
                nodes: [{
                    totalWeight: {
                        weight: shipment.weight,
                        unit: shipment.weightUnit
                    }
                }]
            }
        }
    }
}

export default ShipmentMapper