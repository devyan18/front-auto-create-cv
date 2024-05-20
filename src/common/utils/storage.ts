export const setStorage = (key: string, value: any) => {
  window.localStorage.setItem(key, value)
}

export const getStorage = (key: string) => {
  return window.localStorage.getItem(key)
}

export const removeStorage = (key: string) => {
  window.localStorage.removeItem(key)
}
