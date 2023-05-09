const  CryptoJS  = require('crypto-js');

// Encrypt data
exports.encryptData = (data, secretKey) => {
  const encryptedData = CryptoJS.AES.encrypt(data, secretKey);
  return encryptedData.toString();
};

// Decrypt data
exports.decryptData = (encryptedData, secretKey) => {
  const decryptedData = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return decryptedData.toString(CryptoJS.enc.Utf8);
};
