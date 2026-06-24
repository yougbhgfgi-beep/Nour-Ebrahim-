let audio: HTMLAudioElement | null = null
let audioSrc = ""

function createAudio(src: string): HTMLAudioElement {
  const a = new Audio(src)
  a.loop = true
  a.volume = 0.3
  a.preload = "auto"
  a.load()
  audio = a
  audioSrc = src
  return a
}

function tryPlay(retries = 5): void {
  if (!audio) return
  audio.play().catch((e) => {
    if (retries > 0) {
      setTimeout(() => tryPlay(retries - 1), 600)
    }
  })
}

export function getAudio(src?: string): HTMLAudioElement {
  if (!audio) {
    createAudio(src || audioSrc)
  }
  return audio!
}

export function startAudio(src?: string) {
  if (src && src !== audioSrc) {
    if (audio) { audio.pause(); audio = null }
    createAudio(src)
  }
  if (!audio) {
    createAudio(src || audioSrc)
  }
  tryPlay()
}

export function pauseAudio() {
  if (audio && !audio.paused) audio.pause()
}

export function resumeAudio() {
  if (audio && audio.paused) tryPlay()
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
