export const ShipmentQueries = {
    findAll: `
        SELECT * FROM shipments
    `,
    upSert: `
            INSERT INTO 
                shipments (type, referenceId, estimatedTimeArrival, weight, weightUnit, createdAt, updatedAt)
            VALUES
                (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) 
            ON DUPLICATE KEY UPDATE estimatedTimeArrival=?, weight=?, weightUnit=?, updatedAt=CURRENT_TIMESTAMP;
    `,
    findByReferenceId: `
        SELECT s.type, s.referenceId, o.code as organizationCode, s.estimatedTimeArrival, s.weight, s.weightUnit FROM shipments s
        JOIN shipments_organizations so 
            ON so.shipmentId = s.id
        JOIN organizations o 
            ON so.organizationId = o.id
        WHERE s.referenceId=?
        ORDER BY s.createdAt DESC
    `,
    insertRelationship: `
        INSERT INTO
            shipments_organizations (organizationId, shipmentId)
        VALUES ?
        ON DUPLICATE KEY UPDATE shipmentId = shipmentId
    `
};
