"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export function AuthCodeHandler() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const code = searchParams.get("code")
    if (code) {
      console.log("Auth code detected in URL, redirecting to callback handler")
      router.push(`/auth/callback?code=${code}`)
    }
  }, [searchParams, router])

  return null
}
