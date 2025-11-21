'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';

interface DayDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: string;
  habits: {
    name: string;
    emoji: string;
    completed: boolean;
    type: 'GOOD' | 'BAD';
  }[];
}

export default function DayDetailModal({ isOpen, onClose, date, habits }: DayDetailModalProps) {
  if (!isOpen) return null;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const completedHabits = habits.filter(h => h.completed);
  const missedHabits = habits.filter(h => !h.completed);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {formatDate(date)}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Habitudes réalisées */}
          {completedHabits.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-green-700 mb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Réalisées ({completedHabits.length})
              </h3>
              <div className="space-y-2">
                {completedHabits.map((habit, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 bg-green-50 rounded-lg border border-green-200">
                    <span className="text-lg">{habit.emoji}</span>
                    <span className="text-sm text-green-800">{habit.name}</span>
                    <span className="ml-auto text-xs text-green-600">
                      {habit.type === 'GOOD' ? '✓' : '✗'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Habitudes manquées */}
          {missedHabits.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-red-700 mb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                Manquées ({missedHabits.length})
              </h3>
              <div className="space-y-2">
                {missedHabits.map((habit, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 bg-red-50 rounded-lg border border-red-200">
                    <span className="text-lg opacity-50">{habit.emoji}</span>
                    <span className="text-sm text-red-800">{habit.name}</span>
                    <span className="ml-auto text-xs text-red-600">
                      {habit.type === 'GOOD' ? '✗' : '✓'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Aucune habitude */}
          {habits.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-2">📅</div>
              <p className="text-sm">Aucune habitude enregistrée ce jour</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
          <div className="flex justify-between text-xs text-gray-600">
            <span>Total: {habits.length} habitudes</span>
            <span>
              Réussite: {habits.length > 0 ? Math.round((completedHabits.length / habits.length) * 100) : 0}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}