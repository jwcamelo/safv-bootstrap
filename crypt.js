const CryptoJS = require("crypto-js");

module.exports = {
  Decrypt(text) {
    let bytes = CryptoJS.AES.decrypt(text, "9f383225cd4f4801bc2b64");
    let data = bytes.toString(CryptoJS.enc.Utf8);
    return data;
  },

  Encrypt(text) {
    const secret = "9f383225cd4f4801bc2b64"
    let encrypted = CryptoJS.AES.encrypt(text, secret).toString();
    return encrypted;
  }
}