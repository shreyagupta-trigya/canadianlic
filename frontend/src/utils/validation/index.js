export const validateForm = (data, rules) => {
  const errors = {};
  for (const field in rules) {
    const value = data[field];
    for (const rule of rules[field]) {
      const error = rule(value, data);
      if (error) {
        errors[field] = error;
        break;
      }
    }
  }
  return errors;
};

// Helper function to get value from a nested path
const getValueFromPath = (obj, path) => {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
};

export const validateComplexForm = (data, rules) => {
  const errors = {};
  for (const fieldPath in rules) {
    const value = getValueFromPath(data, fieldPath);
    for (const rule of rules[fieldPath]) {
      const error = rule(value, data);
      if (error) {
        errors[fieldPath] = error;
        break;
      }
    }
  }
  return errors;
};
