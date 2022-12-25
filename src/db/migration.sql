CREATE DATABASE logix;

USE logix;

CREATE TABLE organizations (
  id VARCHAR(36),
  code VARCHAR(50) NOT NULL,
  type VARCHAR(50) NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE shipments (
  id INT AUTO_INCREMENT,
  referenceId VARCHAR(50) NOT NULL,
  estimatedTimeArrival TIMESTAMP,
  type VARCHAR(50) NOT NULL,
  weight INT,
  weightUnit VARCHAR(50),
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY (referenceId)
);

CREATE TABLE shipments_organizations (
  organizationId VARCHAR(36) NOT NULL,
  shipmentId INT NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (organizationId) REFERENCES organizations(id),
  FOREIGN KEY (shipmentId) REFERENCES shipments(id),
  UNIQUE KEY ship_org (organizationId,shipmentId)
);
