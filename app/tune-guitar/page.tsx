"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Music, PlayCircle } from "lucide-react"

// Guitar string frequencies in Hz
const STRING_FREQUENCIES = {
  E4: 329.63, // High E (1st string)
  B3: 246.94, // B (2nd string)
  G3: 196.0, // G (3rd string)
  D3: 146.83, // D (4th string)
  A2: 110.0, // A (5th string)
  E2: 82.41, // Low E (6th string)
}

type GuitarString = "E4" | "B3" | "G3" | "D3" | "A2" | "E2"

export default function TuneGuitarPage() {
  const [tuningMode, setTuningMode] = useState<"auto" | "manual">("manual")
  const [activeString, setActiveString] = useState<GuitarString | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [tuningComplete, setTuningComplete] = useState(false)
  const [tunedStrings, setTunedStrings] = useState<Set<GuitarString>>(new Set())

  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)

  // Initialize AudioContext on first user interaction
  const initAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
  }

  const playString = (stringName: GuitarString) => {
    initAudio()

    // Stop any currently playing sound
    if (oscillatorRef.current) {
      oscillatorRef.current.stop()
      oscillatorRef.current.disconnect()
      oscillatorRef.current = null
    }

    setActiveString(stringName)
    setIsPlaying(true)

    const ctx = audioContextRef.current!
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.type = "sine"
    oscillator.frequency.value = STRING_FREQUENCIES[stringName]

    // Apply envelope for a more natural sound
    gainNode.gain.setValueAtTime(0, ctx.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.1)
    gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.3)
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3)

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.start()
    oscillatorRef.current = oscillator

    // Stop after 3 seconds
    setTimeout(() => {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop()
        oscillatorRef.current.disconnect()
        oscillatorRef.current = null
        setIsPlaying(false)

        // Mark string as tuned
        setTunedStrings((prev) => {
          const newSet = new Set(prev)
          newSet.add(stringName)

          // Check if all strings are tuned
          if (newSet.size === 6) {
            setTuningComplete(true)
          }

          return newSet
        })
      }
    }, 3000)
  }

  // Clean up audio on component unmount
  useEffect(() => {
    return () => {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop()
        oscillatorRef.current.disconnect()
      }
    }
  }, [])

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Guitar Tuner</h1>

      <Tabs defaultValue="manual" onValueChange={(value) => setTuningMode(value as "auto" | "manual")}>
        <div className="flex justify-center mb-6">
          <TabsList>
            <TabsTrigger value="manual">Manual Tuning</TabsTrigger>
            <TabsTrigger value="auto">Auto Tuning</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="manual" className="space-y-8">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <div className="w-full aspect-[3/4] bg-gradient-to-b from-amber-800 to-amber-950 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 relative">
                    {/* Guitar body outline */}
                    <div className="absolute inset-0 rounded-full bg-amber-700 border-4 border-amber-950"></div>

                    {/* Sound hole */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 rounded-full bg-black border-2 border-amber-600"></div>

                    {/* Guitar strings container */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2 h-full flex flex-col justify-evenly">
                      {/* Strings */}
                      {(["E4", "B3", "G3", "D3", "A2", "E2"] as GuitarString[]).map((string) => (
                        <button
                          key={string}
                          onClick={() => playString(string)}
                          disabled={isPlaying}
                          className={`guitar-string guitar-string-${string.charAt(0).toLowerCase()} ${
                            activeString === string ? "vibrating" : ""
                          } ${tunedStrings.has(string) ? "opacity-70" : "opacity-100"}`}
                          aria-label={`Play ${string} string`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* String labels */}
                <div className="absolute top-0 right-4 h-full flex flex-col justify-evenly">
                  {(["E4", "B3", "G3", "D3", "A2", "E2"] as GuitarString[]).map((string, index) => (
                    <div key={string} className="flex items-center gap-2">
                      <div className="text-sm font-medium">
                        {string.charAt(0)}
                        {string.charAt(1) === "2" ? " (Low)" : string.charAt(1) === "4" ? " (High)" : ""}
                      </div>
                      {tunedStrings.has(string) && <Check className="h-4 w-4 text-green-500" />}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center space-y-6">
            {!isPlaying && !tuningComplete && (
              <div className="flex flex-col items-center gap-4">
                <Button size="lg" className="gap-2" onClick={() => playString("E4")}>
                  <PlayCircle className="h-5 w-5" />
                  Play String to Start Tuning
                </Button>
                <p className="text-muted-foreground">
                  Click on a string or use the button above to hear the correct pitch
                </p>
              </div>
            )}

            {isPlaying && (
              <div className="animate-pulse">
                <p className="text-lg font-medium">Listen and tune your {activeString} string...</p>
              </div>
            )}

            {tuningComplete && (
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2 text-xl font-medium text-green-500">
                  <Check className="h-6 w-6" />
                  <span>Your guitar is now in tune!</span>
                </div>

                <div className="flex flex-wrap gap-4 justify-center">
                  <Button asChild variant="outline" className="gap-2">
                    <Link href="/learn-chords">
                      <Music className="h-5 w-5" />
                      Learn Chords
                    </Link>
                  </Button>
                  <Button asChild className="gap-2">
                    <Link href="/learn-songs">
                      <Music className="h-5 w-5" />
                      Learn Songs
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="auto" className="space-y-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <p className="text-lg">
                  Auto tuning uses your device's microphone to detect the pitch of your guitar strings.
                </p>
                <Button size="lg" className="gap-2">
                  <Music className="h-5 w-5" />
                  Start Auto Tuning
                </Button>
                <p className="text-sm text-muted-foreground">
                  Note: You'll need to grant microphone permissions for this feature to work.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

