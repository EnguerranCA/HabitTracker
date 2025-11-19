'use client';

import { useState, useTransition } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { josefinSans } from '@/app/ui/fonts';
import { toggleHabitCompletion } from '@/app/lib/actions';
import { EditHabit, DeleteHabit } from './buttons';

interface HabitWithCompletion {
  id: string;
  name: string;
  emoji: string;
  type: 'GOOD' | 'BAD';
  frequency: 'DAILY' | 'WEEKLY' | 'CUSTOM';
  isCompletedToday: boolean;
  logs: { id: string; habitId: string; date: Date; completed: boolean }[];
}

interface InteractiveHabitsListProps {
  initialHabits: HabitWithCompletion[];
}

export default function InteractiveHabitsList({ initialHabits }: InteractiveHabitsListProps) {
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

  const handleDelete = (habitId: string) => {
    // Supprimer immédiatement l'habitude de l'état local
    setHabits(prev => prev.filter(h => h.id !== habitId));
  };

  const completedCount = habits.filter(h => h.isCompletedToday).length;

  if (habits.length === 0) {
    return (
      <div className="mt-6 rounded-xl bg-background border border-border p-6 shadow-md">
        <div className="text-center py-8">
          <span className="text-4xl mb-4 block">🦔</span>
          <p className="text-foreground-secondary">
            Créez votre première habitude pour commencer !
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-xl bg-background border border-border p-6 shadow-md">
      <h3 className={`${josefinSans.className} text-lg font-semibold text-foreground mb-4 flex items-center gap-2`}>
        <span className="text-xl">📋</span>
        Mes habitudes du jour ({completedCount}/{habits.length})
      </h3>
      
      <div className="space-y-3">
        {habits.map((habit) => (
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
                disabled={isPending}
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all ${
                  habit.isCompletedToday
                    ? 'bg-success border-success text-white'
                    : 'border-border hover:border-primary-500'
                } ${isPending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
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
            
            <div className="flex items-center gap-2">
              {habit.isCompletedToday && (
                <div className="flex items-center gap-1 text-success mr-2">
                  <span className="text-sm font-medium">+10 🌰</span>
                </div>
              )}
              <EditHabit id={habit.id} />
              <DeleteHabit id={habit.id} name={habit.name} onDelete={() => handleDelete(habit.id)} />
            </div>
          </div>
        ))}
      </div>
      
      {completedCount === habits.length && habits.length > 0 && (
        <div className="mt-4 p-4 bg-success-bg border border-success/30 rounded-lg text-center">
          <span className="text-2xl mb-2 block">🎉</span>
          <p className="text-success-foreground font-medium">
            Félicitations ! Toutes vos habitudes sont accomplies aujourd&apos;hui !
          </p>
          <p className="text-success-foreground/70 text-sm mt-1">
            Votre hérisson est très fier de vous ! 🦔✨
          </p>
        </div>
      )}
    </div>
  );
}