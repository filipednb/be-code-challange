export interface OrganizationModel {
  type: string;
  id: string;
  code: string;
}

export function isValid(model: OrganizationModel) {
  return model.code && model.id && model.type;
}
