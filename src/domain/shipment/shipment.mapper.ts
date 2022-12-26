import { ShipmentModel, ShipmentResponse } from "../shipment/shipment.model";

class ShipmentMapper {
    public static toResponse (shipments: ShipmentModel[]): ShipmentResponse {
        const organizations = shipments.map(s => {
            return {
                type: s.organizationType,
                id: s.organizationId,
                code: s.organizationCode
            }
        });
        const shipment: ShipmentModel = shipments[0];
        return {
            type: shipment.type,
            referenceId: shipment.referenceId,
            organizations: organizations,
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