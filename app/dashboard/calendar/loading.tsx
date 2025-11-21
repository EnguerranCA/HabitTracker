import React from "react";
import { CalendarSkeleton, ChartSkeleton, StatsGridSkeleton } from '@/app/ui/skeletons';

const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export default function Loading() {
  return (
    <div className="p-4 space-y-6">
      {/* Titre */}
      <div className="mb-6">
        <div className={`${shimmer} relative mb-2 h-8 w-64 overflow-hidden rounded-md bg-gray-100`} />
        <div className={`${shimmer} relative h-4 w-48 overflow-hidden rounded-md bg-gray-100`} />
      </div>

      {/* Graphique d'évolution */}
      <ChartSkeleton />

      {/* Calendrier */}
      <CalendarSkeleton />
      
      {/* Stats rapides */}
      <StatsGridSkeleton />
    </div>
  );
}