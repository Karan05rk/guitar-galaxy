"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Bookmark,
  BookmarkCheck,
  ChevronLeft,
  ChevronRight,
  FlipVerticalIcon as Flip,
  Play,
  Search,
} from "lucide-react"

// Sample chord data
const CHORDS = [
  {
    id: "c-major",
    name: "C Major",
    difficulty: "beginner",
    image: "/chords/c-major/main.png?height=169&width=300",
    frames: [
      "/placeholder.svg?height=169&width=300&text=C+Major+Frame+1",
      "/placeholder.svg?height=169&width=300&text=C+Major+Frame+2",
      "/placeholder.svg?height=169&width=300&text=C+Major+Frame+3",
    ],
  },
  {
    id: "g-major",
    name: "G Major",
    difficulty: "beginner",
    image: "/chords/g-major/main.png?height=169&width=300",
    frames: [
      "/placeholder.svg?height=169&width=300&text=G+Major+Frame+1",
      "/placeholder.svg?height=169&width=300&text=G+Major+Frame+2",
    ],
  },
  {
    id: "d-major",
    name: "D Major",
    difficulty: "beginner",
    image: "/placeholder.svg?height=169&width=300",
    frames: [
      "/placeholder.svg?height=169&width=300&text=D+Major+Frame+1",
      "/placeholder.svg?height=169&width=300&text=D+Major+Frame+2",
    ],
  },
  {
    id: "a-major",
    name: "A Major",
    difficulty: "beginner",
    image: "/chords/a-major/main.png?height=169&width=300",
    frames: ["/placeholder.svg?height=169&width=300&text=A+Major+Frame+1"],
  },
  {
    id: "e-major",
    name: "E Major",
    difficulty: "beginner",
    image: "/chords/e-major/main.png?height=169&width=300",
    frames: [
      "/placeholder.svg?height=169&width=300&text=E+Minor+Frame+1",
      "/placeholder.svg?height=169&width=300&text=E+Minor+Frame+2",
    ],
  },
  {
    id: "a-minor",
    name: "A Minor",
    difficulty: "beginner",
    image: "/placeholder.svg?height=169&width=300",
    frames: ["/placeholder.svg?height=169&width=300&text=A+Minor+Frame+1"],
  },
  {
    id: "f-major",
    name: "F Major",
    difficulty: "intermediate",
    image: "/chords/f-major/main.png?height=169&width=300",
    frames: [
      "/placeholder.svg?height=169&width=300&text=F+Major+Frame+1",
      "/placeholder.svg?height=169&width=300&text=F+Major+Frame+2",
    ],
  },
  {
    id: "b-major",
    name: "B Major",
    difficulty: "intermediate",
    image: "/chords/b-major/main.png?height=169&width=300",
    frames: ["/placeholder.svg?height=169&width=300&text=B+Major+Frame+1"],
  },
  {
    id: "c-minor",
    name: "C Minor",
    difficulty: "intermediate",
    image: "/placeholder.svg?height=169&width=300",
    frames: ["/placeholder.svg?height=169&width=300&text=C+Minor+Frame+1"],
  },
  {
    id: "d-minor",
    name: "D Minor",
    difficulty: "intermediate",
    image: "/placeholder.svg?height=169&width=300",
    frames: ["/placeholder.svg?height=169&width=300&text=D+Minor+Frame+1"],
  },
  {
    id: "g-minor",
    name: "G Minor",
    difficulty: "intermediate",
    image: "/placeholder.svg?height=169&width=300",
    frames: ["/placeholder.svg?height=169&width=300&text=G+Minor+Frame+1"],
  },
  {
    id: "f-sharp-major",
    name: "F# Major",
    difficulty: "advanced",
    image: "/placeholder.svg?height=169&width=300",
    frames: ["/placeholder.svg?height=169&width=300&text=F%23+Major+Frame+1"],
  },
]

