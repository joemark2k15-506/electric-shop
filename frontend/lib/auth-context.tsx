// "use client"

// import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
// import { useRouter } from "next/navigation"
// import { useToast } from "@/hooks/use-toast"

// export interface User {
//   id: string
//   name: string
//   email: string
//   address?: {
//     street: string
//     city: string
//     state: string
//     zipCode: string
//     country: string
//   }
// }

// interface AuthContextType {
//   user: User | null
//   isLoading: boolean
//   login: (email: string, password: string) => Promise<boolean>
//   register: (name: string, email: string, password: string) => Promise<boolean>
//   logout: () => void
//   updateUserAddress: (address: User["address"]) => void
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const router = useRouter()
//   const { toast } = useToast()

//   // Load user from localStorage on initial render
//   useEffect(() => {
//     const savedUser = localStorage.getItem("user")
//     if (savedUser) {
//       try {
//         setUser(JSON.parse(savedUser))
//       } catch (error) {
//         console.error("Failed to parse user from localStorage:", error)
//       }
//     }
//     setIsLoading(false)
//   }, [])

//   // Mock users database
//   const mockUsers = [
//     {
//       id: "1",
//       name: "Demo User",
//       email: "demo@example.com",
//       password: "password123",
//       address: {
//         street: "123 Main St",
//         city: "Anytown",
//         state: "CA",
//         zipCode: "12345",
//         country: "USA",
//       },
//     },
//   ]

//   const login = async (email: string, password: string) => {
//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 1000))

//     // Find user in mock database
//     const foundUser = mockUsers.find((u) => u.email === email && u.password === password)

//     if (foundUser) {
//       // Create a user object without the password
//       const { password, ...userWithoutPassword } = foundUser
//       setUser(userWithoutPassword)
//       localStorage.setItem("user", JSON.stringify(userWithoutPassword))

//       toast({
//         title: "Login successful",
//         description: `Welcome back, ${foundUser.name}!`,
//       })

//       return true
//     } else {
//       toast({
//         title: "Login failed",
//         description: "Invalid email or password",
//         variant: "destructive",
//       })

//       return false
//     }
//   }

//   const register = async (name: string, email: string, password: string) => {
//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 1000))

//     // Check if email already exists
//     if (mockUsers.some((u) => u.email === email)) {
//       toast({
//         title: "Registration failed",
//         description: "Email already in use",
//         variant: "destructive",
//       })

//       return false
//     }

//     // Create new user
//     const newUser = {
//       id: `${mockUsers.length + 1}`,
//       name,
//       email,
//       password,
//     }

//     // In a real app, you would save this to a database
//     // For this demo, we'll just pretend it was saved

//     // Create a user object without the password
//     const { password: _, ...userWithoutPassword } = newUser
//     setUser(userWithoutPassword)
//     localStorage.setItem("user", JSON.stringify(userWithoutPassword))

//     toast({
//       title: "Registration successful",
//       description: `Welcome, ${name}!`,
//     })

//     return true
//   }

//   const logout = () => {
//     setUser(null)
//     localStorage.removeItem("user")
//     router.push("/")

//     toast({
//       title: "Logged out",
//       description: "You have been successfully logged out",
//     })
//   }

//   const updateUserAddress = (address: User["address"]) => {
//     if (user) {
//       const updatedUser = { ...user, address }
//       setUser(updatedUser)
//       localStorage.setItem("user", JSON.stringify(updatedUser))

//       toast({
//         title: "Address updated",
//         description: "Your shipping address has been updated",
//       })
//     }
//   }

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isLoading,
//         login,
//         register,
//         logout,
//         updateUserAddress,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export function useAuth() {
//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider")
//   }
//   return context
// }



// "use client"

// import { createContext, useContext, useState, useEffect, ReactNode } from "react"
// import { useRouter } from "next/navigation"
// import { useToast } from "@/hooks/use-toast"
// import { loginUser, registerUser, logoutUser, getCurrentUser } from "@/lib/api"

