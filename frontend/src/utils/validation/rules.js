export const required = (msg = "This field is required") => (value) =>
  !value ? msg : null;

export const minLength = (min, msg) => (value) =>
  value && value.length < min ? msg || `Minimum ${min} characters` : null;

export const isEmail = (msg = "Invalid email") => (value) =>
  value && !/^\S+@\S+\.\S+$/.test(value) ? msg : null;

// Add more validators as needed
