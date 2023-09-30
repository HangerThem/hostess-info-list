import Cookies from "js-cookie"

export const setToken = (token: string) => {
  Cookies.set("HILToken", token, {
    expires: 7,
    path: "/",
    sameSite: "strict",
  })
}

export const getToken = () => {
  return Cookies.get("HILToken")
}

export const removeToken = () => {
  Cookies.remove("HILToken")
}
