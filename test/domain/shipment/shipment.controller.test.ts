import ShipmentController from '../../../src/domain/shipment/shipment.controller';

// jest.mock('express');
// jest.mock('./shipment.model');
// jest.mock('./shipment.service');
// jest.mock('./shipment.mapper');
// jest.mock("tslog");

describe('ShipmentController', () => {
  let instance: ShipmentController;

  beforeEach(() => {
    instance = new ShipmentController();
  });

  it('instance should be an instanceof ShipmentController', () => {
    expect(instance instanceof ShipmentController).toBeTruthy();
  });

  it('should have a method intializeRoutes()', () => {
    // instance.intializeRoutes();
    expect(false).toBeTruthy();
  });
});