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

  // Obtenir les pastilles pour un jour donné
  const getPastilles = (day: number) => {
    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayData = habitsData[dateKey];
    
    if (!dayData) return [];

    const pastilles = [];
    
    // Pastilles vertes pour habitudes accomplies
    for (let i = 0; i < dayData.completed; i++) {
      pastilles.push('bg-green-500');
    }
    
    // Pastilles rouges pour habitudes manquées
    for (let i = 0; i < dayData.missed; i++) {
      pastilles.push('bg-red-500');
    }

    return pastilles.slice(0, 4); // Limite à 4 pastilles max par jour
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
              <div className="h-full flex flex-col items-center justify-between">
                {/* Numéro du jour */}
                <span className={`text-sm font-medium ${
                  isToday(day) 
                    ? 'text-blue-600' 
                    : 'text-gray-900'
                }`}>
                  {day}
                </span>
                
                {/* Pastilles d'habitudes */}
                <div className="flex gap-0.5 flex-wrap justify-center">
                  {getPastilles(day).map((color, pastilleIndex) => (
                    <div
                      key={pastilleIndex}
                      className={`w-1.5 h-1.5 rounded-full ${color}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Légende */}
      <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span>Réalisé</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <span>Manqué</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
          <span>À venir</span>
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