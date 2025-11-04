module.exports = {
    getvendors: `SELECT vendors.*,contacts.firstName,contacts.lastName,contacts.ROWID,userData.lastName, userData.firstName,userData.ROWID FROM vendors left join userData on userData.ROWID = vendors.owner LEFT JOIN contacts ON contacts.ROWID = vendors.contact %SEARCH_CONDITION% 
ORDER BY CREATEDTIME DESC 
LIMIT %LIMIT% OFFSET %OFFSET%`,
    getvendorsById: "SELECT vendors.*,contacts.firstName,contacts.lastName,contacts.ROWID,userData.lastName, userData.firstName,userData.ROWID FROM vendors left join userData on userData.ROWID = vendors.owner LEFT JOIN contacts ON contacts.ROWID = vendors.contact WHERE vendors.ROWID =",
    deletevendors: "DELETE FROM vendors WHERE ROWID IN ",
    getCount: "SELECT COUNT(ROWID) FROM vendors"
}