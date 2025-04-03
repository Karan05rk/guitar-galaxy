"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, Crown, Flame, Gift, Music, Star, Trophy, Users } from "lucide-react"
import Link from "next/link"

const FRIENDS_SUGGESTIONS = [
  {
    id: 1,
    name: "Alex Thompson",
    image: "/placeholder.svg?height=100&width=100",
    level: 15,
    mutualFriends: 3,
  },
  {
    id: 2,
    name: "Maria Garcia",
    image: "/placeholder.svg?height=100&width=100",
    level: 23,
    mutualFriends: 5,
  },
  {
    id: 3,
    name: "John Smith",
    image: "/placeholder.svg?height=100&width=100",
    level: 18,
    mutualFriends: 2,
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto py-8">
      <div className="grid gap-8">
        {/* User Overview */}
        <section className="grid gap-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold">Welcome back, Alex!</h1>
              <p className="text-muted-foreground">Here's an overview of your progress</p>
            </div>
            <Button asChild>
              <Link href="/learn-songs">Continue Learning</Link>
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Daily Streak</CardTitle>
                <Flame className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7 Days</div>
                <p className="text-xs text-muted-foreground">+2 days from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Points</CardTitle>
                <Star className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">+256 points this week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current League</CardTitle>
                <Trophy className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Gold</div>
                <p className="text-xs text-muted-foreground">Top 15% of players</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Songs Learned</CardTitle>
                <Music className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">3 in progress</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Main Content */}
        <div className="grid gap-8 md:grid-cols-7">
          {/* Statistics */}
          <div className="md:col-span-5">
            <Card>
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
                <CardDescription>Track your learning journey</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="songs">Songs</TabsTrigger>
                    <TabsTrigger value="practice">Practice</TabsTrigger>
                    <TabsTrigger value="achievements">Achievements</TabsTrigger>
                  </TabsList>
                  <div className="mt-6 space-y-8">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="text-sm font-medium">Weekly Practice Goal</div>
                          <div className="text-sm text-muted-foreground">5 out of 7 days completed</div>
                        </div>
                        <div>71%</div>
                      </div>
                      <Progress value={71} className="h-2" />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="text-sm font-medium">Current Song Progress</div>
                          <div className="text-sm text-muted-foreground">Wonderwall - Oasis</div>
                        </div>
                        <div>45%</div>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>

                    {/* Progress Graph would go here */}
                    <div className="aspect-[4/3] w-full rounded-lg border bg-muted flex items-center justify-center">
                      Progress Graph
                    </div>
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-2 space-y-6">
            {/* Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Badges</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Perfect Streak</div>
                    <div className="text-sm text-muted-foreground">7 days in a row</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Crown className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Gold League</div>
                    <div className="text-sm text-muted-foreground">Reached top tier</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Gift className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Song Master</div>
                    <div className="text-sm text-muted-foreground">10 songs completed</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Friend Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Friend Suggestions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {FRIENDS_SUGGESTIONS.map((friend) => (
                  <div key={friend.id} className="flex items-center gap-3">
                    <img
                      src={friend.image || "/placeholder.svg"}
                      alt={friend.name}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{friend.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Level {friend.level} • {friend.mutualFriends} mutual
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Users className="h-4 w-4" />
                      <span className="sr-only">Add friend</span>
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

