const Crypto = require("crypto-js");

const encryptContent = (content, pwd) => {
  const ciphertext = Crypto.AES.encrypt(content, pwd);
  return ciphertext;
};

const decryptContent = (ciphertext, pwd) => {
  const bytes = Crypto.AES.decrypt(ciphertext.toString(), pwd);
  const plaintext = bytes.toString(Crypto.enc.Utf8);
  return plaintext;
};

module.exports = {
  encryptContent,
  decryptContent
};
