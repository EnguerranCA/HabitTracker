import { fetchUserHabits } from '@/app/lib/data';
import Hedgehog from '@/app/ui/hedgehog';
import MobileHabitsList from '@/app/ui/mobile-habits-list';

export default async function Page() {
  const habits = await fetchUserHabits();
  const completedToday = habits.filter((h) => h.isCompletedToday).length;
  
  // Calculer le score basé sur les habitudes accomplies
  const score = completedToday * 10 + 76; // Score de base + bonus

  return (
    <main className="h-full flex flex-col">
      {/* Hérisson fixe en haut */}
      <div className="shrink-0 bg-primary-100 border-b border-gray-100 px-4 py-2">
        <Hedgehog score={score} />
      </div>
      
      {/* Zone scrollable pour les habitudes */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <MobileHabitsList initialHabits={habits} />
        </div>
      </div>
    </main>
  );
}
