
'use client';

import { useState, useEffect, useRef } from 'react'
import { Heart } from 'lucide-react'

export default function ValentinePage() {
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 })
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [showLoveMessage, setShowLoveMessage] = useState(false)
  const [hearts, setHearts] = useState([])
  const [trailHearts, setTrailHearts] = useState([])
  const noButtonRef = useRef(null)
  const cardRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect()
        setMousePos({ 
          x: e.clientX - rect.left, 
          y: e.clientY - rect.top 
        })
      }

      if (noButtonRef.current && !showLoveMessage) {
        const buttonRect = noButtonRef.current.getBoundingClientRect()
        const buttonCenterX = buttonRect.left + buttonRect.width / 2
        const buttonCenterY = buttonRect.top + buttonRect.height / 2
        
        const distance = Math.sqrt(
          Math.pow(e.clientX - buttonCenterX, 2) + 
          Math.pow(e.clientY - buttonCenterY, 2)
        )

        if (distance < 100) {
          const angle = Math.atan2(e.clientY - buttonCenterY, e.clientX - buttonCenterX)
          const moveX = -Math.cos(angle) * 60
          const moveY = -Math.sin(angle) * 60
          
          setNoOffset({ x: moveX, y: moveY })
          
          // Ajouter des cœurs de traînée
          setTrailHearts(prev => [...prev, {
            id: Date.now() + Math.random(),
            x: buttonCenterX - (cardRef.current?.getBoundingClientRect().left || 0),
            y: buttonCenterY - (cardRef.current?.getBoundingClientRect().top || 0)
          }])
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [showLoveMessage])

  // Nettoyer les cœurs de traînée
  useEffect(() => {
    if (trailHearts.length > 0) {
      const timer = setTimeout(() => {
        setTrailHearts(prev => prev.slice(1))
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [trailHearts])

  const handleYesClick = () => {
    // Créer explosion de cœurs
    const newHearts = []
    for (let i = 0; i < 20; i++) {
      newHearts.push({
        id: Date.now() + i,
        angle: (Math.PI * 2 * i) / 20,
        distance: Math.random() * 200 + 100
      })
    }
    setHearts(newHearts)
    
    setTimeout(() => {
      setShowLoveMessage(true)
    }, 800)
  }

  if (showLoveMessage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-red-200 to-pink-300 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md text-center animate-fadeIn">
          <div className="text-6xl mb-6 animate-bounce">💕</div>
          <h1 className="text-3xl font-bold text-pink-600 mb-4">
            Je savais que tu dirais oui ! 🥰
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Ma douce myrsha, tu illumines chaque jour de ma vie. 
            Avec toi, chaque moment est magique, chaque sourire est précieux. 
            Tu es mon cœur, mon âme, mon tout. 
            Je t'aime plus que les mots ne pourront jamais l'exprimer. 💖
          </p>
          <div className="flex justify-center gap-2">
            <Heart className="text-red-500 animate-pulse" size={32} fill="currentColor" />
            <Heart className="text-pink-500 animate-pulse delay-100" size={32} fill="currentColor" />
            <Heart className="text-red-500 animate-pulse delay-200" size={32} fill="currentColor" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-pink-100 flex items-center justify-center p-4 overflow-hidden">
      <div 
        ref={cardRef}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm relative"
      >
        {/* Cœurs d'explosion */}
        {hearts.map(heart => (
          <div
            key={heart.id}
            className="absolute text-4xl animate-heartExplosion pointer-events-none"
            style={{
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) translate(${Math.cos(heart.angle) * heart.distance}px, ${Math.sin(heart.angle) * heart.distance}px)`,
              animation: 'heartExplosion 1s ease-out forwards'
            }}
          >
            ❤️
          </div>
        ))}

        {/* Cœurs de traînée */}
        {trailHearts.map(heart => (
          <div
            key={heart.id}
            className="absolute text-2xl animate-fadeOut pointer-events-none"
            style={{
              left: heart.x,
              top: heart.y,
              transform: 'translate(-50%, -50%)'
            }}
          >
            ❤️
          </div>
        ))}

        {/* Image */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-pink-200 rounded-full flex items-center justify-center text-5xl">
            🧸
          </div>
        </div>

        {/* Texte */}
        <h2 className="text-xl font-bold text-center mb-8 text-gray-800">
         myrsha veux tu être ma valentine ? 🧸
        </h2>

        {/* Boutons */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            onClick={handleYesClick}
            className="yes-button bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all"
          >
            Yes
          </button>

          <button
            ref={noButtonRef}
            className="bg-gray-200 text-gray-600 font-semibold py-2 px-6 rounded-full shadow transition-all"
            style={{
              transform: `translate(${noOffset.x}px, ${noOffset.y}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          >
            No
          </button>
        </div>

        {/* Texte bas */}
        <p className="text-xs text-gray-400 text-center">
          "No" seems a bit shy 😳
        </p>
      </div>

      <style jsx>{`
        @keyframes heartPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        @keyframes heartExplosion {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.5);
          }
        }

        @keyframes fadeOut {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .yes-button:hover {
          animation: heartPulse 0.6s ease-in-out infinite;
        }

        .animate-heartExplosion {
          animation: heartExplosion 1s ease-out forwards;
        }

        .animate-fadeOut {
          animation: fadeOut 0.5s ease-out forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-pulse {
          animation: heartPulse 1s ease-in-out infinite;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .animate-bounce {
          animation: bounce 1s infinite;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  )
}
