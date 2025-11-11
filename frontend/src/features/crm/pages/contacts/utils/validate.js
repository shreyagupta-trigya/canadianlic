<<<<<<< HEAD
// Placeholder for validate utility
// Migrated from Vue: validate.js

// Add validation logic here
=======
function validateMandatoryFields(formData, requiredFields) {
  const errors = {};

  requiredFields.forEach(field => {
    if (!formData[field.id] || formData[field.id].trim() === '' || formData[field.id] === null || formData[field.id] === undefined) {
      errors[field.id] = `${field.fieldName} is required.`;
    }
  });

  return errors;
}

export default validateMandatoryFields;
>>>>>>> f7991e1702bd5cb56de48f6fc1e79f7041f47d16