// export interface User {
//   id: string
//   name: string
//   email: string
//   role: string
//   address?: {
//     _id: string
//     street: string
//     city: string
//     state: string
//     zipCode: string
//     country: string
//     isDefault: boolean
//   }[]
// }

// interface AuthContextType {
//   user: User | null
//   isLoading: boolean
//   login: (email: string, password: string) => Promise<boolean>
//   register: (name: string, email: string, password: string) => Promise<boolean>
//   logout: () => void
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const router = useRouter()
//   const { toast } = useToast()

//   // Check if user is logged in on initial load
//   useEffect(() => {
//     const checkUserLoggedIn = async () => {
//       try {
//         const { data } = await getCurrentUser()
//         setUser(data)
//       } catch (error) {
//         setUser(null)
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     checkUserLoggedIn()
//   }, [])

//   const login = async (email: string, password: string) => {
//     try {
//       const { data, token } = await loginUser({ email, password })
//       setUser(data)
      
//       toast({
//         title: "Login successful",
//         description: `Welcome back, ${data.name}!`,
//       })
      
//       return true
//     } catch (error: any) {
//       toast({
//         title: "Login failed",
//         description: error.response?.data?.message || "Invalid credentials",
//         variant: "destructive"
//       })
      
//       return false
//     }
//   }

//   const register = async (name: string, email: string, password: string) => {
//     try {
//       const { data, token } = await registerUser({ name, email, password })
//       setUser(data)
      
//       toast({
//         title: "Registration successful",
//         description: `Welcome, ${name}!`,
//       })
      
//       return true
//     } catch (error: any) {
//       toast({
//         title: "Registration failed",
//         description: error.response?.data?.message || "Could not create account",
//         variant: "destructive"
//       })
      
//       return false
//     }
//   }

//   const logout = async () => {
//     try {
//       await logoutUser()
//       setUser(null)
//       router.push("/")
      
//       toast({
//         title: "Logged out",
//         description: "You have been successfully logged out",
//       })
//     } catch (error) {
//       console.error("Logout error:", error)
//     }
//   }

//   return (
//     <AuthContext.Provider value={{
//       user,
//       isLoading,
//       login,
//       register,
//       logout
//     }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export function useAuth() {
//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider")
//   }
//   return context
// }




"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { getCurrentUser, loginUser, logoutUser, registerUser } from "./api"

export interface User {
  id: string
  name: string
  email: string
  role: string
  address?: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  updateUserAddress: (address: User["address"]) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        setIsLoading(true)
        const { data } = await getCurrentUser()
        if (data) {
          setUser({
            id: data._id,
            name: data.name,
            email: data.email,
            role: data.role,
            address: data.addresses && data.addresses.length > 0 
              ? data.addresses.find((addr: any) => addr.isDefault) || data.addresses[0]
              : undefined
          })
        }
      } catch (error) {
        // Not logged in, that's okay
        console.log("User not logged in")
      } finally {
        setIsLoading(false)
      }
    }

    checkUserLoggedIn()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const { data, token } = await loginUser({ email, password })
      
      setUser({
        id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
        address: data.addresses && data.addresses.length > 0 
          ? data.addresses.find((addr: any) => addr.isDefault) || data.addresses[0]
          : undefined
      })

      toast({
        title: "Login successful",
        description: `Welcome back, ${data.name}!`,
      })

      return true
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.response?.data?.message || "Invalid email or password",
        variant: "destructive",
      })

      return false
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      const { data, token } = await registerUser({ name, email, password })
      
      setUser({
        id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
        address: undefined
      })

      toast({
        title: "Registration successful",
        description: `Welcome, ${name}!`,
      })

      return true
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.response?.data?.message || "Email already in use",
        variant: "destructive",
      })

      return false
    }
  }

  const logout = async () => {
    try {
      await logoutUser()
      setUser(null)
      router.push("/")

      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      })
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const updateUserAddress = (address: User["address"]) => {
    if (user) {
      setUser({ ...user, address })

      toast({
        title: "Address updated",
        description: "Your shipping address has been updated",
      })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        updateUserAddress,
      }}
    >
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