"use server"

import { cookies } from "next/headers"

function getTokenFromServer() {
  return cookies().get("HILToken")?.value
}

export { getTokenFromServer }
