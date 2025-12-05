// "use client"

// import type React from "react"

// import { useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { useAuth } from "@/lib/auth-context"
// import AdminSidebar from "@/components/admin/admin-sidebar"
// import { Loader2 } from "lucide-react"

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   const { user, isLoading } = useAuth()
//   const router = useRouter()

//   useEffect(() => {
//     if (!isLoading && (!user || user.role !== "admin")) {
//       router.push("/login")
//     }
//   }, [user, isLoading, router])

//   if (isLoading) {
//     return (
//       <div className="flex h-screen w-full items-center justify-center">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//       </div>
//     )
//   }

//   if (!user || user.role !== "admin") {
//     return null // Will redirect in useEffect
//   }

//   return (
//     <div className="flex min-h-screen flex-col md:flex-row">
//       <AdminSidebar />
//       <div className="flex-1 p-6 md:p-8">{children}</div>
//     </div>
//   )
// }

"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import AdminSidebar from "@/components/admin/admin-sidebar"
import { Loader2 } from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user || user.role !== "admin") {
    return null // Will redirect in useEffect
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <AdminSidebar />
      <div className="flex-1 p-6 md:p-8">{children}</div>
    </div>
  )
}