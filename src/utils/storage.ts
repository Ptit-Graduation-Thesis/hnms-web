export const setLocalStorage = (key: string, value: string) => {
  window.localStorage.setItem(key, value)
}

export const getLocalStorage = (key: string) => {
  const value = window.localStorage.getItem(key)
  return value === null ? '' : value
}
