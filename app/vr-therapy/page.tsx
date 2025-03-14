"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Pause, SkipForward, Volume2, VolumeX, Maximize } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Canvas } from "@react-three/fiber"
import { Sky, Environment, OrbitControls, Text } from "@react-three/drei"

function ForestScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Sky sunPosition={[0, 1, 0]} />
      <Environment preset="forest" />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#5a9e6f" />
      </mesh>

      {/* Trees (simplified) */}
      {Array.from({ length: 20 }).map((_, i) => {
        const x = Math.random() * 40 - 20
        const z = Math.random() * 40 - 20
        const height = 2 + Math.random() * 3
        return (
          <group key={i} position={[x, 0, z]}>
            {/* Tree trunk */}
            <mesh position={[0, height / 2, 0]}>
              <cylinderGeometry args={[0.2, 0.3, height, 8]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
            {/* Tree top */}
            <mesh position={[0, height + 1, 0]}>
              <coneGeometry args={[1.5, 3, 8]} />
              <meshStandardMaterial color="#2e5a32" />
            </mesh>
          </group>
        )
      })}

      {/* Meditation area */}
      <group position={[0, 0, 0]}>
        {/* Meditation platform */}
        <mesh position={[0, -0.9, 0]}>
          <cylinderGeometry args={[3, 3, 0.2, 32]} />
          <meshStandardMaterial color="#e0d2c5" />
        </mesh>

        {/* Meditation instructions */}
        <Text
          position={[0, 0.5, -2.5]}
          fontSize={0.3}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter_Regular.json"
        >
          Breathe deeply and focus on the present moment
        </Text>
      </group>

      <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
    </>
  )
}

function BeachScene() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <Sky sunPosition={[1, 0.5, 0]} />
      <Environment preset="sunset" />

      {/* Ocean */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#0077be" />
      </mesh>

      {/* Beach */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.95, 5]}>
        <planeGeometry args={[100, 20]} />
        <meshStandardMaterial color="#f5deb3" />
      </mesh>

      {/* Palm trees */}
      {Array.from({ length: 8 }).map((_, i) => {
        const x = Math.random() * 30 - 15
        const z = 8 + Math.random() * 5
        return (
          <group key={i} position={[x, 0, z]}>
            {/* Tree trunk */}
            <mesh position={[0, 2, 0]} rotation={[0, 0, Math.random() * 0.2 - 0.1]}>
              <cylinderGeometry args={[0.2, 0.3, 4, 8]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
            {/* Palm leaves */}
            {Array.from({ length: 5 }).map((_, j) => (
              <mesh
                key={j}
                position={[Math.sin((j * Math.PI * 2) / 5) * 0.5, 4, Math.cos((j * Math.PI * 2) / 5) * 0.5]}
                rotation={[Math.random() * 0.5 - 0.25, (j * Math.PI * 2) / 5, Math.PI / 4]}
              >
                <boxGeometry args={[0.1, 1.5, 0.5]} />
                <meshStandardMaterial color="#2e8b57" />
              </mesh>
            ))}
          </group>
        )
      })}

      {/* Meditation instructions */}
      <Text
        position={[0, 0.5, 0]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter_Regular.json"
      >
        Listen to the waves and feel the ocean breeze
      </Text>

      <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
    </>
  )
}

function MountainScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Sky sunPosition={[0, 0.2, 1]} />
      <Environment preset="dawn" />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#4a6741" />
      </mesh>

      {/* Mountains */}
      {Array.from({ length: 10 }).map((_, i) => {
        const x = Math.random() * 60 - 30
        const z = -20 - Math.random() * 20
        const height = 5 + Math.random() * 10
        return (
          <mesh key={i} position={[x, height / 2 - 1, z]}>
            <coneGeometry args={[height / 2, height, 16]} />
            <meshStandardMaterial color={`rgb(${100 + i * 10}, ${100 + i * 10}, ${120 + i * 10})`} />
          </mesh>
        )
      })}

      {/* Meditation area */}
      <group position={[0, 0, 0]}>
        {/* Meditation platform */}
        <mesh position={[0, -0.9, 0]}>
          <cylinderGeometry args={[2, 2, 0.2, 32]} />
          <meshStandardMaterial color="#c0c0c0" />
        </mesh>

        {/* Meditation instructions */}
        <Text
          position={[0, 0.5, -2]}
          fontSize={0.3}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter_Regular.json"
        >
          Feel the mountain strength and stability
        </Text>
      </group>

      <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
    </>
  )
}

