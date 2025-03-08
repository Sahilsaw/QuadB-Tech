"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, CheckCircle, Clock, Home, ListTodo, Plus, Star, Users } from "lucide-react"
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { addList, selectAllLists } from "@/lib/features/lists/listsSlice"
import type { AppDispatch } from "@/lib/store"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className, ...props }: SidebarProps) {
  const pathname = usePathname()
  const [isCreatingList, setIsCreatingList] = useState(false)
  const [newListName, setNewListName] = useState("")
  const dispatch = useDispatch<AppDispatch>()
  const lists = useSelector(selectAllLists) || [] // Provide a default empty array if undefined

  const handleCreateList = (e: React.FormEvent) => {
    e.preventDefault()
    if (newListName.trim()) {
      dispatch(addList({ id: Date.now().toString(), name: newListName.trim() }))
      setNewListName("")
      setIsCreatingList(false)
    }
  }

  return (
    <div className={cn("flex flex-col h-full bg-background", className)} {...props}>
      <div className="flex h-16 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <motion.div initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ duration: 0.5 }}>
            <CheckCircle className="h-6 w-6 text-primary" />
          </motion.div>
          <span className="text-xl font-bold text-primary">TaskFlow</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          <Link
            href="/dashboard"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground sidebar-item",
              pathname === "/dashboard" && "bg-accent text-foreground sidebar-item active",
            )}
          >
            <Home className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/dashboard/today"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground sidebar-item",
              pathname === "/dashboard/today" && "bg-accent text-foreground sidebar-item active",
            )}
          >
            <Clock className="h-4 w-4" />
            <span>Today</span>
          </Link>
          <Link
            href="/dashboard/all-tasks"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground sidebar-item",
              pathname === "/dashboard/all-tasks" && "bg-accent text-foreground sidebar-item active",
            )}
          >
            <ListTodo className="h-4 w-4" />
            <span>All Tasks</span>
          </Link>
          <Link
            href="/dashboard/important"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground sidebar-item",
              pathname === "/dashboard/important" && "bg-accent text-foreground sidebar-item active",
            )}
          >
            <Star className="h-4 w-4" />
            <span>Important</span>
          </Link>
          <Link
            href="/dashboard/planned"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground sidebar-item",
              pathname === "/dashboard/planned" && "bg-accent text-foreground sidebar-item active",
            )}
          >
            <Calendar className="h-4 w-4" />
            <span>Planned</span>
          </Link>
          <Link
            href="/dashboard/assigned"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground sidebar-item",
              pathname === "/dashboard/assigned" && "bg-accent text-foreground sidebar-item active",
            )}
          >
            <Users className="h-4 w-4" />
            <span>Assigned to me</span>
          </Link>

          <div className="mt-6">
            <h3 className="mb-2 px-4 text-xs font-semibold text-muted-foreground">MY LISTS</h3>
            <div className="space-y-1">
              {lists.map((list) => (
                <Link
                  key={list.id}
                  href={`/dashboard/lists/${list.id}`}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground sidebar-item",
                    pathname === `/dashboard/lists/${list.id}` && "bg-accent text-foreground sidebar-item active",
                  )}
                >
                  <span>{list.name}</span>
                </Link>
              ))}

              {isCreatingList ? (
                <form onSubmit={handleCreateList} className="px-3 py-1">
                  <Input
                    type="text"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    placeholder="List name"
                    className="w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
                    autoFocus
                    onBlur={() => setIsCreatingList(false)}
                  />
                </form>
              ) : (
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 px-3 py-2 text-muted-foreground"
                  onClick={() => setIsCreatingList(true)}
                >
                  <Plus className="h-4 w-4" />
                  <span>Add list</span>
                </Button>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

