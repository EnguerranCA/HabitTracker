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
          📊 Évolution des habitudes
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
  const maxValue = Math.max(maxHabits, maxCompleted, 1);
  
  // Dimensions du graphique
  const chartHeight = 200;
  const barWidth = 20;
  const barSpacing = 8;
  const groupSpacing = 16;
  const chartWidth = Math.max(data.length * (barWidth * 2 + barSpacing + groupSpacing), 400);

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
        <div className="flex gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>Total habitudes</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Habitudes réalisées</span>
          </div>
          <div className="ml-auto">
            <span className="font-medium">Taux moyen: {averageCompletionRate}%</span>
          </div>
        </div>
      </div>

      {/* Graphique à barres */}
      <div className="relative overflow-x-auto">
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
                  {Math.round((percent / 100) * maxValue)}
                </text>
              </g>
            );
          })}

          {/* Barres */}
          {data.map((item, index) => {
            const x = index * (barWidth * 2 + barSpacing + groupSpacing) + 20;
            
            // Hauteur des barres proportionnelle aux valeurs
            const totalHeight = (item.totalHabits / maxValue) * chartHeight;
            const completedHeight = (item.completedHabits / maxValue) * chartHeight;
            
            return (
              <g key={item.date}>
                {/* Barre total (bleu) */}
                <rect
                  x={x}
                  y={chartHeight - totalHeight}
                  width={barWidth}
                  height={totalHeight}
                  fill="#3b82f6"
                  rx={2}
                >
                  <title>{`${formatDate(item.date)}: ${item.totalHabits} habitudes au total`}</title>
                </rect>
                
                {/* Barre réalisées (vert) */}
                <rect
                  x={x + barWidth + barSpacing}
                  y={chartHeight - completedHeight}
                  width={barWidth}
                  height={completedHeight}
                  fill="#10b981"
                  rx={2}
                >
                  <title>{`${formatDate(item.date)}: ${item.completedHabits} habitudes réalisées`}</title>
                </rect>

                {/* Valeurs au-dessus des barres */}
                <text
                  x={x + barWidth / 2}
                  y={chartHeight - totalHeight - 5}
                  textAnchor="middle"
                  className="text-xs fill-gray-700 font-medium"
                >
                  {item.totalHabits}
                </text>
                <text
                  x={x + barWidth + barSpacing + barWidth / 2}
                  y={chartHeight - completedHeight - 5}
                  textAnchor="middle"
                  className="text-xs fill-gray-700 font-medium"
                >
                  {item.completedHabits}
                </text>

                {/* Date en bas */}
                <text
                  x={x + barWidth + barSpacing / 2}
                  y={chartHeight + 20}
                  textAnchor="middle"
                  className="text-xs fill-gray-600"
                >
                  {formatDate(item.date)}
                </text>
                
                {/* Taux de completion en bas */}
                <text
                  x={x + barWidth + barSpacing / 2}
                  y={chartHeight + 35}
                  textAnchor="middle"
                  className="text-xs fill-gray-500"
                >
                  {item.completionRate}%
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Résumé des statistiques */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-500">{totalPossible}</div>
            <div className="text-xs text-gray-500">Total habitudes</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-500">{totalCompleted}</div>
            <div className="text-xs text-gray-500">Réalisées</div>
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