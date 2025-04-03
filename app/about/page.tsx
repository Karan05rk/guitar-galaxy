import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"
import Link from "next/link"

const TEAM_MEMBERS = [
  {
    name: "Sarah Johnson",
    role: "Lead Developer",
    image: "/placeholder.svg?height=400&width=400",
    description: "10+ years of experience in web development and music technology.",
  },
  {
    name: "Michael Chen",
    role: "Music Education Specialist",
    image: "/placeholder.svg?height=400&width=400",
    description: "Professional guitarist and music educator with 15 years of teaching experience.",
  },
  {
    name: "Emily Rodriguez",
    role: "UX Designer",
    image: "/placeholder.svg?height=400&width=400",
    description: "Award-winning designer specializing in educational platforms.",
  },
  {
    name: "David Kim",
    role: "Audio Engineer",
    image: "/placeholder.svg?height=400&width=400",
    description: "Expert in digital audio processing and sound engineering.",
  },
]

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 space-y-24">
      {/* Mission Section */}
      <section className="text-center space-y-8">
        <h1 className="text-4xl font-bold">About Guitar Galaxy</h1>
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p className="text-lg text-muted-foreground">
            To make guitar learning accessible, engaging, and enjoyable for everyone. We believe that music has the
            power to transform lives, and we're here to guide you on your musical journey.
          </p>
        </div>
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl font-semibold">About the Application</h2>
          <p className="text-lg text-muted-foreground">
            Guitar Galaxy is a comprehensive learning platform that combines cutting-edge technology with proven
            teaching methods. Our interactive lessons, real-time feedback, and extensive library of songs and exercises
            make learning guitar more effective and fun than ever before.
          </p>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="space-y-12">
        <h2 className="text-3xl font-bold text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <Card key={member.name} className="overflow-hidden group hover:shadow-lg transition-all">
              <CardContent className="p-0">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-sm text-primary">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <h2 className="text-3xl font-bold">Contact Us</h2>
          <div className="space-y-4">
            <p className="flex items-center gap-2">
              <span className="font-semibold">Phone:</span>
              <Link href="tel:+1234567890" className="text-primary hover:underline">
                +1 (234) 567-890
              </Link>
            </p>
            <p className="flex items-center gap-2">
              <span className="font-semibold">Email:</span>
              <Link href="mailto:contact@guitargalaxy.com" className="text-primary hover:underline">
                contact@guitargalaxy.com
              </Link>
            </p>
            <p className="flex items-center gap-2">
              <span className="font-semibold">WhatsApp:</span>
              <Link href="https://wa.me/1234567890" className="text-primary hover:underline">
                Message us on WhatsApp
              </Link>
            </p>
          </div>
          <div className="aspect-video rounded-lg overflow-hidden border">
            {/* Replace with actual map integration */}
            <div className="w-full h-full bg-muted flex items-center justify-center">Map Integration</div>
          </div>
        </div>

        {/* Rate Us Section */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold">Rate Us</h2>
          <div className="space-y-6">
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} className="text-2xl text-yellow-400 hover:scale-110 transition-transform">
                  <Star className="h-8 w-8" />
                </button>
              ))}
            </div>
            <form className="space-y-4">
              <div className="space-y-2">
                <Input placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <Textarea placeholder="Share your experience with Guitar Galaxy..." className="min-h-[150px]" />
              </div>
              <Button type="submit" className="w-full">
                Submit Review
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

