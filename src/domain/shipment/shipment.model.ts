import { OrganizationModel } from "../organization/organization.model";

export interface ShipmentModel {
  id: number;
  estimatedTimeArrival: string;
  type: string;
  referenceId: string;
  weight: number;
  weightUnit: string;
  organizationCode: string;
  organizationId: string;
  organizationType: string;
}
export interface ShipmentRequest {
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

export interface ShipmentResponse extends Omit<ShipmentRequest, 'organizations'> {
  organizations: OrganizationModel[];
}

export type ShipmentWeight = {
  weight: number;
  unit: string;
}
