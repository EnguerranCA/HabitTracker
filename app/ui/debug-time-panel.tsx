'use client';

import { useState, useEffect } from 'react';
import { 
  CalendarIcon, 
  PlusIcon, 
  ArrowPathIcon, 
  XMarkIcon,
  ChevronRightIcon,
  ChevronLeftIcon 
} from '@heroicons/react/24/outline';
import {
  isDebugMode,
  getCurrentDate,
  setDebugDate,
  resetDebugDate,
  addDays,
  addWeeks,
  formatDebugDate
} from '@/app/lib/debug-date';

export default function DebugTimePanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  useEffect(() => {
    // Mettre à jour la date courante au montage du composant
    setCurrentDate(getCurrentDate());
  }, []);

  // Ne pas afficher si ce n'est pas le mode debug
  if (!isDebugMode()) {
    return null;
  }

  const handleAddDay = () => {
    const newDate = addDays(currentDate, 1);
    setDebugDate(newDate);
    setCurrentDate(newDate);
    // Recharger la page pour appliquer les changements
    window.location.reload();
  };

  const handleSubtractDay = () => {
    const newDate = addDays(currentDate, -1);
    setDebugDate(newDate);
    setCurrentDate(newDate);
    window.location.reload();
  };

  const handleAddWeek = () => {
    const newDate = addWeeks(currentDate, 1);
    setDebugDate(newDate);
    setCurrentDate(newDate);
    window.location.reload();
  };

  const handleSubtractWeek = () => {
    const newDate = addWeeks(currentDate, -1);
    setDebugDate(newDate);
    setCurrentDate(newDate);
    window.location.reload();
  };

  const handleReset = () => {
    resetDebugDate();
    setCurrentDate(new Date());
    window.location.reload();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Bouton d'ouverture */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
          title="Debug temporel"
        >
          <CalendarIcon className="w-6 h-6" />
        </button>
      )}

      {/* Panel debug */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-purple-200 p-6 w-80">
          {/* En-tête */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-purple-800 flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              Debug Temporel
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <XMarkIcon className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Date actuelle */}
          <div className="mb-6 p-4 bg-purple-50 rounded-xl">
            <div className="text-sm text-purple-600 font-medium mb-1">Date simulée :</div>
            <div className="text-lg font-bold text-purple-800">
              {formatDebugDate(currentDate)}
            </div>
            <div className="text-sm text-purple-500 mt-1">
              {currentDate.toISOString().split('T')[0]}
            </div>
          </div>

          {/* Contrôles de jour */}
          <div className="mb-4">
            <div className="text-sm font-medium text-gray-700 mb-2">Contrôle par jour :</div>
            <div className="flex gap-2">
              <button
                onClick={handleSubtractDay}
                className="flex-1 bg-red-100 text-red-700 px-4 py-2 rounded-xl hover:bg-red-200 transition-colors flex items-center justify-center gap-2"
              >
                <ChevronLeftIcon className="w-4 h-4" />
                -1 jour
              </button>
              <button
                onClick={handleAddDay}
                className="flex-1 bg-green-100 text-green-700 px-4 py-2 rounded-xl hover:bg-green-200 transition-colors flex items-center justify-center gap-2"
              >
                +1 jour
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Contrôles de semaine */}
          <div className="mb-6">
            <div className="text-sm font-medium text-gray-700 mb-2">Contrôle par semaine :</div>
            <div className="flex gap-2">
              <button
                onClick={handleSubtractWeek}
                className="flex-1 bg-orange-100 text-orange-700 px-4 py-2 rounded-xl hover:bg-orange-200 transition-colors flex items-center justify-center gap-2"
              >
                <ChevronLeftIcon className="w-4 h-4" />
                -1 semaine
              </button>
              <button
                onClick={handleAddWeek}
                className="flex-1 bg-blue-100 text-blue-700 px-4 py-2 rounded-xl hover:bg-blue-200 transition-colors flex items-center justify-center gap-2"
              >
                +1 semaine
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bouton reset */}
          <button
            onClick={handleReset}
            className="w-full bg-gray-600 text-white px-4 py-3 rounded-xl hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
          >
            <ArrowPathIcon className="w-5 h-5" />
            Retour à la date réelle
          </button>

          {/* Note */}
          <div className="mt-4 text-xs text-gray-500 text-center">
            Mode développement uniquement
          </div>
        </div>
      )}
    </div>
  );
}