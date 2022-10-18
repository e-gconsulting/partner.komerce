import CryptoJS from 'crypto-js'

const passphrase = 'k0m3r3'

const encryption = {
  encryptWithMD5: text => CryptoJS.MD5(text + passphrase).toString(),
  encryptWithAES: text => CryptoJS.AES.encrypt(text.toString(), passphrase).toString(),
  decryptWithAES: ciphertext => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase)
    let originalText
    try {
      originalText = bytes.toString(CryptoJS.enc.Utf8)
    } catch (error) {
      originalText = bytes.toString()
    }
    return originalText
  },
}

export default encryption
