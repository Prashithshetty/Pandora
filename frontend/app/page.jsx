"use client"

import { useState } from "react"
import { Search, Camera, MapPin, Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showCamera, setShowCamera] = useState(false)

  const featuredStories = [
    {
      id: 1,
      title: "The Lighthouse Keeper's Tale",
      location: "Beacon Point",
      preview: "A mysterious story of love and loss echoes through the coastal winds...",
      distance: "0.3 miles",
      category: "Mystery",
    },
    {
      id: 2,
      title: "Whispers in the Oak Grove",
      location: "Central Park",
      preview: "Ancient trees hold secrets of the city's forgotten past...",
      distance: "0.8 miles",
      category: "Historical",
    },
    {
      id: 3,
      title: "The Artist's Last Canvas",
      location: "Gallery District",
      preview: "A painter's final masterpiece reveals more than meets the eye...",
      distance: "1.2 miles",
      category: "Drama",
    },
  ]

  if (showCamera) {
    return <CameraView onBack={() => setShowCamera(false)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-amber-50/30">
      {/* Header */}
      <header className="px-6 py-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-8 h-8 text-primary" />
          <h1 className="font-serif text-3xl font-bold text-foreground">StoryScape AR</h1>
        </div>
        <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
          Discover magical stories hidden in the world around you through augmented reality
        </p>
      </header>

      {/* Search Section */}
      <div className="px-6 mb-8">
        <div className="max-w-md mx-auto space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search for a place..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-card border-2 border-border/50 rounded-xl shadow-sm focus:border-primary/50 focus:ring-primary/20"
            />
          </div>

          <Button
            onClick={() => setShowCamera(true)}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-lg font-medium flex items-center gap-2 transition-all duration-200 hover:shadow-xl"
          >
            <Camera className="w-5 h-5" />
            Use Camera & GPS to Discover Stories
          </Button>
        </div>
      </div>

      {/* Featured Stories */}
      <div className="px-6 mb-8">
        <h2 className="font-serif text-xl font-semibold mb-4 text-center">Stories Near You</h2>
        <div className="space-y-4 max-w-md mx-auto">
          {featuredStories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="px-6 pb-8">
        <Card className="max-w-md mx-auto bg-gradient-to-r from-secondary/10 to-primary/10 border-2 border-dashed border-secondary/30">
          <CardContent className="p-6 text-center">
            <Sparkles className="w-8 h-8 text-secondary mx-auto mb-3" />
            <h3 className="font-serif font-semibold mb-2">Share Your Story</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Soon you'll be able to add your own stories to locations and connect with other storytellers
            </p>
            <Badge variant="secondary" className="bg-secondary/20 text-secondary border-secondary/30">
              Coming Soon
            </Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StoryCard({ story }) {
  return (
    <Card className="bg-card border-2 border-border/50 shadow-sm hover:shadow-md transition-all duration-200 hover:border-primary/30 cursor-pointer group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="font-serif text-lg leading-tight group-hover:text-primary transition-colors">
              {story.title}
            </CardTitle>
            <div className="flex items-center gap-1 mt-1">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{story.location}</span>
            </div>
          </div>
          <Badge variant="outline" className="ml-2 text-xs">
            {story.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription className="leading-relaxed mb-3">{story.preview}</CardDescription>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-primary">{story.distance} away</span>
          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </CardContent>
    </Card>
  )
}

function CameraView({ onBack }) {
  const [isScanning, setIsScanning] = useState(false)
  const [foundStory, setFoundStory] = useState(null)

  const handleScan = () => {
    setIsScanning(true)
    // Simulate AR scanning
    setTimeout(() => {
      setIsScanning(false)
      setFoundStory({
        title: "The Lighthouse Keeper's Tale",
        content:
          "In 1847, a lighthouse keeper named Thomas watched over these waters. Every night, he would light the beacon, not just for ships, but for his beloved who promised to return from a distant voyage. Though she never came back, locals say her spirit still dances in the lighthouse beam on foggy nights, guiding lost souls home.",
        image: "/mystical-lighthouse-sunset.png",
      })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
      {/* Camera Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20">
        <div className="absolute inset-4 border-2 border-white/30 rounded-2xl">
          <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-white/50"></div>
          <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-white/50"></div>
          <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-white/50"></div>
          <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-white/50"></div>
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-6">
        <Button variant="ghost" onClick={onBack} className="text-white hover:bg-white/20 rounded-xl">
          ← Back
        </Button>
        <div className="text-center">
          <h2 className="font-serif text-white text-lg font-semibold">AR Story Finder</h2>
          <p className="text-white/70 text-sm">Point your camera around to discover stories</p>
        </div>
        <div className="w-16"></div>
      </div>

      {/* Scanning Animation */}
      {isScanning && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white font-medium">Scanning for stories...</p>
          </div>
        </div>
      )}

      {/* Story Card Overlay */}
      {foundStory && (
        <div className="absolute bottom-6 left-6 right-6 z-20">
          <Card className="bg-card/95 backdrop-blur-sm border-2 border-primary/30 shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <img
                  src={foundStory.image || "/placeholder.svg"}
                  alt="Story illustration"
                  className="w-20 h-20 rounded-lg object-cover border-2 border-primary/20"
                />
                <div className="flex-1">
                  <h3 className="font-serif text-lg font-semibold mb-2 text-primary">{foundStory.title}</h3>
                  <p className="text-sm text-foreground leading-relaxed">{foundStory.content}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90">
                  Read Full Story
                </Button>
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  Save Story
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Scan Button */}
      {!isScanning && !foundStory && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <Button
            onClick={handleScan}
            size="lg"
            className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90 shadow-2xl"
          >
            <Camera className="w-6 h-6" />
          </Button>
        </div>
      )}

      {/* Ambient Elements */}
      <div className="absolute top-1/4 left-8 w-2 h-2 bg-primary/60 rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 right-12 w-1 h-1 bg-secondary/60 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute bottom-1/3 left-16 w-1.5 h-1.5 bg-primary/40 rounded-full animate-pulse delay-500"></div>
    </div>
  )
}
