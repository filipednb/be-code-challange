export const OrganizationQueries = {
    findAll: `
        SELECT * FROM organizations
    `,
    upSert: `
        INSERT INTO 
            organizations (id, code, type)
        VALUES
            (?, ?, ?) ON DUPLICATE KEY UPDATE
            code=?, type=?, updatedAt=CURRENT_TIMESTAMP
    `,
    findByCode: `
        SELECT * FROM organizations WHERE code IN (?)
    `,
    findById: `
        SELECT * FROM organizations WHERE id =?
    `
};