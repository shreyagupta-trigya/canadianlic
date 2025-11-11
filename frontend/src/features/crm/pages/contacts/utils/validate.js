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
