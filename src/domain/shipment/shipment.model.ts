export interface ShipmentModel {
  id: number;
  estimatedTimeArrival: string;
  type: string;
  organizationCode: string;
  referenceId: string;
  weight: number;
  weightUnit: string;
}
export interface ShipmentDTO {
    type: string;
    referenceId: string;
    organizations: string[];
    estimatedTimeArrival: string;
    transportPacks: {
      nodes: [
        {
          totalWeight: {
              weight: number;
              unit: string;
          }
        }
      ]
    };
}
