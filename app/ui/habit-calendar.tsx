'use client';

import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import DayDetailModal from './day-detail-modal';

interface HabitCalendarProps {
  habitsData?: {
    [key: string]: { // date au format YYYY-MM-DD
      completed: number;
      missed: number;
      total: number;
      habits?: {
        name: string;
        emoji: string;
        completed: boolean;
        type: 'GOOD' | 'BAD';
      }[];
    }
  };
}

const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const MONTHS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

export default function HabitCalendar({ habitsData = {} }: HabitCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Premiers et derniers jours du mois
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  
  // Jour de la semaine du premier jour (0 = dimanche, on ajuste pour lundi = 0)
  const firstDayWeekday = (firstDayOfMonth.getDay() + 6) % 7;
  
  // Nombre de jours dans le mois
  const daysInMonth = lastDayOfMonth.getDate();

  // Navigation
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Générer les jours du calendrier
  const generateCalendarDays = () => {
    const days = [];
    
    // Jours vides au début
    for (let i = 0; i < firstDayWeekday; i++) {
      days.push(null);
    }
    
    // Jours du mois
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  // Obtenir le taux de réussite pour un jour donné
  const getCompletionRate = (day: number) => {
    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayData = habitsData[dateKey];
    
    if (!dayData || dayData.total === 0) return null;

    const rate = Math.round((dayData.completed / dayData.total) * 100);
    return {
      percentage: rate,
      completed: dayData.completed,
      total: dayData.total,
      isEmpty: false
    };
  };

  // Vérifier si c'est aujourd'hui
  const isToday = (day: number) => {
    const today = new Date();
    return today.getFullYear() === year && 
           today.getMonth() === month && 
           today.getDate() === day;
  };

  const handleDayClick = (day: number) => {
    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateKey);
    setIsModalOpen(true);
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      {/* En-tête du calendrier */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPreviousMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
        </button>
        
        <h2 className="text-lg font-semibold text-gray-900">
          {MONTHS[month]} {year}
        </h2>
        
        <button
          onClick={goToNextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronRightIcon className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Jours de la semaine */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Grille du calendrier */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`
              aspect-square p-1 rounded-lg cursor-pointer transition-colors
              ${day ? 'hover:bg-gray-50' : ''}
              ${day && isToday(day) ? 'bg-blue-50 border border-blue-200' : ''}
            `}
            onClick={day ? () => handleDayClick(day) : undefined}
          >
            {day && (
              <div className="h-full flex flex-col items-center justify-between p-1">
                {/* Numéro du jour */}
                <span className={`text-sm font-medium ${
                  isToday(day) 
                    ? 'text-blue-600' 
                    : 'text-gray-900'
                }`}>
                  {day}
                </span>
                
                {/* Jauge de progression */}
                {(() => {
                  const completionData = getCompletionRate(day);
                  if (!completionData) return null;
                  
                  return (
                    <div className="w-full mt-1">
                      {/* Barre de progression */}
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-300 ${
                            completionData.percentage === 100 
                              ? 'bg-green-500' 
                              : completionData.percentage >= 75 
                              ? 'bg-lime-500'
                              : completionData.percentage >= 50 
                              ? 'bg-yellow-500'
                              : completionData.percentage >= 25
                              ? 'bg-orange-500'
                              : 'bg-red-400'
                          }`}
                          style={{ width: `${completionData.percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Légende */}
      <div className="flex items-center justify-center gap-3 mt-4 text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <div className="w-3 h-2 rounded-full bg-green-500"></div>
          <span>100%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-2 rounded-full bg-lime-500"></div>
          <span>75%+</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-2 rounded-full bg-yellow-500"></div>
          <span>50%+</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-2 rounded-full bg-orange-500"></div>
          <span>25%+</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-2 rounded-full bg-red-400"></div>
          <span>&lt;25%</span>
        </div>
      </div>

      {/* Modal détail du jour */}
      <DayDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        date={selectedDate || ''}
        habits={selectedDate ? (habitsData[selectedDate]?.habits || []) : []}
      />
    </div>
  );
}