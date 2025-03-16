export const validateCardholderName = (name) => /^[A-Za-z\s]+$/.test(name);

export const validateExpiryDate = (expiryDate) => {
  const [month, year] = expiryDate.split("/");

  if (!month || !year || month.length !== 2 || year.length !== 2) {
    return "Invalid format. Use MM/YY.";
  }

  if (month < 1 || month > 12) {
    return "Invalid month. Should be between 01 and 12.";
  }

  const expiry = new Date(`20${year}-${month}-01`);
  const currentDate = new Date();
  currentDate.setDate(1);

  return expiry >= currentDate
    ? true
    : "Expiration date must be in the future.";
};

export const validateCardNumber = (cardNumber) => cardNumber.length === 16;

export const validateCVV = (cvv) => /^\d{3}$/.test(cvv);
