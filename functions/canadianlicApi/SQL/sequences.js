const selectUtil = (tableName) => {
    return `SELECT * FROM sequences WHERE tableName = '${tableName}'`
}

module.exports = {
    selectUtil
}