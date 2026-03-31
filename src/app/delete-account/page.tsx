import type { Metadata } from "next"
import DeleteAccountClient from "./DeleteAccountClient"

export const metadata: Metadata = {
  title: "Delete Your Account – KDLUI",
  description: "Request account deletion and learn about our data retention policies at Kenneth Dike Library.",
}

export default function DeleteAccountPage() {
  return <DeleteAccountClient />
}
