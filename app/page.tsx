import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Guitar, HeadphonesIcon, Music, Users } from "lucide-react"
import { SparklesPreview } from "@/components/ui/sparkles-preview"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"

const FEATURES = [
  {
    icon: Guitar,
    title: "Interactive Guitar Tuner",
    description: "Keep your guitar perfectly in tune with our advanced audio recognition technology.",
  },
  {
    icon: Music,
    title: "Extensive Song Library",
    description: "Access hundreds of popular songs with detailed tutorials and practice modes.",
  },
  {
    icon: HeadphonesIcon,
    title: "Real-time Feedback",
    description: "Get instant feedback on your playing to improve accuracy and timing.",
  },
  {
    icon: Users,
    title: "Community Learning",
    description: "Connect with other guitarists, share progress, and learn together.",
  },
]

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    role: "Beginner Guitarist",
    content:
      "Guitar Galaxy has made learning guitar fun and approachable. The interactive lessons and real-time feedback have helped me progress faster than I ever thought possible.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Michael R.",
    role: "Intermediate Player",
    content:
      "The structured learning path and extensive song library keep me motivated. I've learned more in 3 months than I did in a year of self-teaching.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "David K.",
    role: "Advanced Guitarist",
    content:
      "Even as an experienced player, I find value in the advanced techniques and community features. It's a great platform for all skill levels.",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function HomePage() {
  return (
    <div className="space-y-24 py-8">
      {/* Hero Section */}
      <section className="w-full">
        <SparklesPreview />
        <div className="container mx-auto mt-8 text-center space-y-8">
          <div className="max-w-3xl mx-auto space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Master Guitar the
              <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                {" "}
                Modern Way
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Join thousands of guitarists learning with our interactive platform. Start your journey today with
              personalized lessons and real-time feedback.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <HoverBorderGradient as={Link} href="/signup" containerClassName="w-fit">
              Get Started Free
            </HoverBorderGradient>
            <Button asChild variant="outline" size="lg" className="text-lg">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold">Everything You Need to Learn Guitar</h2>
          <p className="text-lg text-muted-foreground">Comprehensive tools and features to accelerate your learning</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature) => (
            <Card
              key={feature.title}
              className="relative overflow-hidden group hover:shadow-lg transition-all border-primary/10 hover:border-primary/30"
            >
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-xl">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto py-16 bg-gradient-to-r from-purple-900/20 to-primary/20 rounded-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              10k+
            </div>
            <div className="text-sm text-muted-foreground">Active Students</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              500+
            </div>
            <div className="text-sm text-muted-foreground">Song Tutorials</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              95%
            </div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              4.9/5
            </div>
            <div className="text-sm text-muted-foreground">Student Rating</div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold">What Our Students Say</h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of satisfied guitarists on their learning journey
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <Card
              key={testimonial.name}
              className="relative hover:shadow-lg transition-all border-primary/10 hover:border-primary/30"
            >
              <CardContent className="pt-12 p-6">
                <div className="absolute top-0 -translate-y-1/2 left-6">
                  <div className="h-12 w-12 rounded-full overflow-hidden border-4 border-background">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <blockquote className="space-y-4">
                  <p className="text-muted-foreground">{testimonial.content}</p>
                  <footer>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </footer>
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto text-center space-y-8">
        <h2 className="text-3xl font-bold">Ready to Start Your Guitar Journey?</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Join Guitar Galaxy today and get access to all our features. Start with a free account and upgrade anytime.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <HoverBorderGradient as={Link} href="/signup" containerClassName="w-fit">
            Get Started Free
          </HoverBorderGradient>
          <Button asChild variant="outline" size="lg" className="text-lg">
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

