'use client'

import { useState, useRef, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'


export function HeroSection() {
  // Configuración de sensibilidad del tilt
  const MAX_TILT_DEGREES = 20
  const SENSITIVITY_MOUSE = 40
  const SENSITIVITY_TOUCH = 50
  const FAST_TRANSITION = 'transform 0.12s ease-out'
  const SLOW_TRANSITION = 'transform 1.4s cubic-bezier(0.22, 1, 0.36, 1)'
  const [isFlipped, setIsFlipped] = useState(false)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isInteracting, setIsInteracting] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const searchParams = useSearchParams()


  const handleCardClick = () => {
    setIsFlipped(!isFlipped)
    // Resetear la rotación cuando se voltea la carta para que quede centrada
    setRotation({ x: 0, y: 0 })
    // Asegurar transición lenta en el flip
    setIsInteracting(false)
  }

  // Prevenir zoom por doble clic
  const handleDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    return false
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const mouseX = e.clientX
    const mouseY = e.clientY
    
    // Calcular la rotación basada en la posición del mouse (más sensible)
    const rotateY = Math.max(-MAX_TILT_DEGREES, Math.min(MAX_TILT_DEGREES, ((mouseX - centerX) / (rect.width / 2)) * SENSITIVITY_MOUSE))
    const rotateX = Math.max(-MAX_TILT_DEGREES, Math.min(MAX_TILT_DEGREES, ((centerY - mouseY) / (rect.height / 2)) * SENSITIVITY_MOUSE))
    
    setRotation({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    // Volver a la posición normal cuando el mouse sale
    setRotation({ x: 0, y: 0 })
    setIsInteracting(false)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if ((e as any).cancelable) e.preventDefault()
    if (!cardRef.current) return
    
    const touch = e.touches[0]
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const touchX = touch.clientX
    const touchY = touch.clientY
    
    // Calcular la rotación basada en la posición del toque (más sensible)
    const rotateY = Math.max(-MAX_TILT_DEGREES, Math.min(MAX_TILT_DEGREES, ((touchX - centerX) / (rect.width / 2)) * SENSITIVITY_TOUCH))
    const rotateX = Math.max(-MAX_TILT_DEGREES, Math.min(MAX_TILT_DEGREES, ((centerY - touchY) / (rect.height / 2)) * SENSITIVITY_TOUCH))
    
    setRotation({ x: rotateX, y: rotateY })
  }

  const handleTouchEnd = () => {
    // Volver a la posición normal cuando termina el toque
    setRotation({ x: 0, y: 0 })
    setIsInteracting(false)
  }

  const handleInteractionStart = () => {
    setIsInteracting(true)
  }

  const handleMouseUp = () => {
    setIsInteracting(false)
  }

  // Efecto para bloquear el scroll de la página mientras se interactúa con la tarjeta
  useEffect(() => {
    if (!isInteracting) return

    const preventDefaultIfCancelable = (event: Event) => {
      if ((event as any).cancelable) {
        event.preventDefault()
      }
    }

    const endInteraction = () => setIsInteracting(false)

    const originalBodyOverflow = document.body.style.overflow
    const originalHtmlOverflow = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    window.addEventListener('wheel', preventDefaultIfCancelable, { passive: false })
    window.addEventListener('touchmove', preventDefaultIfCancelable, { passive: false })
    window.addEventListener('mouseup', endInteraction)
    window.addEventListener('touchend', endInteraction)

    return () => {
      document.body.style.overflow = originalBodyOverflow
      document.documentElement.style.overflow = originalHtmlOverflow
      window.removeEventListener('wheel', preventDefaultIfCancelable as EventListener)
      window.removeEventListener('touchmove', preventDefaultIfCancelable as EventListener)
      window.removeEventListener('mouseup', endInteraction)
      window.removeEventListener('touchend', endInteraction)
    }
  }, [isInteracting])

  // Función para el efecto paralaje de la foto
  const getPhotoParallaxStyle = () => {
    // Movimiento sutil en dirección opuesta a la rotación de la carta
    const offsetX = rotation.y * -0.8 // Aumentado para mayor visibilidad
    const offsetY = rotation.x * 0.5  // Aumentado para mayor efecto
    
    return {
      transform: `translate(${offsetX}px, ${offsetY}px) scale(1.05) translateZ(0)`,
      transition: isInteracting ? FAST_TRANSITION : SLOW_TRANSITION
    }
  }

  // Función para el efecto paralaje de elementos del frente
  const getFrontParallaxStyle = (intensity = 1) => {
    // Movimiento más pronunciado para que sea más visible
    const offsetX = rotation.y * -1.2 * intensity
    const offsetY = rotation.x * 0.8 * intensity
    
    return {
      transform: `translate(${offsetX}px, ${offsetY}px)`,
      transition: isInteracting ? FAST_TRANSITION : SLOW_TRANSITION
    }
  }

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-50 p-4">
      <div className="perspective-1000">
        <div
          ref={cardRef}
          className={`birthday-card ${isFlipped ? 'flipped' : ''}`}
          style={{
            touchAction: isInteracting ? 'none' as const : 'manipulation' as const,
            transform: isFlipped 
              ? `rotateX(${rotation.x}deg) rotateY(${180 + rotation.y}deg)`
              : `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: isInteracting ? FAST_TRANSITION : SLOW_TRANSITION
          }}
          onClick={handleCardClick}
          onDoubleClick={handleDoubleClick}
          onMouseMove={handleMouseMove}
          onMouseDown={handleInteractionStart}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleInteractionStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Frente de la invitación */}
          <div className="card-front">
            <div className="card-border">
              <div className="card-header" style={{paddingTop: '10px', paddingBottom: '5px', marginBottom: '5px'}}>
                <div className="birthday-ornament" style={getFrontParallaxStyle(1.2)}></div>
                <p className="main-message" style={getFrontParallaxStyle(0.7)}>
                 
                   Estás cordialmente invitado al cumpleaños de 
                  
                </p>
              </div>
              
              <div className="card-content">
                <div className="guest-name-container" style={{marginTop: '0px', marginBottom: '30px'}}>
                  <div className="floral-divider" style={getFrontParallaxStyle(1.5)}></div>
                  <h1 className="guest-name" style={getFrontParallaxStyle(0.8)}>Javier Escobar</h1>
                  <div className="floral-divider" style={getFrontParallaxStyle(1.5)}></div>
                </div>
                
                <div className="invitation-message" style={getFrontParallaxStyle(0.6)}>
                  <p className="main-message"></p>
                  <p className="sub-message"></p>
                </div>
                
                <div className="decorative-elements">
                  <div className="floral-elements" style={getFrontParallaxStyle(1.8)}>
                   
                  </div>
                </div>
              </div>
              
              <div className="card-footer">
                <p className="birthday-date" style={getFrontParallaxStyle(0.5)}>
                  {
                    'No cumples 40, eres de 20 con 20 años de experiencia'
                  }
                </p>
                <div className="elegant-flourish" style={getFrontParallaxStyle(1.4)}></div>
              </div>
            </div>
          </div>

          {/* Reverso de la invitación */}
          <div className="card-back">
            <div className="card-border">
              {/* Elementos decorativos elegantes */}
              <div className="back-decorative-elements">
                {/* Hojas decorativas en las esquinas */}
                <div className="corner-leaves">
                  <div className="leaf leaf-top-left" style={getFrontParallaxStyle(2.2)}></div>
                  <div className="leaf leaf-top-right" style={getFrontParallaxStyle(1.8)}></div>
                  <div className="leaf leaf-bottom-left" style={getFrontParallaxStyle(2.5)}></div>
                  <div className="leaf leaf-bottom-right" style={getFrontParallaxStyle(1.9)}></div>
                </div>
                
                {/* Ornamentos florales en los bordes */}
                <div className="border-ornaments">
                  <div className="ornament ornament-top" style={getFrontParallaxStyle(1.5)}></div>
                  <div className="ornament ornament-bottom" style={getFrontParallaxStyle(1.7)}></div>
                  <div className="ornament ornament-left" style={getFrontParallaxStyle(2.0)}></div>
                  <div className="ornament ornament-right" style={getFrontParallaxStyle(1.6)}></div>
                </div>
                
                {/* Detalles florales sutiles */}
                <div className="floating-details">
                  <div className="detail detail-1" style={getFrontParallaxStyle(2.8)}></div>
                  <div className="detail detail-2" style={getFrontParallaxStyle(1.4)}></div>
                  <div className="detail detail-3" style={getFrontParallaxStyle(2.1)}></div>
                  <div className="detail detail-4" style={getFrontParallaxStyle(1.9)}></div>
                </div>
              </div>
              
              <div className="photo-container">
                <img
                  src="./assets/photo-1.jpg"
                  alt="foto de javi"
                  className="couple-photo"
                  style={{ 
                    ...getPhotoParallaxStyle()
                  }}
                  loading="eager"
                />
                <div className="photo-overlay"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de scroll: "Baja para ver más" */}
      <div
        className="scroll-cue"
        role="button"
        aria-label="Ir a la siguiente sección"
        onClick={() => {
          if (isInteracting) return
          const heroSection = document.querySelector('section')
          const next = heroSection?.nextElementSibling as HTMLElement | null
          if (next) {
            next.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }}
      >
        <div className="arrows">
          <div className="chevron" />
          <div className="chevron" />
          <div className="chevron" />
        </div>
      </div>

    </section>
  )
}
