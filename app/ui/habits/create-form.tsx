'use client';

import { useState, useEffect } from 'react';
import { useActionState } from 'react';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  UserIcon,
  SparklesIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createHabit } from '@/app/lib/actions';
import { josefinSans } from '@/app/ui/fonts';

// Liste d'emojis prédéfinis pour les habitudes
const HABIT_EMOJIS = [
  '📚', '🏃‍♂️', '💧', '🧘‍♀️', '🥗', '💤', 
  '📱', '🚭', '🍺', '🎮', '📺', '🛒',
  '✍️', '🎨', '🎵', '🌱', '🏋️‍♂️', '🚶‍♀️',
  '☕', '🍎', '🥕', '🥛', '🧽', '📖'
];

interface CreateHabitFormProps {
  onSuccess?: () => void;
}

export default function CreateHabitForm({ onSuccess }: CreateHabitFormProps) {
  const initialState = { message: '', errors: {} };
  const [state, formAction] = useActionState(createHabit, initialState);
  const [selectedEmoji, setSelectedEmoji] = useState('📚');
  const [habitName, setHabitName] = useState('');
  
  return (
    <form action={formAction}>
      <div className="rounded-md bg-background p-4 md:p-6 border border-border">
        {/* Nom de l'habitude */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
            Nom de l'habitude *
          </label>
          <div className="relative">
            <input
              id="name"
              name="name"
              type="text"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              placeholder="Ex: Lire 30 minutes par jour"
              className="peer block w-full rounded-md border border-border py-2 pl-10 text-sm text-foreground placeholder:text-foreground-secondary focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              maxLength={50}
              required
              aria-describedby="name-error"
            />
            <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          <div className="text-xs text-foreground-secondary mt-1">
            {habitName.length}/50 caractères
          </div>
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Sélecteur d'emoji */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-foreground">
            Emoji de l'habitude *
          </label>
          <input type="hidden" name="emoji" value={selectedEmoji} />
          <div className="grid grid-cols-8 md:grid-cols-12 gap-2 p-4 border border-border rounded-md bg-background-muted">
            {HABIT_EMOJIS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => setSelectedEmoji(emoji)}
                className={`text-2xl p-2 rounded-md transition-colors hover:bg-primary-100 ${
                  selectedEmoji === emoji
                    ? 'bg-primary-500 ring-2 ring-primary-500'
                    : 'bg-background'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
          <div className="mt-2 text-sm text-foreground-secondary">
            Emoji sélectionné: <span className="text-2xl">{selectedEmoji}</span>
          </div>
        </div>

        {/* Fréquence */}
        <div className="mb-4">
          <legend className="mb-2 block text-sm font-medium text-foreground">
            Fréquence *
          </legend>
          <div className="rounded-md border border-border bg-background-muted px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="daily"
                  name="frequency"
                  type="radio"
                  value="DAILY"
                  defaultChecked
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="daily"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Quotidienne <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="weekly"
                  name="frequency"
                  type="radio"
                  value="WEEKLY"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="weekly"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-blue-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Hebdomadaire <ClockIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          <div id="frequency-error" aria-live="polite" aria-atomic="true">
            {state.errors?.frequency &&
              state.errors.frequency.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Type d'habitude */}
        <div className="mb-4">
          <legend className="mb-2 block text-sm font-medium text-foreground">
            Type d'habitude *
          </legend>
          <div className="rounded-md border border-border bg-background-muted px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="good"
                  name="type"
                  type="radio"
                  value="GOOD"
                  defaultChecked
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="good"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Bonne habitude <SparklesIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="bad"
                  name="type"
                  type="radio"
                  value="BAD"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="bad"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Mauvaise habitude <XMarkIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          <div className="text-xs text-foreground-secondary mt-1">
            Bonne habitude : à développer • Mauvaise habitude : à éviter
          </div>
          <div id="type-error" aria-live="polite" aria-atomic="true">
            {state.errors?.type &&
              state.errors.type.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Message d'erreur général */}
        <div id="form-error" aria-live="polite" aria-atomic="true">
          {state.message && (
            <p className="mt-2 text-sm text-red-500">{state.message}</p>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        {onSuccess ? (
          <button
            type="button"
            onClick={onSuccess}
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Annuler
          </button>
        ) : (
          <Link
            href="/dashboard/habits"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Annuler
          </Link>
        )}
        <Button type="submit" className="flex h-10 items-center rounded-lg bg-primary-600 px-4 text-sm font-medium text-white transition-colors hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50">
          <CheckIcon className="h-4 w-4 mr-2" />
          Créer l'habitude
        </Button>
      </div>
    </form>
  );
}