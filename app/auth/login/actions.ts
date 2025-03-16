"use server"

import { createHash, randomUUID } from "crypto"
import { redirect } from "next/navigation"

import { createSession } from "@/utils/auth"

// Hash de nuestro secreto usando
// https://hash.online-convert.com/es/generador-sha256
const SECRET =
  "b0e1ec456a7434806e1d51301369345289e9980e0c0a72803870b7e93a9f2f4a"

export async function login(prevState: unknown, data: FormData) {
  const id = randomUUID()
  const hash = createHash("sha256")
  const password = data.get("pwd") as string

  console.log("login", { id, password })

  const hashedPassword = hash.update(password).digest("hex")

  if (hashedPassword !== SECRET) {
    return { error: "Invalid secret" }
  }

  await createSession(id)

  redirect("/auth")
}
