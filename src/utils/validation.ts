export const getToday = () => new Date().toISOString().split('T')[0];

export const onlyDigits = (value: string) => value.replace(/\D/g, '');

export const formatPhone = (rawValue: string) => {
  let value = onlyDigits(rawValue).slice(0, 11);

  if (value.length > 6) {
    value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
  } else if (value.length > 2) {
    value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
  }

  return value;
};

export const isValidPhone = (value: string) => {
  const digits = onlyDigits(value);
  return digits.length === 10 || digits.length === 11;
};

export const isPastDate = (value: string) => Boolean(value && value < getToday());

export const isValidVehicleYear = (value: string) => {
  if (!value) return true;

  const year = Number(value);
  const currentYear = new Date().getFullYear() + 1;
  return Number.isInteger(year) && year >= 1950 && year <= currentYear;
};
