"use client"

import type React from "react"
import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuthStore, type Company } from "@/lib/stores/auth"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Menu,
  LogOut,
  Settings,
  LayoutDashboard,
  Package,
  TrendingUp,
  Send,
  Download,
  BarChart3,
  Code2,
  ChevronDown,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface AppLayoutProps {
  children: React.ReactNode
  company: Company
}

const MENU_ITEMS = [
  {
    label: "Dashboard",
    href: "dashboard",
    icon: LayoutDashboard,
    moduleCode: "dashboard",
  },
  {
    label: "Inward",
    href: "inward",
    icon: Download,
    moduleCode: "inward",
  },
  {
    label: "Outward",
    href: "outward",
    icon: Send,
    moduleCode: "outward",
  },
  {
    label: "Transfer",
    href: "transfer",
    icon: TrendingUp,
    moduleCode: "transfer",
  },
  {
    label: "Consumption",
    href: "consumption",
    icon: Package,
    moduleCode: "consumption",
  },
  {
    label: "Inventory Ledger",
    href: "inventory-ledger",
    icon: BarChart3,
    moduleCode: "inventory-ledger",
  },
  {
    label: "Reports",
    href: "reports",
    icon: BarChart3,
    moduleCode: "reports",
  },
  {
    label: "Settings",
    href: "settings",
    icon: Settings,
    moduleCode: "settings",
  },
  {
    label: "Developer",
    href: "developer",
    icon: Code2,
    moduleCode: "developer",
  },
]

export function AppLayout({ children, company }: AppLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, currentCompanyAccess, logout } = useAuthStore()

  // Get accessible modules
  const accessibleModules = new Set(
    currentCompanyAccess?.modules?.filter((m: any) => m.permissions?.access).map((m: any) => m.moduleCode) || [],
  )

  const visibleMenuItems = MENU_ITEMS.filter((item) => accessibleModules.has(item.moduleCode))

  const handleLogout = async () => {
    await logout()
    router.push("/login")
  }

  const isActive = (href: string) => {
    return pathname.includes(`/${company}/${href}`)
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r bg-card">
        {/* Logo/Brand */}
        <div className="border-b p-4">
          <h1 className="text-xl font-bold text-foreground">Candor IMS</h1>
          <p className="text-xs text-muted-foreground mt-1">{company}</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {visibleMenuItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={`/${company}/${item.href}`}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* User Info */}
        <div className="border-t p-4 space-y-3">
          <div className="text-xs">
            <p className="text-muted-foreground">Logged in as</p>
            <p className="font-medium text-foreground truncate">{user?.email}</p>
          </div>
          <Button variant="outline" size="sm" className="w-full gap-2 bg-transparent" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b bg-card">
          <div className="flex items-center justify-between h-16 px-4 md:px-6">
            {/* Mobile Menu */}
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="border-b p-4">
                  <h1 className="text-xl font-bold">Candor IMS</h1>
                  <p className="text-xs text-muted-foreground mt-1">{company}</p>
                </div>
                <nav className="p-4 space-y-2">
                  {visibleMenuItems.map((item) => {
                    const Icon = item.icon
                    const active = isActive(item.href)
                    return (
                      <Link
                        key={item.href}
                        href={`/${company}/${item.href}`}
                        onClick={() => setSidebarOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                          active
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </Link>
                    )
                  })}
                </nav>
              </SheetContent>
            </Sheet>

            {/* Header Title */}
            <div className="flex-1 ml-4 md:ml-0">
              <h2 className="text-lg font-semibold text-foreground">
                {visibleMenuItems.find((item) => isActive(item.href))?.label || "Dashboard"}
              </h2>
            </div>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <div className="text-right">
                    <p className="text-sm font-medium">{user?.email?.split("@")[0]}</p>
                    <p className="text-xs text-muted-foreground">{company}</p>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/${company}/settings`}>Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
