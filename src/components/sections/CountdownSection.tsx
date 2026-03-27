'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { getbirthdayDate, getbirthdayDateISO } from '@/data/event'

interface TimeLeftState {
  totalMs: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calculateTimeLeft(targetDate: Date): TimeLeftState {
  const now = new Date()
  const diffMs = Math.max(0, targetDate.getTime() - now.getTime())

  const secondsTotal = Math.floor(diffMs / 1000)
  const days = Math.floor(secondsTotal / (60 * 60 * 24))
  const hours = Math.floor((secondsTotal % (60 * 60 * 24)) / (60 * 60))
  const minutes = Math.floor((secondsTotal % (60 * 60)) / 60)
  const seconds = Math.floor(secondsTotal % 60)

  return { totalMs: diffMs, days, hours, minutes, seconds }
}

function formatWeddingDateLabel(date: Date, iso: string): string {
  const formatter = new Intl.DateTimeFormat('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
  const base = formatter.format(date)
  const match = iso.match(/([+-]\d{2}:\d{2}|Z)$/)
  const offset = match ? match[1] : ''
  const offsetLabel = offset === 'Z' ? 'GMT' : offset ? `GMT${offset}` : ''
  return base
}

export function CountdownSection() {
  const targetDate = useMemo(() => getbirthdayDate(), [])
  const iso = useMemo(() => getbirthdayDateISO(), [])
  const [timeLeft, setTimeLeft] = useState<TimeLeftState>(() => calculateTimeLeft(targetDate))
  const [hasMounted, setHasMounted] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
useEffect(() => {
    const id = setInterval(() => setTimeLeft(calculateTimeLeft(targetDate)), 1000)
    return () => clearInterval(id)
  }, [targetDate])

  useEffect(() => {
    setHasMounted(true)
  }, [])

  // Efecto de aparición/desaparición con IntersectionObserver
  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting && entry.intersectionRatio > 0.1)
      },
      { root: null, threshold: [0, 0.1, 0.2, 0.4, 0.6, 0.8, 1] }
    )

    observer.observe(element)
    return () => {
      observer.unobserve(element)
    }
  }, [])

  // Parallax sutil en scroll para dar profundidad a los elementos cuando están en vista
  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const onScroll = () => {
      const rect = element.getBoundingClientRect()
      const viewportH = window.innerHeight || document.documentElement.clientHeight
      const center = rect.top + rect.height / 2
      const distanceFromViewportCenter = Math.abs(center - viewportH / 2)
      const normalized = Math.max(0, Math.min(1, 1 - distanceFromViewportCenter / (viewportH / 2)))
      element.style.setProperty('--parallax', normalized.toFixed(3))
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const isTimeUp = hasMounted ? timeLeft.totalMs <= 0 : false
  const dateLabel = hasMounted ? formatWeddingDateLabel(targetDate, iso) : ''
  const hh = (hasMounted ? timeLeft.hours : 0).toString().padStart(2, '0')
  const mm = (hasMounted ? timeLeft.minutes : 0).toString().padStart(2, '0')
  const ss = (hasMounted ? timeLeft.seconds : 0).toString().padStart(2, '0')
  const daySeconds = 24 * 60 * 60
  const daySecondsLeft = (hasMounted ? timeLeft.hours : 0) * 3600 + (hasMounted ? timeLeft.minutes : 0) * 60 + (hasMounted ? timeLeft.seconds : 0)
  const dayProgress = hasMounted ? Math.max(0, Math.min(1, 1 - daySecondsLeft / daySeconds)) : 0

  // Diseño sin tarjetas: tipografía protagonista y separadores sutiles

  return (
    <section
      className="relative px-5 py-6 overflow-hidden overscroll-contain"
      style={{ touchAction: 'pan-y' }}
    >
      {/* Blobs sutiles que rompen la rectitud visual en la unión */}
      <div
        className="pointer-events-none absolute -top-14 -left-16 w-40 h-40 rounded-full blur-2xl z-10"
        style={{ background: 'radial-gradient(closest-side, rgba(167,201,87,0.22), rgba(167,201,87,0))' }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-12 -right-12 w-36 h-36 rounded-full blur-2xl z-10"
        style={{ background: 'radial-gradient(closest-side, rgba(212,224,155,0.18), rgba(212,224,155,0))' }}
        aria-hidden
      />

      <div
        ref={containerRef}
        className={`relative z-10 w-full max-w-4xl mx-auto scroll-reveal ${isInView ? 'is-visible' : 'is-hidden'}`}
      >
        {/* Encabezado */}
        <div className="text-center reveal-header">
          <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#00008B]">
            { '¿Cuándo?'}
          </h3>
          <p className="mt-1.5 text-[#0000FF] font-serif capitalize text-sm sm:text-base leading-tight break-words" suppressHydrationWarning>
            { (dateLabel || ' ')}
          </p>
        </div>

        {/* Divisor floral sutil (coincide con la carta) */}
        <div className="mt-4 max-w-md mx-auto reveal-divider">
          <div className="floral-divider" />
        </div>

        {/* HH:MM:SS grande */}
        <div className="mt-5 flex items-end justify-center gap-2 sm:gap-3 reveal-time">
          <span suppressHydrationWarning className="text-5xl sm:text-6xl font-semibold text-[#00008B] tabular-nums font-mono">{hh}</span>
          <span className="pb-2 sm:pb-2.5 text-[#00008B] text-4xl sm:text-5xl">:</span>
          <span suppressHydrationWarning className="text-5xl sm:text-6xl font-semibold text-[#00008B] tabular-nums font-mono">{mm}</span>
          <span className="pb-2 sm:pb-2.5 text-[#00008B] text-4xl sm:text-5xl">:</span>
          <span suppressHydrationWarning className="text-5xl sm:text-6xl font-semibold text-[#00008B] tabular-nums font-mono">{ss}</span>
        </div>
        <div className="mt-2 flex justify-center gap-8 text-[11px] sm:text-xs tracking-wide uppercase text-[##0000FF] reveal-labels">
          <span>{ 'Horas'}</span>
          <span>{ 'Minutos'}</span>
          <span>{ 'Segundos'}</span>
        </div>

        {/* Días en texto */}
        <p className="mt-4 text-center text-[#0000FF]/90 text-sm sm:text-base reveal-days">
          { 'Faltan'} <span suppressHydrationWarning className="font-semibold tabular-nums">{hasMounted ? timeLeft.days : 0}</span> { 'días'}
        </p>

        {/* Nota */}
        <p className="mt-6 text-center text-[#0000FF]/85 text-xs sm:text-sm reveal-note">
          { 'Guarda la fecha y prepárate para una celebración inolvidable.'}
        </p>
      </div>
    </section>
  )
}

export default CountdownSection