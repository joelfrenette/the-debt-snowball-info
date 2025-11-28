"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface UserContextType {
  isGuest: boolean
}

const UserContext = createContext<UserContextType>({ isGuest: true })

export function UserProvider({ children }: { children: ReactNode }) {
  const [isGuest] = useState(true)

  return <UserContext.Provider value={{ isGuest }}>{children}</UserContext.Provider>
}

export function useUser() {
  return useContext(UserContext)
}
