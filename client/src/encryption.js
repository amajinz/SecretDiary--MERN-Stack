import Crypto from 'crypto-js'

export const encryptContent = (content, pwd) => {
  const ciphertext = Crypto.AES.encrypt(content, pwd).toString()
  return ciphertext
}

export const decryptContent = (ciphertext, pwd) => {
  const bytes = Crypto.AES.decrypt(ciphertext, pwd)
  const plaintext = bytes.toString(Crypto.enc.Utf8)
  return plaintext
}
