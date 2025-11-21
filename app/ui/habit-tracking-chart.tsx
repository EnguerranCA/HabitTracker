'use client';

interface HabitTrackingChartProps {
  data: {
    date: string;
    totalHabits: number;
    completedHabits: number;
    completionRate: number;
  }[];
}

export default function HabitTrackingChart({ data }: HabitTrackingChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          📈 Évolution des habitudes
        </h3>
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">📊</div>
          <p className="text-sm">Pas encore de données à afficher</p>
        </div>
      </div>
    );
  }

  // Trouver les valeurs min/max pour l'échelle
  const maxHabits = Math.max(...data.map(d => d.totalHabits));
  const maxCompleted = Math.max(...data.map(d => d.completedHabits));
  const maxValue = Math.max(maxHabits, maxCompleted);
  
  // Dimensions du graphique
  const chartHeight = 200;
  const chartWidth = Math.max(data.length * 40, 400);

  // Fonction pour calculer la position Y
  const getY = (value: number) => {
    return chartHeight - (value / maxValue) * chartHeight;
  };

  // Générer les points pour les lignes SVG
  const totalHabitsPoints = data.map((item, index) => {
    const x = (index / (data.length - 1)) * chartWidth;
    const y = getY(item.totalHabits);
    return `${x},${y}`;
  }).join(' ');

  const completedHabitsPoints = data.map((item, index) => {
    const x = (index / (data.length - 1)) * chartWidth;
    const y = getY(item.completedHabits);
    return `${x},${y}`;
  }).join(' ');

  // Formater la date pour l'affichage
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          📈 Évolution des habitudes
        </h3>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-blue-500"></div>
            <span className="text-gray-600">Habitudes totales</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-green-500"></div>
            <span className="text-gray-600">Habitudes réalisées</span>
          </div>
        </div>
      </div>

      {/* Graphique SVG */}
      <div className="relative overflow-x-auto">
        <svg 
          width={chartWidth} 
          height={chartHeight + 40} 
          className="min-w-full"
          viewBox={`0 0 ${chartWidth} ${chartHeight + 40}`}
        >
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
                  strokeWidth="1"
                />
                <text
                  x={-5}
                  y={y + 4}
                  fontSize="10"
                  fill="#9ca3af"
                  textAnchor="end"
                >
                  {Math.round((percent / 100) * maxValue)}
                </text>
              </g>
            );
          })}

          {/* Ligne des habitudes totales */}
          <polyline
            points={totalHabitsPoints}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Ligne des habitudes réalisées */}
          <polyline
            points={completedHabitsPoints}
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Points sur les lignes */}
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * chartWidth;
            const yTotal = getY(item.totalHabits);
            const yCompleted = getY(item.completedHabits);

            return (
              <g key={index}>
                {/* Point habitudes totales */}
                <circle
                  cx={x}
                  cy={yTotal}
                  r="3"
                  fill="#3b82f6"
                  className="hover:r-4 transition-all cursor-pointer"
                />
                
                {/* Point habitudes réalisées */}
                <circle
                  cx={x}
                  cy={yCompleted}
                  r="3"
                  fill="#10b981"
                  className="hover:r-4 transition-all cursor-pointer"
                />

                {/* Labels des dates */}
                <text
                  x={x}
                  y={chartHeight + 20}
                  fontSize="10"
                  fill="#6b7280"
                  textAnchor="middle"
                  transform={`rotate(45, ${x}, ${chartHeight + 20})`}
                >
                  {formatDate(item.date)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-3 gap-4 mt-6 text-center">
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
          <div className="text-xl font-bold text-blue-700">
            {Math.round(data.reduce((sum, d) => sum + d.totalHabits, 0) / data.length)}
          </div>
          <div className="text-xs text-blue-600">Moyenne habits/jour</div>
        </div>
        
        <div className="bg-green-50 p-3 rounded-lg border border-green-200">
          <div className="text-xl font-bold text-green-700">
            {Math.round(data.reduce((sum, d) => sum + d.completedHabits, 0) / data.length)}
          </div>
          <div className="text-xs text-green-600">Moyenne réalisées/jour</div>
        </div>
        
        <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
          <div className="text-xl font-bold text-orange-700">
            {Math.round(data.reduce((sum, d) => sum + d.completionRate, 0) / data.length)}%
          </div>
          <div className="text-xs text-orange-600">Taux de réussite moyen</div>
        </div>
      </div>
    </div>
  );
}