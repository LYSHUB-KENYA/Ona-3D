"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Eye,
  Move
} from "lucide-react"

interface Room {
  id: string
  name: string
  image: string
  hotspots?: { x: number; y: number; label: string; targetRoom: string }[]
}

interface PanoramaViewerProps {
  rooms: Room[]
  initialRoom?: string
  onRoomChange?: (roomId: string) => void
}

export function PanoramaViewer({ rooms, initialRoom, onRoomChange }: PanoramaViewerProps) {
  const [currentRoomIndex, setCurrentRoomIndex] = useState(() => {
    if (initialRoom) {
      const index = rooms.findIndex(r => r.id === initialRoom)
      return index >= 0 ? index : 0
    }
    return 0
  })
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [isAutoRotating, setIsAutoRotating] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  const currentRoom = rooms[currentRoomIndex]

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true)
    setIsAutoRotating(false)
    setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y })
  }, [position])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return
    const newX = e.clientX - startPos.x
    const newY = Math.max(-100, Math.min(100, e.clientY - startPos.y))
    setPosition({ x: newX, y: newY })
  }, [isDragging, startPos])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0]
    setIsDragging(true)
    setIsAutoRotating(false)
    setStartPos({ x: touch.clientX - position.x, y: touch.clientY - position.y })
  }, [position])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return
    const touch = e.touches[0]
    const newX = touch.clientX - startPos.x
    const newY = Math.max(-100, Math.min(100, touch.clientY - startPos.y))
    setPosition({ x: newX, y: newY })
  }, [isDragging, startPos])

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  const nextRoom = useCallback(() => {
    const newIndex = (currentRoomIndex + 1) % rooms.length
    setCurrentRoomIndex(newIndex)
    setPosition({ x: 0, y: 0 })
    onRoomChange?.(rooms[newIndex].id)
  }, [currentRoomIndex, rooms, onRoomChange])

  const prevRoom = useCallback(() => {
    const newIndex = (currentRoomIndex - 1 + rooms.length) % rooms.length
    setCurrentRoomIndex(newIndex)
    setPosition({ x: 0, y: 0 })
    onRoomChange?.(rooms[newIndex].id)
  }, [currentRoomIndex, rooms, onRoomChange])

  const goToRoom = useCallback((index: number) => {
    setCurrentRoomIndex(index)
    setPosition({ x: 0, y: 0 })
    onRoomChange?.(rooms[index].id)
  }, [rooms, onRoomChange])

  const toggleFullscreen = useCallback(() => {
    if (!isFullscreen) {
      containerRef.current?.requestFullscreen?.()
    } else {
      document.exitFullscreen?.()
    }
    setIsFullscreen(!isFullscreen)
  }, [isFullscreen])

  const resetView = useCallback(() => {
    setPosition({ x: 0, y: 0 })
    setZoom(1)
  }, [])

  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev + 0.25, 2.5))
  }, [])

  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev - 0.25, 1))
  }, [])

  useEffect(() => {
    if (isAutoRotating) {
      const animate = () => {
        setPosition(prev => ({ ...prev, x: prev.x - 0.5 }))
        animationRef.current = requestAnimationFrame(animate)
      }
      animationRef.current = requestAnimationFrame(animate)
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isAutoRotating])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden bg-foreground/5 rounded-2xl ${
        isFullscreen ? "fixed inset-0 z-50 rounded-none" : "aspect-[16/10]"
      }`}
    >
      {/* Main panorama view */}
      <div 
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="absolute inset-0 transition-transform duration-100"
          style={{ 
            transform: `translateX(${position.x * 0.1}px) translateY(${position.y * 0.1}px) scale(${zoom})`,
          }}
        >
          <Image
            src={currentRoom.image}
            alt={currentRoom.name}
            fill
            className="object-cover select-none"
            draggable={false}
            priority
          />
        </div>
      </div>

      {/* Room label */}
      <div className="absolute top-6 left-6 z-10">
        <Badge className="bg-card/90 backdrop-blur text-foreground border-0 shadow-lg px-4 py-2 text-sm font-medium">
          <Eye className="w-4 h-4 mr-2" />
          {currentRoom.name}
        </Badge>
      </div>

      {/* Controls */}
      <div className="absolute top-6 right-6 z-10 flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handleZoomOut}
          className="bg-card/90 backdrop-blur border-0 shadow-lg hover:bg-card"
          disabled={zoom <= 1}
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleZoomIn}
          className="bg-card/90 backdrop-blur border-0 shadow-lg hover:bg-card"
          disabled={zoom >= 2.5}
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={resetView}
          className="bg-card/90 backdrop-blur border-0 shadow-lg hover:bg-card"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleFullscreen}
          className="bg-card/90 backdrop-blur border-0 shadow-lg hover:bg-card"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation arrows */}
      <Button
        variant="outline"
        size="icon"
        onClick={prevRoom}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-10 bg-card/90 backdrop-blur border-0 shadow-lg hover:bg-card w-12 h-12"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={nextRoom}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 bg-card/90 backdrop-blur border-0 shadow-lg hover:bg-card w-12 h-12"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Room thumbnails */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        {rooms.map((room, index) => (
          <button
            key={room.id}
            onClick={() => goToRoom(index)}
            className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all shadow-lg ${
              index === currentRoomIndex 
                ? "border-primary ring-2 ring-primary/30" 
                : "border-card/50 hover:border-primary/50"
            }`}
          >
            <Image
              src={room.image}
              alt={room.name}
              fill
              className="object-cover"
            />
            {index === currentRoomIndex && (
              <div className="absolute inset-0 bg-primary/10" />
            )}
          </button>
        ))}
      </div>

      {/* Drag hint */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10">
        <Badge variant="outline" className="bg-card/80 backdrop-blur border-0 shadow-lg gap-2">
          <Move className="w-3 h-3" />
          Drag to look around
        </Badge>
      </div>
    </div>
  )
}
