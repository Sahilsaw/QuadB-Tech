"use client"

import { Button } from "@/components/ui/button"
import { Grid, List } from "lucide-react"

interface ViewToggleProps {
  view: "list" | "grid"
  setView: (view: "list" | "grid") => void
}

export function ViewToggle({ view, setView }: ViewToggleProps) {
  return (
    <div className="flex items-center space-x-1">
      <Button
        variant={view === "list" ? "default" : "outline"}
        size="icon"
        className="h-8 w-8"
        onClick={() => setView("list")}
        aria-label="List view"
      >
        <List className="h-4 w-4" />
        <span className="sr-only">List view</span>
      </Button>
      <Button
        variant={view === "grid" ? "default" : "outline"}
        size="icon"
        className="h-8 w-8"
        onClick={() => setView("grid")}
        aria-label="Grid view"
      >
        <Grid className="h-4 w-4" />
        <span className="sr-only">Grid view</span>
      </Button>
    </div>
  )
}

