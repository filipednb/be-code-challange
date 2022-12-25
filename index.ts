
import App from './src/app'
import ShipmentController from './src/domain/shipment/shipment.controller';
import OrganizationController from './src/domain/organization/organization.controller'

new App(
    [
        new ShipmentController(),
        new OrganizationController(),
    ],
    3000
).listen();
