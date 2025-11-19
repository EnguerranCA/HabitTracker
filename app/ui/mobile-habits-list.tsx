'use client';

import React, { useState, useTransition, useEffect } from 'react';
import { CheckIcon, XMarkIcon, PlusIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { toggleHabitCompletion, createHabitFromDashboard, updateHabitFromDashboard } from '@/app/lib/actions';
import { useActionState } from 'react';

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

// Liste d'emojis pour les habitudes
const HABIT_EMOJIS = [
  '📚', '🏃‍♂️', '💧', '🧘‍♀️', '🥗', '💤', 
  '📱', '🚭', '🍺', '🎮', '📺', '🛒',
  '✍️', '🎨', '🎵', '🌱', '🏋️‍♂️', '🚶‍♀️',
  '☕', '🍎', '🥕', '🥛', '🧽', '📖'
];

export default function MobileHabitsList({ initialHabits }: MobileHabitsListProps) {
  const [habits, setHabits] = useState(initialHabits);
  const [isPending, startTransition] = useTransition();
  const [showModal, setShowModal] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState('📚');
  const [habitName, setHabitName] = useState('');
  const [editingHabit, setEditingHabit] = useState<HabitWithCompletion | null>(null);
  const [habitType, setHabitType] = useState('good');
  const [habitFrequency, setHabitFrequency] = useState('daily');
  
  const initialState = { message: '', errors: {} };
  const [createState, createAction] = useActionState(createHabitFromDashboard, initialState);
  const [updateState, updateAction] = useActionState(updateHabitFromDashboard, initialState);
  
  // Utiliser l'état approprié selon le mode
  const state = editingHabit ? updateState : createState;
  const formAction = editingHabit ? updateAction : createAction;

  const handleToggle = async (habitId: string, event: React.MouseEvent) => {
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return;

    const newCompletedState = !habit.isCompletedToday;
    
    // Déclencher l'animation des glands si on coche l'habitude
    if (newCompletedState && (window as any).triggerNutAnimation) {
      const rect = (event.target as HTMLElement).getBoundingClientRect();
      (window as any).triggerNutAnimation(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
    
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

  // Ouvrir la modale d'édition
  const handleEditHabit = (habit: HabitWithCompletion) => {
    setEditingHabit(habit);
    setHabitName(habit.name);
    setSelectedEmoji(habit.emoji);
    setHabitType(habit.type.toLowerCase());
    setHabitFrequency(habit.frequency.toLowerCase());
    setShowModal(true);
  };

  // Ouvrir la modale de création
  const handleCreateHabit = () => {
    setEditingHabit(null);
    setHabitName('');
    setSelectedEmoji('📚');
    setHabitType('good');
    setHabitFrequency('daily');
    setShowModal(true);
  };

  // Gérer la soumission du formulaire et fermer le modal en cas de succès
  useEffect(() => {
    if (createState.message === 'success' || updateState.message === 'success') {
      setShowModal(false);
      setHabitName('');
      setSelectedEmoji('📚');
      setEditingHabit(null);
      setHabitType('good');
      setHabitFrequency('daily');
      // Rafraîchir la liste des habitudes
      window.location.reload();
    }
  }, [createState, updateState]);

  return (
    <div className="space-y-3 pb-32"> {/* pb-32 pour éviter la navigation mobile et le bouton notes */}
      {habits.map((habit) => (
        <div
          key={habit.id}
          className={`flex items-center justify-between p-4 rounded-2xl transition-all ${
            habit.type === 'GOOD' 
              ? 'bg-blue-400 text-white' 
              : 'bg-purple-400 text-white'
          }`}
        >
          <div className="flex items-center gap-3 flex-1">
            <span className="text-2xl">{habit.emoji}</span>
            <span className="font-medium text-white">{habit.name}</span>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Bouton de menu */}
            <button
              onClick={() => handleEditHabit(habit)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <EllipsisVerticalIcon className="w-5 h-5 text-white" />
            </button>
            
            {/* Bouton de toggle */}
            <button
              onClick={(e) => handleToggle(habit.id, e)}
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
        </div>
      ))}
      
      {/* Bouton d'ajout d'habitude */}
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-10">
        <button
          onClick={handleCreateHabit}
          className="bg-primary-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-primary-600 transition-colors flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          <span className="font-medium">Ajouter une habitude</span>
        </button>
      </div>

      {/* Modal de création d'habitude */}
      {showModal && (
        <div className="fixed inset-0 bg-white/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header du modal */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingHabit ? 'Modifier l\'habitude' : 'Nouvelle habitude'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <XMarkIcon className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Formulaire */}
              <form action={formAction} className="space-y-6">
                {/* ID de l'habitude en mode édition */}
                {editingHabit && (
                  <input type="hidden" name="habitId" value={editingHabit.id} />
                )}
                
                {/* Nom de l'habitude */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nom de l'habitude
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={habitName}
                    onChange={(e) => setHabitName(e.target.value)}
                    placeholder="Ex: Boire 2L d'eau"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    maxLength={50}
                    required
                  />
                  {state.errors?.name && (
                    <p className="text-red-500 text-sm mt-1">{state.errors.name[0]}</p>
                  )}
                </div>

                {/* Emoji */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Emoji
                  </label>
                  <input type="hidden" name="emoji" value={selectedEmoji} />
                  <div className="grid grid-cols-6 gap-2 max-h-32 overflow-y-auto p-2 border border-gray-300 rounded-lg">
                    {HABIT_EMOJIS.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => setSelectedEmoji(emoji)}
                        className={`p-2 text-2xl rounded-lg transition-colors ${
                          selectedEmoji === emoji
                            ? 'bg-primary-100 border-2 border-primary-500'
                            : 'hover:bg-gray-100 border-2 border-transparent'
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Type d'habitude */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type d'habitude
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="type"
                        value="good"
                        checked={habitType === 'good'}
                        onChange={(e) => setHabitType(e.target.value)}
                        className="mr-2 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">Bonne habitude</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="type"
                        value="bad"
                        checked={habitType === 'bad'}
                        onChange={(e) => setHabitType(e.target.value)}
                        className="mr-2 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">Mauvaise habitude</span>
                    </label>
                  </div>
                </div>

                {/* Fréquence */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fréquence
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="frequency"
                        value="daily"
                        checked={habitFrequency === 'daily'}
                        onChange={(e) => setHabitFrequency(e.target.value)}
                        className="mr-2 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">Quotidienne</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="frequency"
                        value="weekly"
                        checked={habitFrequency === 'weekly'}
                        onChange={(e) => setHabitFrequency(e.target.value)}
                        className="mr-2 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">Hebdomadaire</span>
                    </label>
                  </div>
                </div>

                {/* Messages d'erreur globaux */}
                {state.message && (
                  <div className="text-red-500 text-sm">
                    {state.message}
                  </div>
                )}

                {/* Boutons d'action */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={!habitName.trim()}
                    className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    {editingHabit ? 'Modifier' : 'Créer'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}