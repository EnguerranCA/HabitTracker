'use client';

import { useState, useEffect } from 'react';
import { useActionState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createHabitFromDashboard } from '@/app/lib/actions';

// Liste d'emojis compacte pour les habitudes
const HABIT_EMOJIS = [
  '📚', '🏃‍♂️', '💧', '🧘‍♀️', '🥗', '💤', 
  '📱', '✍️', '🎨', '🌱', '🏋️‍♂️', '☕'
];

export default function QuickCreateFormClient() {
  const initialState = { message: '', errors: {} };
  const [state, formAction] = useActionState(createHabitFromDashboard, initialState);
  const [selectedEmoji, setSelectedEmoji] = useState('📚');
  const [habitName, setHabitName] = useState('');

  // Gérer le succès de la création
  useEffect(() => {
    if ((state as any).success) {
      // Réinitialiser le formulaire
      setSelectedEmoji('📚');
      setHabitName('');
      // Rafraîchir la page pour voir la nouvelle habitude
      window.location.reload();
    }
  }, [state]);

  return (
    <form action={formAction} className="flex items-center gap-3 p-4 bg-background border border-border rounded-lg shadow-sm">
      {/* Sélecteur d'emoji */}
      <div className="flex items-center gap-1">
        <select 
          name="emoji" 
          value={selectedEmoji} 
          onChange={(e) => setSelectedEmoji(e.target.value)}
          className="text-xl bg-transparent border-none focus:outline-none cursor-pointer"
        >
          {HABIT_EMOJIS.map((emoji) => (
            <option key={emoji} value={emoji}>{emoji}</option>
          ))}
        </select>
      </div>

      {/* Nom de l'habitude */}
      <input
        name="name"
        type="text"
        value={habitName}
        onChange={(e) => setHabitName(e.target.value)}
        placeholder="Ex: Lire 30 minutes par jour"
        className="flex-1 px-3 py-2 text-sm bg-background border border-border rounded-md focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        maxLength={50}
        required
      />

      {/* Fréquence */}
      <select 
        name="frequency" 
        className="px-3 py-2 text-sm bg-background border border-border rounded-md focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        defaultValue="DAILY"
      >
        <option value="DAILY">Quotidienne</option>
        <option value="WEEKLY">Hebdomadaire</option>
      </select>

      {/* Type */}
      <select 
        name="type" 
        className="px-3 py-2 text-sm bg-background border border-border rounded-md focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        defaultValue="GOOD"
      >
        <option value="GOOD">✅ Bonne</option>
        <option value="BAD">❌ Mauvaise</option>
      </select>

      {/* Bouton d'ajout */}
      <Button 
        type="submit" 
        className="flex items-center gap-1 px-4 py-2 text-sm bg-primary-600 hover:bg-primary-500 text-white rounded-md transition-colors"
      >
        <PlusIcon className="h-4 w-4" />
        Ajouter
      </Button>

      {/* Affichage des erreurs */}
      {(state as any).errors?.name && (
        <div className="absolute top-full left-0 mt-1 text-xs text-red-500">
          {(state as any).errors.name[0]}
        </div>
      )}
    </form>
  );
}