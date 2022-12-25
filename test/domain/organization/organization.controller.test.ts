import OrganizationController from '../../../src/domain/organization/organization.controller';

jest.mock('express');

describe('OrganizationController', () => {
  let instance: OrganizationController;

  beforeEach(() => {
    instance = new OrganizationController();
  });

  it('instance should be an instanceof OrganizationController', () => {
    expect(instance instanceof OrganizationController).toBeTruthy();
  });

  it('should have a method intializeRoutes()', () => {
    // instance.intializeRoutes();
    expect(false).toBeTruthy();
  });

  it('should create a new organization', () => {
    // instance.intializeRoutes();
    //instance.updateOrInsert();
  });
});