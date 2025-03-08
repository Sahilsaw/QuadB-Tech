"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface User {
  uid: string
  email: string
  displayName: string
  photoURL?: string
}

interface ProfileUpdate {
  displayName?: string
  email?: string
  photoURL?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (profile: ProfileUpdate) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is stored in localStorage (simulating persistence)
    const storedUser = localStorage.getItem("taskflow_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, you would validate credentials with a backend
    // For demo purposes, we'll accept any email/password
    const mockUser: User = {
      uid: "user123",
      email,
      displayName: email.split("@")[0],
      photoURL: undefined,
    }

    setUser(mockUser)
    localStorage.setItem("taskflow_user", JSON.stringify(mockUser))
  }

  const register = async (name: string, email: string, password: string) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, you would register with a backend
    // For demo purposes, we'll create a mock user
    const mockUser: User = {
      uid: "user123",
      email,
      displayName: name,
      photoURL: undefined,
    }

    setUser(mockUser)
    localStorage.setItem("taskflow_user", JSON.stringify(mockUser))
  }

  const logout = async () => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    setUser(null)
    localStorage.removeItem("taskflow_user")
  }

  const updateProfile = async (profile: ProfileUpdate) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    if (user) {
      const updatedUser = { ...user, ...profile }
      setUser(updatedUser)
      localStorage.setItem("taskflow_user", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

