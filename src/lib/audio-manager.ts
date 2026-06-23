let audio: HTMLAudioElement | null = null
let audioSrc = ""

export function getAudio(src?: string): HTMLAudioElement {
  if (!audio) {
    audioSrc = src || audioSrc
    audio = new Audio(audioSrc)
    audio.loop = true
    audio.volume = 0.3
    audio.preload = "auto"
  }
  return audio
}

export function startAudio(src?: string) {
  if (src && src !== audioSrc) {
    if (audio) { audio.pause(); audio = null }
    audioSrc = src
  }
  const a = getAudio(src)
  a.play().catch(() => {})
}

export function pauseAudio() {
  if (audio && !audio.paused) audio.pause()
}

export function resumeAudio() {
  if (audio && audio.paused) audio.play().catch(() => {})
}

export function isAudioPlaying() {
  return audio ? !audio.paused : false
}

export function cleanupAudio() {
  if (audio) {
    audio.pause()
    audio = null
  }
}
