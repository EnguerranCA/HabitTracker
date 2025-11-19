'use client';

interface HedgehogProps {
  score: number;
}

export default function Hedgehog({ score }: HedgehogProps) {
  const handleFeed = () => {
    // TODO: Implémenter la logique de nourrissage
    console.log('Nourrir le hérisson !');
  };
  return (
    <div className="relative flex flex-col items-center p-6">
      {/* Score badge */}
      <div className="absolute top-4 right-4 bg-primary-500 text-white px-4 py-2 rounded-full text-lg font-bold shadow-lg z-20">
        {score} 
        <span className="ml-1">🌰</span>
      </div>
      
      {/* Environnement du hérisson */}
      <div className="w-full max-w-sm aspect-square bg-blue-300 rounded-3xl relative overflow-hidden shadow-lg">
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
        
        {/* Hérisson au centre */}
        <img
          src="/herisson-flat.png"
          alt="Hérisson"
          className="w-64 h-64 object-contain absolute bottom-0 left-1/2 transform -translate-x-1/2 drop-shadow-lg"
        />

      </div>
      
      {/* Bouton Nourrir */}
      <button
        onClick={handleFeed}
        className="mt-6 bg-primary-500 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-primary-600 transition-colors flex items-center gap-2"
      >
        <span>🌰</span>
        Nourrir
      </button>
    </div>
  );
}