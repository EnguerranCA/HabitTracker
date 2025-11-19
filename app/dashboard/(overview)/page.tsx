import { fetchUserHabits } from '@/app/lib/data';
import Hedgehog from '@/app/ui/hedgehog';
import MobileHabitsList from '@/app/ui/mobile-habits-list';

export default async function Page() {
  const habits = await fetchUserHabits();
  const completedToday = habits.filter((h) => h.isCompletedToday).length;
  
  // Calculer le score basé sur les habitudes accomplies
  const score = completedToday * 10 + 76; // Score de base + bonus

  return (
    <main className="space-y-6">
      {/* Hérisson principal */}
      <Hedgehog score={score} />
      
      {/* Liste des habitudes mobile */}
      <div>
        <MobileHabitsList initialHabits={habits} />
      </div>
    </main>
  );
}
