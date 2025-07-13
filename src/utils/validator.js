// Utility functions untuk membantu operasi pada aplikasi

// Function untuk format response
const formatResponse = (status, message, data = null) => {
  const response = {
    status,
    message,
  };

  if (data) {
    response.data = data;
  }

  return response;
};

// Function untuk validasi format email (jika diperlukan)
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Function untuk generate timestamp
const getCurrentTimestamp = () => {
  return new Date().toISOString();
};

// Function untuk validasi required fields
const validateRequiredFields = (data, requiredFields) => {
  const missingFields = [];
  
  requiredFields.forEach(field => {
    if (!data[field] || data[field] === '') {
      missingFields.push(field);
    }
  });

  return {
    isValid: missingFields.length === 0,
    missingFields,
  };
};

module.exports = {
  formatResponse,
  isValidEmail,
  getCurrentTimestamp,
  validateRequiredFields,
};