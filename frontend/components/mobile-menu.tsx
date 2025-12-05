"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden mr-2">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[250px] sm:w-[300px]">
        <SheetHeader>
          <SheetTitle>Electric Shop</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-8">
          <Link href="/" className="text-sm font-medium hover:text-primary" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link href="/#" className="text-sm font-medium hover:text-primary" onClick={() => setOpen(false)}>
            Products
          </Link>
          <Link href="/#" className="text-sm font-medium hover:text-primary" onClick={() => setOpen(false)}>
            Categories
          </Link>
          <Link href="/#" className="text-sm font-medium hover:text-primary" onClick={() => setOpen(false)}>
            About
          </Link>
          <Link href="/#" className="text-sm font-medium hover:text-primary" onClick={() => setOpen(false)}>
            Contact
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

