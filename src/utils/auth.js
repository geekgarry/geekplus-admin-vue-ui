import Cookies from 'js-cookie'
import { encrypt, decrypt, encryptLg, decryptLg } from '@/utils/jsencrypt'

const TokenKey = 'Plus-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getDeCryptTok() {
  return decrypt(Cookies.get(TokenKey))
}

export function setEnCryptTok(token) {
  return Cookies.set(TokenKey, encrypt(token))
}

export function setTokenAt(token, attrObj) {
  return Cookies.set(TokenKey, token, attrObj)
}