export default function VRTherapyPage() {
  const [activeTab, setActiveTab] = useState("forest")
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(80)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(300) // 5 minutes in seconds
  const [audioElement, setAudioElement] = useState(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Audio mapping for different environments
  const audioMap = {
    forest: "/assets/forest-sounds.mp3", // This would be a real audio file in production
    beach: "/assets/ocean-waves.mp3", // This would be a real audio file in production
    mountain: "/assets/mountain-wind.mp3", // This would be a real audio file in production
  }

  useEffect(() => {
    // In a real implementation, this would load and manage actual audio files
    console.log(`Loading audio for ${activeTab} environment`)

    // Simulate audio loading and duration setting
    setCurrentTime(0)
    setIsPlaying(false)

    // Cleanup function
    return () => {
      if (audioElement) {
        // In a real implementation, this would stop and clean up the audio
        console.log("Cleaning up audio")
      }
    }
  }, [activeTab])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    // In a real implementation, this would play/pause the actual audio
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    // In a real implementation, this would mute/unmute the actual audio
  }

  const handleVolumeChange = (newValue) => {
    setVolume(newValue[0])
    // In a real implementation, this would change the actual audio volume
  }

  const handleTimeChange = (newValue) => {
    setCurrentTime(newValue[0])
    // In a real implementation, this would seek the audio to the new position
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const toggleFullscreen = () => {
    // In a real implementation, this would toggle fullscreen mode
    setIsFullscreen(!isFullscreen)
  }

  // Simulate audio playback progress
  useEffect(() => {
    let interval
    if (isPlaying && currentTime < duration) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false)
            return duration
          }
          return prev + 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, currentTime, duration])

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">VR Therapy Experiences</h1>

        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="forest" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="forest">Forest Meditation</TabsTrigger>
              <TabsTrigger value="beach">Beach Relaxation</TabsTrigger>
              <TabsTrigger value="mountain">Mountain Mindfulness</TabsTrigger>
            </TabsList>

            <div
              className={`relative aspect-video rounded-lg overflow-hidden ${isFullscreen ? "fixed inset-0 z-50 rounded-none" : ""}`}
            >
              <Canvas>
                {activeTab === "forest" && <ForestScene />}
                {activeTab === "beach" && <BeachScene />}
                {activeTab === "mountain" && <MountainScene />}
              </Canvas>

              <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-white">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                  <div className="flex items-center space-x-4">
                    <button onClick={toggleMute} className="text-white">
                      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                    <div className="w-24">
                      <Slider value={[volume]} min={0} max={100} step={1} onValueChange={handleVolumeChange} />
                    </div>
                    <button onClick={toggleFullscreen} className="text-white">
                      <Maximize size={20} />
                    </button>
                  </div>
                </div>
                <Slider
                  value={[currentTime]}
                  min={0}
                  max={duration}
                  step={1}
                  onValueChange={handleTimeChange}
                  className="mb-2"
                />
                <div className="flex justify-center space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-white border-white hover:bg-white/20"
                    onClick={togglePlay}
                  >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-white border-white hover:bg-white/20"
                    onClick={() => setCurrentTime(0)}
                  >
                    <SkipForward size={16} />
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Guided Meditation</CardTitle>
                  <CardDescription>Follow along with our guided meditation for this environment.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    {activeTab === "forest" &&
                      "This forest meditation will guide you through a peaceful journey among the trees, helping you connect with nature and find inner calm."}
                    {activeTab === "beach" &&
                      "This beach relaxation session will help you unwind as you listen to the waves and imagine the warm sand beneath your feet."}
                    {activeTab === "mountain" &&
                      "This mountain mindfulness practice will help you develop stability and perspective as you connect with the strength of the mountains."}
                  </p>
                  <div className="flex justify-center">
                    <Button>Start Guided Session</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Breathing Exercise</CardTitle>
                  <CardDescription>Practice this breathing technique to enhance your experience.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal list-inside space-y-2 mb-4">
                    <li>Sit comfortably and close your eyes</li>
                    <li>Breathe in slowly through your nose for 4 counts</li>
                    <li>Hold your breath for 4 counts</li>
                    <li>Exhale slowly through your mouth for 6 counts</li>
                    <li>Repeat for 5-10 minutes</li>
                  </ol>
                  <div className="flex justify-center">
                    <Button>Start Breathing Timer</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Tabs>
        </div>

        <div className="mt-16 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Benefits of VR Therapy</h2>
          <p className="text-lg mb-8">
            Virtual reality therapy has been shown to help reduce anxiety, stress, and symptoms of depression by
            creating immersive, calming environments that promote mindfulness and relaxation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-2">Stress Reduction</h3>
              <p>Immersive environments help lower cortisol levels and promote relaxation.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-2">Mindfulness Practice</h3>
              <p>VR environments create ideal settings for focused meditation and presence.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-2">Accessibility</h3>
              <p>Experience calming natural settings anytime, anywhere through your device.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

