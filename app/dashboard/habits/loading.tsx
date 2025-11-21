import React from "react";
import { HabitsListSkeleton } from '@/app/ui/skeletons';

const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export default function Loading() {
  return (
    <div className="p-4 space-y-6">
      {/* Titre */}
      <div className={`${shimmer} relative mb-6 h-8 w-48 overflow-hidden rounded-md bg-gray-100`} />
      
      {/* Bouton créer */}
      <div className={`${shimmer} relative h-10 w-40 overflow-hidden rounded-md bg-gray-100`} />
      
      {/* Liste des habitudes */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <HabitsListSkeleton />
      </div>
    </div>
  );
}