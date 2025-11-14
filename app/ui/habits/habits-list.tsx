'use client';

import { useState, useEffect } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { josefinSans } from '@/app/ui/fonts';

interface Habit {
  id: string;
  name: string;
  emoji: string;
  type: 'GOOD' | 'BAD';
  frequency: 'DAILY' | 'WEEKLY' | 'CUSTOM';
}

interface HabitWithLog extends Habit {
  isCompletedToday: boolean;
}

interface HabitsListProps {
  habits: Habit[];
  onToggleHabit?: (habitId: string, completed: boolean) => Promise<void>;
}

export default function HabitsList({ habits, onToggleHabit }: HabitsListProps) {
  const [habitsWithLogs, setHabitsWithLogs] = useState<HabitWithLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Pour l'instant, on simule que toutes les habitudes ne sont pas encore faites aujourd'hui
    // TODO: Récupérer les vrais logs depuis la base de données
    const habitsWithStatus = habits.map(habit => ({
      ...habit,
      isCompletedToday: false,
    }));
    setHabitsWithLogs(habitsWithStatus);
    setLoading(false);
  }, [habits]);

  const handleToggle = async (habitId: string) => {
    const habit = habitsWithLogs.find(h => h.id === habitId);
    if (!habit) return;

    const newCompletedState = !habit.isCompletedToday;
    
    // Mise à jour optimiste de l'UI
    setHabitsWithLogs(prev => 
      prev.map(h => 
        h.id === habitId 
          ? { ...h, isCompletedToday: newCompletedState }
          : h
      )
    );

    // Appel de l'action serveur si fournie
    if (onToggleHabit) {
      try {
        await onToggleHabit(habitId, newCompletedState);
      } catch (error) {
              } catch (_error) {
        // En cas d'erreur, on revert l'état
        setHabitsWithLogs(prev => 
          prev.map(h => 
            h.id === habitId 
              ? { ...h, isCompletedToday: !newCompletedState }
              : h
          )
        );
      }
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-16 bg-background-muted rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (habits.length === 0) {
    return (
      <div className="text-center py-8">
        <span className="text-4xl mb-4 block">🦔</span>
        <p className="text-foreground-secondary">
          Créez votre première habitude pour commencer !
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className={`${josefinSans.className} text-lg font-semibold text-foreground mb-4 flex items-center gap-2`}>
        <span className="text-xl">📋</span>
        Mes habitudes du jour ({habitsWithLogs.filter(h => h.isCompletedToday).length}/{habitsWithLogs.length})
      </h3>
      
      {habitsWithLogs.map((habit) => (
        <div
          key={habit.id}
          className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
            habit.isCompletedToday
              ? 'bg-success-bg border-success/30 shadow-sm'
              : 'bg-background border-border hover:border-primary-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleToggle(habit.id)}
              className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all ${
                habit.isCompletedToday
                  ? 'bg-success border-success text-white'
                  : 'border-border hover:border-primary-500'
              }`}
            >
              {habit.isCompletedToday && (
                <CheckIcon className="w-4 h-4" />
              )}
            </button>
            
            <span className="text-2xl">{habit.emoji}</span>
            
            <div>
              <p className={`font-medium ${
                habit.isCompletedToday 
                  ? 'text-success-foreground line-through' 
                  : 'text-foreground'
              }`}>
                {habit.name}
              </p>
              <div className="flex items-center gap-2 text-xs text-foreground-secondary">
                <span className={`px-2 py-1 rounded-full ${
                  habit.type === 'GOOD' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {habit.type === 'GOOD' ? '✅ Bonne' : '❌ Mauvaise'}
                </span>
                <span className="px-2 py-1 bg-background-muted rounded-full">
                  {habit.frequency === 'DAILY' ? '📅 Quotidien' : '📆 Hebdomadaire'}
                </span>
              </div>
            </div>
          </div>
          
          {habit.isCompletedToday && (
            <div className="flex items-center gap-1 text-success">
              <span className="text-sm font-medium">+10 🌰</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}