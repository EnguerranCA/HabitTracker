'use client';

import { useState } from 'react';
import HabitsList from './habits-list';
import { toggleHabitCompletion } from '@/app/lib/actions';

interface Habit {
  id: string;
  name: string;
  emoji: string;
  frequency: 'DAILY' | 'WEEKLY' | 'CUSTOM';
  type: 'GOOD' | 'BAD';
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  description: string | null;
  targetCount: number;
  isActive: boolean;
}

interface DashboardHabitsClientProps {
  initialHabits: Habit[];
}

export default function DashboardHabitsClient({ initialHabits }: DashboardHabitsClientProps) {
  const [habits, setHabits] = useState(initialHabits);

  const handleToggleHabit = async (habitId: string, completed: boolean) => {
    try {
      await toggleHabitCompletion(habitId, completed);
      // Optionnel: mettre à jour l'état local si nécessaire
    } catch (error) {
      console.error('Erreur lors du toggle:', error);
    }
  };

  const onHabitCreated = () => {
    // Rafraîchir la page pour récupérer les nouvelles habitudes
    window.location.reload();
  };

  return (
    <>
      {/* Statistique dynamique */}
      <div className="rounded-xl bg-background border border-border p-4 shadow-md">
        <div className="flex p-4">
          <h3 className="ml-2 text-sm font-medium text-foreground">
            Mes habitudes actuelles
          </h3>
        </div>
        <p className="truncate rounded-xl bg-primary-50 px-4 py-8 text-center text-2xl border border-primary-200">
          🦔 {habits.length} habitude{habits.length > 1 ? 's' : ''}
        </p>
      </div>

      {/* Liste des habitudes */}
      <div className="mt-6 rounded-xl bg-background border border-border p-6 shadow-md">
        <HabitsList 
          habits={habits} 
          onToggleHabit={handleToggleHabit}
        />
      </div>
    </>
  );
}