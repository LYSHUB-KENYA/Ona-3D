"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Play,
  Pause,
  Grid3X3,
  Layers,
  Info,
  Share2,
  Heart,
  X,
  MapPin,
  Move3D,
  Eye
} from "lucide-react"

interface Room {
  id: string
  name: string
  image: string
  floor?: number
  description?: string
}

interface ImmersiveTourViewerProps {
  rooms: Room[]
  propertyName: string
  propertyLocation?: string
  initialRoom?: string
}

type ViewMode = "tour" | "dollhouse" | "floorplan"

export function ImmersiveTourViewer({ 
  rooms, 
  propertyName,
  propertyLocation,
  initialRoom 
}: ImmersiveTourViewerProps) {
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
  const [viewMode, setViewMode] = useState<ViewMode>("tour")
  const [showInfo, setShowInfo] = useState(false)
  const [showThumbnails, setShowThumbnails] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  const currentRoom = rooms[currentRoomIndex]

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (viewMode !== "tour") return
    setIsDragging(true)
    setIsAutoRotating(false)
    setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y })
  }, [position, viewMode])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || viewMode !== "tour") return
    const newX = e.clientX - startPos.x
    const newY = Math.max(-150, Math.min(150, e.clientY - startPos.y))
    setPosition({ x: newX, y: newY })
  }, [isDragging, startPos, viewMode])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (viewMode !== "tour") return
    const touch = e.touches[0]
    setIsDragging(true)
    setIsAutoRotating(false)
    setStartPos({ x: touch.clientX - position.x, y: touch.clientY - position.y })
  }, [position, viewMode])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || viewMode !== "tour") return
    const touch = e.touches[0]
    const newX = touch.clientX - startPos.x
    const newY = Math.max(-150, Math.min(150, touch.clientY - startPos.y))
    setPosition({ x: newX, y: newY })
  }, [isDragging, startPos, viewMode])

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  const goToRoom = useCallback((index: number) => {
    setCurrentRoomIndex(index)
    setPosition({ x: 0, y: 0 })
    setViewMode("tour")
  }, [])

  const nextRoom = useCallback(() => {
    goToRoom((currentRoomIndex + 1) % rooms.length)
  }, [currentRoomIndex, rooms.length, goToRoom])

  const prevRoom = useCallback(() => {
    goToRoom((currentRoomIndex - 1 + rooms.length) % rooms.length)
  }, [currentRoomIndex, rooms.length, goToRoom])

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!isFullscreen) {
        await containerRef.current?.requestFullscreen?.()
      } else {
        await document.exitFullscreen?.()
      }
    } catch (err) {
      console.log("[v0] Fullscreen not supported")
    }
    setIsFullscreen(!isFullscreen)
  }, [isFullscreen])

  const resetView = useCallback(() => {
    setPosition({ x: 0, y: 0 })
    setZoom(1)
  }, [])

  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev + 0.3, 3))
  }, [])

  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev - 0.3, 1))
  }, [])

  useEffect(() => {
    if (isAutoRotating && viewMode === "tour") {
      const animate = () => {
        setPosition(prev => ({ ...prev, x: prev.x - 0.3 }))
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
  }, [isAutoRotating, viewMode])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          prevRoom()
          break
        case "ArrowRight":
          nextRoom()
          break
        case "f":
          toggleFullscreen()
          break
        case "Escape":
          if (isFullscreen) toggleFullscreen()
          break
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [prevRoom, nextRoom, toggleFullscreen, isFullscreen])

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden bg-foreground rounded-2xl ${
        isFullscreen ? "fixed inset-0 z-50 rounded-none" : "aspect-[16/9]"
      }`}
    >
      {/* Main View */}
      {viewMode === "tour" && (
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
            className="absolute inset-0 transition-transform duration-75"
            style={{ 
              transform: `translateX(${position.x * 0.08}px) translateY(${position.y * 0.08}px) scale(${zoom})`,
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
          
          {/* Vignette effect */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.3)_100%)]" />
        </div>
      )}

      {/* Dollhouse View */}
      {viewMode === "dollhouse" && (
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center">
          <div className="relative w-full max-w-4xl aspect-video p-8">
            <div className="grid grid-cols-3 gap-4">
              {rooms.map((room, index) => (
                <button
                  key={room.id}
                  onClick={() => goToRoom(index)}
                  className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all hover:scale-105 ${
                    index === currentRoomIndex ? "border-white ring-2 ring-white/30" : "border-white/20"
                  }`}
                >
                  <Image src={room.image} alt={room.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute bottom-2 left-2 text-white text-sm font-medium">{room.name}</span>
                </button>
              ))}
            </div>
            <p className="text-center text-white/60 text-sm mt-6">Click any room to explore</p>
          </div>
        </div>
      )}

      {/* Floorplan View */}
      {viewMode === "floorplan" && (
        <div className="absolute inset-0 bg-white flex items-center justify-center">
          <div className="relative w-full max-w-2xl aspect-square p-8">
            <div className="w-full h-full border-2 border-foreground/20 rounded-xl relative">
              {/* Simple floor plan layout */}
              <div className="absolute inset-4 grid grid-cols-3 grid-rows-2 gap-2">
                {rooms.slice(0, 6).map((room, index) => (
                  <button
                    key={room.id}
                    onClick={() => goToRoom(index)}
                    className={`rounded-lg border-2 transition-all flex items-center justify-center text-xs font-medium ${
                      index === currentRoomIndex 
                        ? "bg-primary text-primary-foreground border-primary" 
                        : "bg-muted hover:bg-secondary border-border text-foreground"
                    }`}
                  >
                    {room.name}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-center text-muted-foreground text-sm mt-4">Interactive Floor Plan</p>
          </div>
        </div>
      )}

      {/* Top Bar - Property Info */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-black/60 backdrop-blur-md rounded-xl px-4 py-2.5">
            <h3 className="text-white font-medium text-sm">{propertyName}</h3>
            {propertyLocation && (
              <p className="text-white/70 text-xs flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3" />
                {propertyLocation}
              </p>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsFavorite(!isFavorite)}
            className="bg-black/40 backdrop-blur-md hover:bg-black/60 text-white rounded-full w-10 h-10"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-black/40 backdrop-blur-md hover:bg-black/60 text-white rounded-full w-10 h-10"
          >
            <Share2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowInfo(!showInfo)}
            className="bg-black/40 backdrop-blur-md hover:bg-black/60 text-white rounded-full w-10 h-10"
          >
            <Info className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Info Panel */}
      {showInfo && (
        <div className="absolute top-20 right-4 z-30 w-72 bg-black/80 backdrop-blur-md rounded-xl p-4 text-white animate-in fade-in slide-in-from-right-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium">Room Details</h4>
            <button onClick={() => setShowInfo(false)}>
              <X className="w-4 h-4 text-white/60 hover:text-white" />
            </button>
          </div>
          <div className="space-y-2 text-sm">
            <p><span className="text-white/60">Current Room:</span> {currentRoom.name}</p>
            <p><span className="text-white/60">Room:</span> {currentRoomIndex + 1} of {rooms.length}</p>
            {currentRoom.description && (
              <p className="text-white/80 text-xs mt-2">{currentRoom.description}</p>
            )}
          </div>
          <div className="mt-4 pt-3 border-t border-white/10 text-xs text-white/50">
            Use arrow keys to navigate
          </div>
        </div>
      )}

      {/* Left Side Controls */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevRoom}
          className="bg-black/40 backdrop-blur-md hover:bg-black/60 text-white rounded-full w-12 h-12"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
      </div>

      {/* Right Side Controls */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={nextRoom}
          className="bg-black/40 backdrop-blur-md hover:bg-black/60 text-white rounded-full w-12 h-12"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Bottom Controls Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        {/* Room thumbnails */}
        {showThumbnails && viewMode === "tour" && (
          <div className="flex justify-center gap-2 pb-4 px-4">
            {rooms.map((room, index) => (
              <button
                key={room.id}
                onClick={() => goToRoom(index)}
                className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                  index === currentRoomIndex 
                    ? "border-white ring-2 ring-white/40 scale-110" 
                    : "border-white/30 opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Control bar */}
        <div className="bg-gradient-to-t from-black/80 via-black/60 to-transparent pt-8 pb-4 px-4">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {/* View modes */}
            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md rounded-full p-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode("tour")}
                className={`rounded-full px-3 h-8 text-xs ${
                  viewMode === "tour" ? "bg-white text-black" : "text-white hover:bg-white/20"
                }`}
              >
                <Eye className="w-3.5 h-3.5 mr-1.5" />
                Tour
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode("dollhouse")}
                className={`rounded-full px-3 h-8 text-xs ${
                  viewMode === "dollhouse" ? "bg-white text-black" : "text-white hover:bg-white/20"
                }`}
              >
                <Move3D className="w-3.5 h-3.5 mr-1.5" />
                Dollhouse
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode("floorplan")}
                className={`rounded-full px-3 h-8 text-xs ${
                  viewMode === "floorplan" ? "bg-white text-black" : "text-white hover:bg-white/20"
                }`}
              >
                <Layers className="w-3.5 h-3.5 mr-1.5" />
                Floor Plan
              </Button>
            </div>

            {/* Room indicator */}
            <div className="text-white text-sm font-medium">
              {currentRoom.name}
            </div>

            {/* Zoom & utility controls */}
            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md rounded-full p-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleZoomOut}
                disabled={zoom <= 1}
                className="text-white hover:bg-white/20 rounded-full w-8 h-8 disabled:opacity-30"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleZoomIn}
                disabled={zoom >= 3}
                className="text-white hover:bg-white/20 rounded-full w-8 h-8 disabled:opacity-30"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
              <div className="w-px h-4 bg-white/20 mx-1" />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsAutoRotating(!isAutoRotating)}
                className={`text-white hover:bg-white/20 rounded-full w-8 h-8 ${isAutoRotating ? "bg-white/20" : ""}`}
              >
                {isAutoRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={resetView}
                className="text-white hover:bg-white/20 rounded-full w-8 h-8"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowThumbnails(!showThumbnails)}
                className={`text-white hover:bg-white/20 rounded-full w-8 h-8 ${showThumbnails ? "bg-white/20" : ""}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFullscreen}
                className="text-white hover:bg-white/20 rounded-full w-8 h-8"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
