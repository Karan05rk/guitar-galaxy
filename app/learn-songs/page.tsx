"use client"

import { cn } from "@/lib/utils"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Heart, Music2, Play, Star } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Sample song data
const SONGS = [
  {
    id: "wonderwall",
    name: "Wonderwall",
    artist: "Oasis",
    difficulty: "beginner",
    image: "/placeholder.svg?height=300&width=300",
    duration: "4:18",
    chords: ["Em", "G", "D", "A7sus4"],
    progress: 65,
  },
  {
    id: "hey-jude",
    name: "Hey Jude",
    artist: "The Beatles",
    difficulty: "intermediate",
    image: "/placeholder.svg?height=300&width=300",
    duration: "7:11",
    chords: ["F", "C", "Bb", "C7"],
    progress: 30,
  },
  // Add more songs...
]

type Song = (typeof SONGS)[0]

export default function LearnSongsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState<"all" | "beginner" | "intermediate" | "advanced" | "favorites">("all")
  const [favoriteSongs, setFavoriteSongs] = useState<Set<string>>(new Set())
  const [selectedSong, setSelectedSong] = useState<Song | null>(null)
  const [showPerformance, setShowPerformance] = useState(false)

  // Filter songs based on search query and difficulty filter
  const filteredSongs = SONGS.filter((song) => {
    const matchesSearch =
      song.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter =
      filter === "all" || filter === song.difficulty || (filter === "favorites" && favoriteSongs.has(song.id))

    return matchesSearch && matchesFilter
  })

  const toggleFavorite = (songId: string, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation()
    }
    setFavoriteSongs((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(songId)) {
        newFavorites.delete(songId)
      } else {
        newFavorites.add(songId)
      }
      return newFavorites
    })
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Learn Songs</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <div className="relative">
            <Input
              placeholder="Search songs by name or artist..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <Tabs defaultValue="all" onValueChange={(value) => setFilter(value as any)}>
          <TabsList className="grid grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="beginner">Beginner</TabsTrigger>
            <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {filteredSongs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No songs found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredSongs.map((song) => (
            <Card
              key={song.id}
              className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => setSelectedSong(song)}
            >
              <CardContent className="p-0">
                <div className="relative aspect-square">
                  <img
                    src={song.image || "/placeholder.svg"}
                    alt={song.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button size="lg" className="gap-2">
                      <Play className="h-5 w-5" />
                      Start Learning
                    </Button>
                  </div>
                  <Badge
                    className="absolute top-2 left-2"
                    variant={
                      song.difficulty === "beginner"
                        ? "default"
                        : song.difficulty === "intermediate"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {song.difficulty}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2 p-4">
                <div className="flex items-start justify-between w-full">
                  <div>
                    <h3 className="font-semibold text-lg">{song.name}</h3>
                    <p className="text-sm text-muted-foreground">{song.artist}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="mt-0.5" onClick={(e) => toggleFavorite(song.id, e)}>
                    <Heart
                      className={cn(
                        "h-5 w-5",
                        favoriteSongs.has(song.id) ? "fill-primary text-primary" : "text-muted-foreground",
                      )}
                    />
                  </Button>
                </div>
                <div className="w-full space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{song.progress}%</span>
                  </div>
                  <Progress value={song.progress} className="h-1.5" />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Song Detail Dialog */}
      <Dialog open={!!selectedSong} onOpenChange={(open) => !open && setSelectedSong(null)}>
        <DialogContent className="max-w-4xl">
          {selectedSong && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedSong.name}</DialogTitle>
                <DialogDescription>By {selectedSong.artist}</DialogDescription>
              </DialogHeader>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <img
                      src={selectedSong.image || "/placeholder.svg"}
                      alt={selectedSong.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Music2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Duration: {selectedSong.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="h-4 w-4 text-yellow-400"
                          fill={star <= 3 ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Chords Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedSong.chords.map((chord) => (
                        <Badge key={chord} variant="secondary">
                          {chord}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Lyrics Preview</h3>
                    <p className="text-sm text-muted-foreground">
                      Today is gonna be the day that they're gonna throw it back to you...
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Button className="w-full gap-2">
                      <Play className="h-4 w-4" />
                      Start Practice
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline" className="w-full">
                        Previous Song
                      </Button>
                      <Button variant="outline" className="w-full">
                        Next Song
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Performance Dialog */}
      <Dialog open={showPerformance} onOpenChange={setShowPerformance}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Your Performance</DialogTitle>
            <DialogDescription>Here's how you did in your practice session</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Performance stats would go here */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Accuracy</h4>
                <div className="text-2xl font-bold text-primary">85%</div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Time Taken</h4>
                <div className="text-2xl font-bold">12:34</div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Chords Analysis</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Correct</div>
                  <Progress value={75} className="h-2" />
                  <div className="text-sm font-medium">45/60</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Incorrect</div>
                  <Progress value={15} className="h-2" variant="destructive" />
                  <div className="text-sm font-medium">9/60</div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3].map((star) => (
                  <Star key={star} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
                {[4, 5].map((star) => (
                  <Star key={star} className="h-6 w-6 text-muted-foreground" />
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" className="w-full">
                Practice Again
              </Button>
              <Button className="w-full">Next Song</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