export default function LearnChordsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState<"all" | "beginner" | "intermediate" | "advanced" | "bookmarked">("all")
  const [bookmarkedChords, setBookmarkedChords] = useState<Set<string>>(new Set())
  const [selectedChord, setSelectedChord] = useState<(typeof CHORDS)[0] | null>(null)
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  // Filter chords based on search query and difficulty filter
  const filteredChords = CHORDS.filter((chord) => {
    const matchesSearch = chord.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter =
      filter === "all" || filter === chord.difficulty || (filter === "bookmarked" && bookmarkedChords.has(chord.id))

    return matchesSearch && matchesFilter
  })

  const toggleBookmark = (chordId: string, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation()
    }

    setBookmarkedChords((prev) => {
      const newBookmarks = new Set(prev)
      if (newBookmarks.has(chordId)) {
        newBookmarks.delete(chordId)
      } else {
        newBookmarks.add(chordId)
      }
      return newBookmarks
    })
  }

  const openChordDetail = (chord: (typeof CHORDS)[0]) => {
    setSelectedChord(chord)
    setCurrentFrameIndex(0)
    setIsFlipped(false)
  }

  const closeChordDetail = () => {
    setSelectedChord(null)
  }

  const nextFrame = () => {
    if (selectedChord) {
      setCurrentFrameIndex((prev) => (prev < selectedChord.frames.length - 1 ? prev + 1 : prev))
    }
  }

  const prevFrame = () => {
    setCurrentFrameIndex((prev) => (prev > 0 ? prev - 1 : prev))
  }

  const nextChord = () => {
    if (selectedChord) {
      const currentIndex = CHORDS.findIndex((c) => c.id === selectedChord.id)
      if (currentIndex < CHORDS.length - 1) {
        setSelectedChord(CHORDS[currentIndex + 1])
        setCurrentFrameIndex(0)
        setIsFlipped(false)
      }
    }
  }

  const prevChord = () => {
    if (selectedChord) {
      const currentIndex = CHORDS.findIndex((c) => c.id === selectedChord.id)
      if (currentIndex > 0) {
        setSelectedChord(CHORDS[currentIndex - 1])
        setCurrentFrameIndex(0)
        setIsFlipped(false)
      }
    }
  }

  const toggleFlip = () => {
    setIsFlipped((prev) => !prev)
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Learn Guitar Chords</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search chords..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="all" onValueChange={(value) => setFilter(value as any)}>
          <TabsList className="grid grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="beginner">Beginner</TabsTrigger>
            <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
            <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {filteredChords.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No chords found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredChords.map((chord) => (
            <Card
              key={chord.id}
              className="overflow-hidden cursor-pointer transition-all hover:shadow-md hover:border-primary/50 hover:-translate-y-1"
              onClick={() => openChordDetail(chord)}
            >
              <CardContent className="p-0">
                <div className="relative aspect-video">
                  <img
                    src={chord.image || "/placeholder.svg?height=169&width=300"}
                    alt={chord.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge
                    className="absolute top-2 left-2"
                    variant={
                      chord.difficulty === "beginner"
                        ? "default"
                        : chord.difficulty === "intermediate"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {chord.difficulty}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center p-4">
                <h3 className="font-semibold">{chord.name}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => toggleBookmark(chord.id, e)}
                  aria-label={bookmarkedChords.has(chord.id) ? "Remove bookmark" : "Add bookmark"}
                >
                  {bookmarkedChords.has(chord.id) ? (
                    <BookmarkCheck className="h-5 w-5 text-primary" />
                  ) : (
                    <Bookmark className="h-5 w-5" />
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Chord Detail Dialog */}
      <Dialog open={!!selectedChord} onOpenChange={(open) => !open && closeChordDetail()}>
        <DialogContent className="max-w-3xl">
          {selectedChord && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-2xl">{selectedChord.name}</DialogTitle>
                  <Badge
                    variant={
                      selectedChord.difficulty === "beginner"
                        ? "default"
                        : selectedChord.difficulty === "intermediate"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {selectedChord.difficulty}
                  </Badge>
                </div>
                <DialogDescription>Learn how to play the {selectedChord.name} chord on guitar</DialogDescription>
              </DialogHeader>

              <div className="relative">
                <div className="relative overflow-hidden rounded-lg border">
                  <div className={`transition-transform duration-500 ${isFlipped ? "rotate-y-180" : ""}`}>
                    <img
                      src={selectedChord.frames[currentFrameIndex] || "/placeholder.svg"}
                      alt={`${selectedChord.name} chord diagram`}
                      className="w-full object-contain"
                    />
                  </div>
                </div>

                {/* Frame navigation */}
                <div className="flex justify-center items-center gap-2 mt-4">
                  <Button variant="outline" size="icon" onClick={prevFrame} disabled={currentFrameIndex === 0}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <div className="flex gap-1">
                    {selectedChord.frames.map((_, index) => (
                      <Button
                        key={index}
                        variant={currentFrameIndex === index ? "default" : "outline"}
                        size="sm"
                        className="w-8 h-8 p-0"
                        onClick={() => setCurrentFrameIndex(index)}
                      >
                        {index + 1}
                      </Button>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextFrame}
                    disabled={currentFrameIndex === selectedChord.frames.length - 1}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap justify-between gap-4 mt-4">
                <div className="flex gap-2">
                  <Button onClick={toggleFlip} variant="outline" className="gap-2">
                    <Flip className="h-4 w-4" />
                    Flip View
                  </Button>

                  <Button onClick={() => toggleBookmark(selectedChord.id)} variant="outline" className="gap-2">
                    {bookmarkedChords.has(selectedChord.id) ? (
                      <>
                        <BookmarkCheck className="h-4 w-4" />
                        Bookmarked
                      </>
                    ) : (
                      <>
                        <Bookmark className="h-4 w-4" />
                        Bookmark
                      </>
                    )}
                  </Button>
                </div>

                <Button className="gap-2">
                  <Play className="h-4 w-4" />
                  Play Chord
                </Button>

                <div className="flex gap-2 w-full justify-between mt-4">
                  <Button variant="outline" onClick={prevChord} className="gap-2">
                    <ChevronLeft className="h-4 w-4" />
                    Previous Chord
                  </Button>

                  <Button variant="outline" onClick={nextChord} className="gap-2">
                    Next Chord
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

