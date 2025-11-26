'use client';

import { useState, useEffect, useTransition } from 'react';
import Image from 'next/image';
import { getHedgehogStage } from '@/app/lib/xp-system';
import { feedHedgehog } from '@/app/lib/actions';

interface Particle {
  id: number;
  x: number;
  y: number;
  delay: number;
  targetX: number;
  targetY: number;
  deltaX: number;
  deltaY: number;
}

interface HedgehogProps {
  score: number;
  level?: number;
  userId?: string;
  glandes?: number;
}

export default function Hedgehog({ score, level = 1, userId, glandes = 0 }: HedgehogProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isPending, startTransition] = useTransition();
  const [feedMessage, setFeedMessage] = useState<string>('');
  
  // Calculer le stade du hérisson
  const { stage, stageNumber } = getHedgehogStage(level);

  const handleFeed = () => {
    if (!userId || isPending) return;
    
    startTransition(async () => {
      try {
        const result = await feedHedgehog(userId);
        
        if (result.success) {
          const message = 'leveledUp' in result && result.leveledUp 
            ? `+${result.xpGained} XP ! 🎉 Niveau ${result.newLevel} atteint !`
            : `+${result.xpGained} XP ! Hérisson nourri !`;
          setFeedMessage(message);
          // Déclencher animation de nourrissage
          triggerNutAnimation(200, 200);
          // Effacer le message après 3 secondes
          setTimeout(() => setFeedMessage(''), 3000);
        } else {
          setFeedMessage(result.error || 'Erreur lors du nourrissage');
          setTimeout(() => setFeedMessage(''), 3000);
        }
      } catch (error) {
        console.error('Erreur:', error);
        setFeedMessage('Erreur lors du nourrissage');
        setTimeout(() => setFeedMessage(''), 3000);
      }
    });
    console.log('Nourrir le hérisson !');
  };

  // Fonction pour déclencher l'animation des glands
  const triggerNutAnimation = (fromX: number, fromY: number) => {
    // Trouver la position du compteur de score
    const scoreBadge = document.getElementById('score-badge');
    if (!scoreBadge) return;
    
    const scoreBadgeRect = scoreBadge.getBoundingClientRect();
    const targetX = scoreBadgeRect.left + scoreBadgeRect.width / 2;
    const targetY = scoreBadgeRect.top + scoreBadgeRect.height / 2;
    
    const newParticles: Particle[] = [];
    
    // Créer 5-8 glands avec des positions et délais aléatoires
    for (let i = 0; i < Math.floor(Math.random() * 4) + 5; i++) {
      newParticles.push({
        id: Date.now() + i,
        x: fromX + (Math.random() - 0.5) * 60, // Spread autour de la position de départ
        y: fromY + (Math.random() - 0.5) * 30,
        delay: Math.random() * 200, // Délai random jusqu'à 200ms
        targetX: targetX + (Math.random() - 0.5) * 20, // Petit spread autour du compteur
        targetY: targetY + (Math.random() - 0.5) * 20,
        deltaX: targetX - fromX,
        deltaY: targetY - fromY,
      });
  };
  
  const triggerNutAnimation = () => {
    // Animation simple lors du nourrissage
    const newParticle: Particle = {
      id: Date.now(),
      x: 200, // Centre approximatif du hérisson
      y: 200,
      delay: 0,
      targetX: 0,
      targetY: -50,
      deltaX: 0,
      deltaY: -50
    };
    
    setParticles(prev => [...prev, newParticle]);
    
    // Nettoyer après l'animation
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== newParticle.id));
    }, 2000);
    }
    
    setParticles(prev => [...prev, ...newParticles]);
    
    // Effet sur le compteur quand les glands arrivent
    setTimeout(() => {
      const scoreBadge = document.getElementById('score-badge');
      if (scoreBadge) {
        scoreBadge.style.animation = 'score-bounce 0.6s ease-out';
        setTimeout(() => {
          scoreBadge.style.animation = '';
        }, 600);
      }
    }, 1800);
    
    // Nettoyer les particules après l'animation
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 2500);
  };

  // Exposer la fonction pour les autres composants
  useEffect(() => {
    // Stocker la fonction dans window pour l'accès global
    (window as any).triggerNutAnimation = triggerNutAnimation;
  }, []);
  return (
    <div className="relative flex flex-col items-center p-6">
      {/* Particules animées de glands */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute pointer-events-none z-30 text-2xl"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            '--target-x': `${particle.deltaX}px`,
            '--target-y': `${particle.deltaY}px`,
            animationDelay: `${particle.delay}ms`,
          } as React.CSSProperties}
        >
          <div className="animate-nut-to-counter">
            <Image src="/gland.webp" alt="Gland" width={20} height={20} className="inline-block" />
          </div>
        </div>
      ))}

      {/* Score badge */}
      <div id="score-badge" className="absolute top-4 right-4 bg-primary-500 text-white px-4 py-2 rounded-full text-lg font-bold shadow-lg z-20">
        {score} 
        <span className="ml-1">
          <Image src="/gland.webp" alt="Gland" width={20} height={20} className="inline-block" />
        </span>
      </div>
      
      {/* Environnement du hérisson */}
      <div className="w-full max-w-sm min-w-[20rem] min-h-[20rem] bg-blue-300 rounded-3xl relative overflow-hidden shadow-lg">
        {/* Montagnes en arrière-plan */}
        <div className="absolute bottom-0 w-full">
          {/* Montagnes */}
          <div className="absolute bottom-0 left-0 w-32 h-20 bg-gray-400 rounded-t-full transform -translate-x-8"></div>
          <div className="absolute bottom-0 right-0 w-40 h-24 bg-gray-300 rounded-t-full transform translate-x-10"></div>
          
          {/* Herbe */}
          <div className="absolute bottom-0 w-full h-16 bg-green-500 rounded-t-3xl"></div>
          <div className="absolute bottom-0 w-full h-8 bg-green-600"></div>
          
          {/* Petites fleurs */}
          <div className="absolute bottom-8 left-6 text-xs">🌸</div>
          <div className="absolute bottom-12 right-8 text-xs">🌼</div>
          <div className="absolute bottom-6 left-1/3 text-xs">🌺</div>
        </div>
        
        {/* Informations niveau au-dessus du hérisson */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center z-10">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg border-2 border-primary-300">
            <div className="text-sm font-bold text-primary-700">Niveau {level}</div>
            <div className="text-xs text-primary-600">{stage}</div>
          </div>
        </div>
        
        {/* Hérisson au centre */}
        <Image
        width={150}
        height={150}
          src="/herisson-flat.png"
          alt="Hérisson"
          className="w-64 h-64 object-contain absolute bottom-0 left-1/2 transform -translate-x-1/2 drop-shadow-lg"
        />

      </div>
      
      {/* Message de feedback */}
      {feedMessage && (
        <div className="mt-4 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium text-center">
          {feedMessage}
        </div>
      )}
      
      {/* Bouton Nourrir */}
      <button
        onClick={handleFeed}
        disabled={isPending || glandes < 1}
        className={`mt-6 px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition-colors flex items-center gap-2 ${
          isPending || glandes < 1 
            ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
            : 'bg-primary-500 text-white hover:bg-primary-600'
        }`}
      >
        <Image src="/gland.webp" alt="Gland" width={20} height={20} className="inline-block" />
        {isPending ? 'Nourrissage...' : `Nourrir (${glandes} glands)`}
      </button>
    </div>
  );
}