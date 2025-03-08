"use client"

import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"

interface UserProfileCardProps {
  user: {
    displayName: string
    email: string
    photoURL?: string
  }
}

export function UserProfileCard({ user }: UserProfileCardProps) {
  const router = useRouter()

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Card className="overflow-hidden">
      <div className="h-20 bg-gradient-to-r from-primary/20 to-primary/40"></div>
      <CardContent className="p-0">
        <div className="flex flex-col items-center -mt-10 p-4">
          <Avatar className="h-20 w-20 border-4 border-background shadow-md">
            <AvatarImage src={user.photoURL} alt={user.displayName} />
            <AvatarFallback className="text-xl">{getInitials(user.displayName || "User")}</AvatarFallback>
          </Avatar>
          <h3 className="mt-2 text-lg font-semibold">{user.displayName}</h3>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <Button variant="outline" size="sm" className="mt-3" onClick={() => router.push("/profile")}>
            <Edit className="mr-2 h-3 w-3" />
            Edit Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

