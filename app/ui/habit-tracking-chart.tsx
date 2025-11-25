'use client';

import { useEffect, useRef } from 'react';

interface HabitTrackingChartProps {
  data: {
    date: string;
    totalHabits: number;
    completedHabits: number;
    completionRate: number;
  }[];
}

export default function HabitTrackingChart({ data }: HabitTrackingChartProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll vers la droite au montage du composant
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
    }
  }, [data]);

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          📊 Évolution des habitudes
        </h3>
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">📊</div>
          <p className="text-sm">Pas encore de données à afficher</p>
        </div>
      </div>
    );
  }

  // Échelle fixe de 0 à 100% pour le taux de complétion
  const maxValue = 100;
  
  // Dimensions du graphique
  const chartHeight = 200;
  const barWidth = 40;
  const barSpacing = 16;
  const chartWidth = Math.max(data.length * (barWidth + barSpacing), 400);

  // Formatage des dates pour affichage
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
  };

  // Calcul des statistiques
  const totalCompleted = data.reduce((sum, day) => sum + day.completedHabits, 0);
  const totalPossible = data.reduce((sum, day) => sum + day.totalHabits, 0);
  const averageCompletionRate = totalPossible > 0 ? Math.round((totalCompleted / totalPossible) * 100) : 0;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          📊 Évolution des habitudes ({data.length} jours)
        </h3>
        <div className="flex justify-between items-center text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-linear-to-r from-red-400 via-yellow-500 to-green-500 rounded"></div>
            <span>Taux de complétion quotidien</span>
          </div>
          <div>
            <span className="font-medium">Taux moyen: {averageCompletionRate}%</span>
          </div>
        </div>
      </div>

      {/* Graphique à barres */}
      <div ref={scrollContainerRef} className="relative overflow-x-auto">
        <svg width={chartWidth} height={chartHeight + 60} className="min-w-full">
          {/* Grille horizontale */}
          {[0, 25, 50, 75, 100].map((percent) => {
            const y = chartHeight - (percent / 100) * chartHeight;
            return (
              <g key={percent}>
                <line
                  x1={0}
                  y1={y}
                  x2={chartWidth}
                  y2={y}
                  stroke="#f3f4f6"
                  strokeWidth={1}
                />
                <text
                  x={-5}
                  y={y + 4}
                  textAnchor="end"
                  className="text-xs fill-gray-500"
                >
                  {percent}%
                </text>
              </g>
            );
          })}

          {/* Barres de taux de complétion */}
          {data.map((item, index) => {
            const x = index * (barWidth + barSpacing) + 20;
            
            // Hauteur de la barre proportionnelle au taux de complétion
            const barHeight = (item.completionRate / maxValue) * chartHeight;
            
            // Couleur selon le taux de complétion
            const getBarColor = (rate: number) => {
              if (rate === 100) return '#10b981'; // vert
              if (rate >= 75) return '#84cc16'; // vert lime
              if (rate >= 50) return '#eab308'; // jaune
              if (rate >= 25) return '#f97316'; // orange
              return '#ef4444'; // rouge
            };
            
            return (
              <g key={item.date}>
                {/* Barre de taux de complétion */}
                <rect
                  x={x}
                  y={chartHeight - barHeight}
                  width={barWidth}
                  height={barHeight}
                  fill={getBarColor(item.completionRate)}
                  rx={3}
                >
                  <title>{`${formatDate(item.date)}: ${item.completionRate}% (${item.completedHabits}/${item.totalHabits})`}</title>
                </rect>

                {/* Pourcentage au-dessus de la barre */}
                <text
                  x={x + barWidth / 2}
                  y={chartHeight - barHeight - 5}
                  textAnchor="middle"
                  className="text-xs fill-gray-700 font-medium"
                >
                  {item.completionRate}%
                </text>

                {/* Date en bas */}
                <text
                  x={x + barWidth / 2}
                  y={chartHeight + 20}
                  textAnchor="middle"
                  className="text-xs fill-gray-600"
                >
                  {formatDate(item.date)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Résumé des statistiques */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-green-500">{totalCompleted}/{totalPossible}</div>
            <div className="text-xs text-gray-500">Habitudes réalisées</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-500">{averageCompletionRate}%</div>
            <div className="text-xs text-gray-500">Taux moyen</div>
          </div>
        </div>
      </div>
    </div>
  );
}