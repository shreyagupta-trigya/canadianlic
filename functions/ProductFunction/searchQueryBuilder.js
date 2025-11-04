// utils/searchQueryBuilder.js
const searchQueryBuilder = (filters, fieldMapping = {}) => {
    if (!filters || !Array.isArray(filters) || filters.length === 0) return "";
    let conditions = [];

    const formatValue = (val) => {
        if (val === null || val === undefined || val === "") return "NULL";
        return typeof val === "string" ? `'${val.replace(/'/g, "''")}'` : val;
    };

    filters.forEach(({ field, operation, value }) => {
        if (!operation || value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0)) {
            return;
        }

        const mappedField = fieldMapping[field];

        // If the mappedField is an array, assume it's [firstNameField, lastNameField] for full name search
        if (Array.isArray(mappedField)) {
            const [firstField, lastField] = mappedField;
            const [firstName, ...rest] = value.trim().split(" ");
            const lastName = rest.join(" ");

            let fullNameConditions = [];

            if (firstName) {
                fullNameConditions.push(`${firstField} = ${formatValue(firstName)}`);
            }

            if (lastName) {
                fullNameConditions.push(`${lastField} = ${formatValue(lastName)}`);
            }

            if (fullNameConditions.length > 0) {
                conditions.push(`(${fullNameConditions.join(" AND ")})`);
            }

            return;
        }

        const fieldToUse = typeof mappedField === "string" ? mappedField : field;

        const operations = {
            "is": (field, value) => `${field} = ${formatValue(value)}`,
            "is-not": (field, value) => `${field} != ${formatValue(value)}`,
            "is-empty": (field) => `(${field} IS NULL OR ${field} = '')`,
            "is-not-empty": (field) => `(${field} IS NOT NULL AND ${field} != '')`,
            "starts-with": (field, value) => `${field} LIKE '${value}*'`,
            "ends-with": (field, value) => `${field} LIKE '*${value}'`,
            "like": (field, value) => `${field} LIKE '*${value}*'`,
            "contains": (field, value) => `${field} LIKE '*${value}*'`,
            "not-contains": (field, value) => `${field} NOT LIKE '*${value}*'`,
            "in": (field, value) => Array.isArray(value) ? `${field} IN (${value.map(formatValue).join(",")})` : null,
            "not-in": (field, value) => Array.isArray(value) ? `${field} NOT IN (${value.map(formatValue).join(",")})` : null,
            "between": (field, value) => Array.isArray(value) && value.length === 2
                ? `${field} BETWEEN ${formatValue(value[0])} AND ${formatValue(value[1])}`
                : null
        };

        if (operations[operation]) {
            const condition = operations[operation](fieldToUse, value);
            if (condition) conditions.push(condition);
        }
    });

    return conditions.length > 0 ? conditions.join(" AND ") : "";
};

module.exports = searchQueryBuilder;
