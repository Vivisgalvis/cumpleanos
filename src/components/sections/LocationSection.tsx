'use client'

import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'


export function LocationSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [copied, setCopied] = useState(false)
  
   const address = 'Melgar, Tolima'
  const googleMapsUrl = 'https://maps.app.goo.gl/oHug27shtXXx2jxGA?g_st=aw'

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(googleMapsUrl)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      // Silencioso; si el navegador no soporta clipboard, no rompe la UI
    }
  }

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting && entry.intersectionRatio > 0.1),
      { root: null, threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative py-8 sm:py-10 bg-gradient-to-b from-white via-green-50/40 to-white overflow-hidden">
      {/* Fondo decorativo sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(1200px 400px at 50% -10%, rgba(167,201,87,0.10), transparent 60%), radial-gradient(800px 300px at 50% 110%, rgba(167,201,87,0.08), transparent 60%)',
        }}
      />

      <div
        ref={containerRef}
        className={`relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 scroll-reveal ${isInView ? 'is-visible' : 'is-hidden'}`}
      >
        {/* Encabezado */}
        <div className="text-center">
          <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#00008B]">
            {'¿Dónde?'}
          </h3>
          <p className="mt-1.5 text-[#0000FF] font-serif text-sm sm:text-base">
            { 'Ubicación del evento'}
          </p>
        </div>

        {/* Divisor floral */}
        <div className="mt-4 max-w-md mx-auto">
          <div className="floral-divider" />
        </div>

        {/* Contenido: Dirección centrada */}
        <div className="mt-8 flex justify-center">
          {/* Tarjeta de dirección */}
          <div className="w-full max-w-md rounded-xl border border-emerald-900/10 bg-white/80 backdrop-blur p-5 sm:p-6 shadow-sm">
            <h4 className="text-base sm:text-lg font-semibold text-[#00008B]">
              {'villa clara casa campestre'}
            </h4>
            <div className="mt-1 flex items-center gap-2">
              <p className="text-sm sm:text-base text-[#0000FF]/90">{address}</p>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center rounded-lg border border-[#00008B]/20 px-2.5 py-1.5 text-xs sm:text-sm text-[#2d5016] bg-white hover:bg-[#f1f6ea] transition-colors"
              >
                {copied }
              </button>
            </div>
            <p className="mt-1 text-sm text-[#0000FF]/85">
              { 'Fecha: 18 de Abril, 2026'}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <a
                className="inline-flex items-center gap-2 rounded-lg bg-[#00008B] px-3.5 py-2 text-white text-sm hover:bg-[#254513] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                href={googleMapsUrl}
              >
                { 'Abrir en Google Maps'}
              </a>
              <a
                className="inline-flex items-center gap-2 rounded-lg border border-[#00008B]/20 px-3.5 py-2 text-[#00008B] text-sm bg-white hover:bg-[#f1f6ea] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://waze.com/ul/hd2dzstcep`}
              >
                { 'Abrir en Waze'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


