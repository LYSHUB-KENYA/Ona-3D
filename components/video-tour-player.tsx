"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize,
  SkipBack,
  SkipForward,
  RotateCcw
} from "lucide-react"

interface VideoTourPlayerProps {
  rooms: {
    id: string
    name: string
    thumbnail: string
    description?: string
  }[]
  propertyName?: string
}

export function VideoTourPlayer({ rooms, propertyName = "Property Tour" }: VideoTourPlayerProps) {
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const progressInterval = useRef<NodeJS.Timeout | null>(null)

  const currentRoom = rooms[currentRoomIndex]

  // Simulate video playback with progress
  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            // Auto-advance to next room
            if (currentRoomIndex < rooms.length - 1) {
              setCurrentRoomIndex(currentRoomIndex + 1)
              return 0
            } else {
              setIsPlaying(false)
              return 100
            }
          }
          return prev + 0.5
        })
      }, 50)
    } else {
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
    }
  }, [isPlaying, currentRoomIndex, rooms.length])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handlePrevRoom = () => {
    if (currentRoomIndex > 0) {
      setCurrentRoomIndex(currentRoomIndex - 1)
      setProgress(0)
    }
  }

  const handleNextRoom = () => {
    if (currentRoomIndex < rooms.length - 1) {
      setCurrentRoomIndex(currentRoomIndex + 1)
      setProgress(0)
    }
  }

  const handleRestart = () => {
    setCurrentRoomIndex(0)
    setProgress(0)
    setIsPlaying(true)
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const handleRoomSelect = (index: number) => {
    setCurrentRoomIndex(index)
    setProgress(0)
  }

  // Auto-hide controls
  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (isPlaying) {
      timeout = setTimeout(() => setShowControls(false), 3000)
    }
    return () => clearTimeout(timeout)
  }, [isPlaying, showControls])

  return (
    <div 
      ref={containerRef}
      className="relative bg-foreground rounded-2xl overflow-hidden"
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Main video/image display */}
      <div className="relative aspect-video">
        <Image
          src={currentRoom.thumbnail}
          alt={currentRoom.name}
          fill
          className={`object-cover transition-transform duration-700 ${isPlaying ? 'scale-105' : 'scale-100'}`}
        />
        
        {/* Cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

        {/* Room info overlay */}
        <div className={`absolute top-6 left-6 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-white/70 text-sm uppercase tracking-wider mb-1">{propertyName}</p>
          <h3 className="text-white text-2xl font-light">{currentRoom.name}</h3>
          {currentRoom.description && (
            <p className="text-white/60 text-sm mt-1 max-w-md">{currentRoom.description}</p>
          )}
        </div>

        {/* Room counter */}
        <div className={`absolute top-6 right-6 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2">
            <span className="text-white text-sm font-medium">
              {currentRoomIndex + 1} / {rooms.length}
            </span>
          </div>
        </div>

        {/* Center play button */}
        {!isPlaying && (
          <button
            onClick={handlePlayPause}
            className="absolute inset-0 flex items-center justify-center group"
          >
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <Play className="w-8 h-8 text-white ml-1" />
            </div>
          </button>
        )}

        {/* Bottom controls */}
        <div className={`absolute bottom-0 left-0 right-0 p-6 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          {/* Progress bar */}
          <div className="mb-4">
            <div className="h-1 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrevRoom}
                disabled={currentRoomIndex === 0}
                className="text-white hover:bg-white/20 disabled:opacity-30"
              >
                <SkipBack className="w-5 h-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePlayPause}
                className="text-white hover:bg-white/20"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNextRoom}
                disabled={currentRoomIndex === rooms.length - 1}
                className="text-white hover:bg-white/20 disabled:opacity-30"
              >
                <SkipForward className="w-5 h-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleRestart}
                className="text-white hover:bg-white/20"
              >
                <RotateCcw className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMuted(!isMuted)}
                className="text-white hover:bg-white/20"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFullscreen}
                className="text-white hover:bg-white/20"
              >
                {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Room thumbnails */}
      <div className="bg-card p-4">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {rooms.map((room, index) => (
            <button
              key={room.id}
              onClick={() => handleRoomSelect(index)}
              className={`relative flex-shrink-0 rounded-lg overflow-hidden transition-all ${
                index === currentRoomIndex 
                  ? 'ring-2 ring-primary ring-offset-2 ring-offset-card' 
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <div className="relative w-24 h-16">
                <Image
                  src={room.thumbnail}
                  alt={room.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-1 left-2 right-2 text-white text-[10px] truncate">
                {room.name}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
