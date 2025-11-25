'use client';

import { useState, useEffect } from 'react';
import { 
  CalendarIcon, 
  PlusIcon, 
  ArrowPathIcon,
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

export default function DebugDateButton() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [showDebugMode, setShowDebugMode] = useState(false);

  useEffect(() => {
    // Debug: logs pour tracer l'exécution
    console.log('Debug button - NODE_ENV:', process.env.NODE_ENV);
    console.log('Debug button - NEXT_PUBLIC_DEBUG_MODE:', process.env.NEXT_PUBLIC_DEBUG_MODE);
    
    // Vérifier le mode debug et mettre à jour la date
    const debugModeEnabled = isDebugMode();
    console.log('Debug button - isDebugMode():', debugModeEnabled);
    
    setShowDebugMode(debugModeEnabled);
    
    if (debugModeEnabled) {
      setCurrentDate(getCurrentDate());
    }
  }, []);

  console.log('Debug button - showDebugMode:', showDebugMode);

  // Pour déboguer : forcer l'affichage temporairement
  // TODO: Remettre la condition normale
  if (!showDebugMode) {
    return null;
  }

  const handleAddDay = () => {
    const newDate = addDays(currentDate, 1);
    setDebugDate(newDate);
    setCurrentDate(newDate);
    window.location.reload();
  };

  const handleSubtractDay = () => {
    const newDate = addDays(currentDate, -1);
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
    <div className="flex flex-col items-center space-y-1 p-2">
      {/* Date actuelle */}
      <div className="text-xs text-primary-100 text-center leading-3 mb-1">
        {currentDate.toLocaleDateString('fr-FR', { 
          day: '2-digit', 
          month: '2-digit' 
        })}
      </div>
      
      {/* Contrôles */}
      <div className="flex items-center space-x-1">
        <button
          onClick={handleSubtractDay}
          className="p-1 bg-primary-600 rounded hover:bg-primary-700 transition-colors"
          title="Jour précédent"
        >
          <ChevronLeftIcon className="w-3 h-3" />
        </button>
        
        <button
          onClick={handleReset}
          className="p-1 bg-primary-600 rounded hover:bg-primary-700 transition-colors"
          title="Reset à aujourd'hui"
        >
          <CalendarIcon className="w-4 h-4" />
        </button>
        
        <button
          onClick={handleAddDay}
          className="p-1 bg-primary-600 rounded hover:bg-primary-700 transition-colors"
          title="Jour suivant"
        >
          <ChevronRightIcon className="w-3 h-3" />
        </button>
      </div>
      
      <span className="text-[10px] text-primary-200 font-medium">Debug</span>
    </div>
  );
}