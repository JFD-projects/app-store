const TOKEN_KEY = 'jwt-token'
const REFRESH_KEY = 'jwt-refresh-token'
const EXPIRES_KEY = 'jwt-expires'
const USERID_KEY = 'user-local-id'

export function setTokens({ accessToken, refreshToken, userId, expiresIn = 3600 }) {
  const expiresDate = new Date().getTime() + expiresIn * 1000
  localStorage.setItem(USERID_KEY, userId)
  localStorage.setItem(TOKEN_KEY, accessToken)
  localStorage.setItem(REFRESH_KEY, refreshToken)
  localStorage.setItem(EXPIRES_KEY, expiresDate)
}

export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY)
}

export function getTokenExpiresDate() {
  return localStorage.getItem(EXPIRES_KEY)
}

export function getUserId() {
  return localStorage.getItem(USERID_KEY)
}

export function removeAuthData() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(REFRESH_KEY)
  localStorage.removeItem(EXPIRES_KEY)
  localStorage.removeItem(USERID_KEY)
}

export function setData({ _id, basket }) {
  localStorage.setItem(`basket${_id}`, JSON.stringify(basket))
}

export function getBasketByUserId(id) {
  return localStorage.getItem(`basket${id}`)
}

const localStorageService = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getTokenExpiresDate,
  getUserId,
  removeAuthData,
  setData,
  getBasketByUserId
}

export default localStorageService
