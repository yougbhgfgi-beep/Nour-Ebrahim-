"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { getAudio, pauseAudio, resumeAudio, isAudioPlaying } from "@/lib/audio-manager"

interface MusicPlayerProps {
  audioSrc: string
}

export function MusicPlayer({ audioSrc }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const audio = getAudio(audioSrc)
    setIsPlaying(!audio.paused)
  }, [audioSrc])

  useEffect(() => {
    const audio = getAudio(audioSrc)
    const update = () => setProgress((audio.currentTime / audio.duration) * 100)
    audio.addEventListener("timeupdate", update)
    return () => audio.removeEventListener("timeupdate", update)
  }, [audioSrc])

  useEffect(() => {
    const handlePause = () => setIsPlaying(false)
    const handleResume = () => setIsPlaying(true)
    window.addEventListener("pause-music", handlePause)
    window.addEventListener("resume-music", handleResume)
    return () => {
      window.removeEventListener("pause-music", handlePause)
      window.removeEventListener("resume-music", handleResume)
    }
  }, [])

  const togglePlay = useCallback(() => {
    if (isAudioPlaying()) { pauseAudio(); setIsPlaying(false) }
    else { resumeAudio(); setIsPlaying(true) }
  }, [])

  const toggleMute = useCallback(() => {
    const audio = getAudio(audioSrc)
    audio.muted = !isMuted
    setIsMuted(!isMuted)
  }, [isMuted, audioSrc])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 left-4 z-[1000] glass rounded-full px-4 py-2 flex items-center gap-3"
    >
      <button onClick={togglePlay} className="text-foreground hover:text-primary transition-colors">
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </button>

      <div className="w-20 h-1 rounded-full bg-muted overflow-hidden hidden md:block">
        <motion.div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }} />
      </div>

      <button onClick={toggleMute} className="text-foreground hover:text-primary transition-colors">
        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>
    </motion.div>
  )
}
