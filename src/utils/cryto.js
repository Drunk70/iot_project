import cryptoJs from 'crypto-js'
import base64 from 'js-base64'
// DES加密
export const encryptDes = (message) => {
  const key = '496371653338663230336a6632336677657070716548486f45516f6a63716565'
  const iv = '7765625f476365776932337677657632'
  var keyHex = cryptoJs.enc.Hex.parse(key)
  var ivHex = cryptoJs.enc.Hex.parse(iv)
  var option = {
    iv: ivHex,
    mode: cryptoJs.mode.CBC,
    padding: cryptoJs.pad.Pkcs7
  }
  var encrypted = cryptoJs.AES.encrypt(message, keyHex, option)
  return Base64.encode(encrypted.ciphertext.toString())
}
