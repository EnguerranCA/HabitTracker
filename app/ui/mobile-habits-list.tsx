'use client';

import { useState, useTransition } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { toggleHabitCompletion } from '@/app/lib/actions';

interface HabitWithCompletion {
  id: string;
  name: string;
  emoji: string;
  type: 'GOOD' | 'BAD';
  frequency: 'DAILY' | 'WEEKLY' | 'CUSTOM';
  isCompletedToday: boolean;
  logs: { id: string; habitId: string; date: Date; completed: boolean }[];
}

interface MobileHabitsListProps {
  initialHabits: HabitWithCompletion[];
}

export default function MobileHabitsList({ initialHabits }: MobileHabitsListProps) {
  const [habits, setHabits] = useState(initialHabits);
  const [isPending, startTransition] = useTransition();

  const handleToggle = async (habitId: string) => {
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return;

    const newCompletedState = !habit.isCompletedToday;
    
    // Mise à jour optimiste de l'UI
    setHabits(prev => 
      prev.map(h => 
        h.id === habitId 
          ? { ...h, isCompletedToday: newCompletedState }
          : h
      )
    );

    // Appel de l'action serveur
    startTransition(async () => {
      try {
        await toggleHabitCompletion(habitId, newCompletedState);
      } catch (error) {
        console.error('Erreur lors du toggle:', error);
        // En cas d'erreur, on revert l'état
        setHabits(prev => 
          prev.map(h => 
            h.id === habitId 
              ? { ...h, isCompletedToday: !newCompletedState }
              : h
          )
        );
      }
    });
  };

  if (habits.length === 0) {
    return (
      <div className="text-center py-8 text-foreground-secondary">
        <span className="text-4xl mb-2 block">🦔</span>
        <p>Aucune habitude créée</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 pb-20"> {/* pb-20 pour éviter la navigation mobile */}
      {habits.map((habit) => (
        <div
          key={habit.id}
          className={`flex items-center justify-between p-4 rounded-2xl transition-all ${
            habit.type === 'GOOD' 
              ? 'bg-blue-500 text-white' 
              : 'bg-purple-500 text-white'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{habit.emoji}</span>
            <span className="font-medium text-white">{habit.name}</span>
          </div>
          
          <button
            onClick={() => handleToggle(habit.id)}
            disabled={isPending}
            className={`w-8 h-8 rounded-lg border-2 border-white flex items-center justify-center transition-all ${
              habit.isCompletedToday
                ? 'bg-white text-blue-500'
                : 'bg-transparent'
            } ${isPending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {habit.isCompletedToday && (
              <CheckIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      ))}
    </div>
  );
}