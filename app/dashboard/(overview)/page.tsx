import { fetchUserHabits } from '@/app/lib/data';
import { getUserProgress } from '@/app/lib/actions';
import Hedgehog from '@/app/ui/hedgehog';
import MobileHabitsList from '@/app/ui/mobile-habits-list';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect('/login');
  }

  const habits = await fetchUserHabits();
  const completedToday = habits.filter((h) => h.isCompletedToday).length;
  
  // Calculer le score basé sur les habitudes accomplies (nombre de glands)
  const score = completedToday * 10 + 76; // Score de base + bonus
  
  // Récupérer les données de progression pour l'utilisateur
  // Pour l'instant, on utilise l'email pour identifier l'utilisateur
  // TODO: Récupérer l'userId de façon plus robuste
  try {
    const progress = await getUserProgress('temp-user-id'); // On utilisera l'ID réel plus tard
    
    return (
      <main className="h-full w-full flex flex-col">
        {/* Hérisson fixe en haut */}
        <div className="shrink-0 bg-primary-100 border-b border-gray-100 px-4 py-2">
          <Hedgehog 
            score={score}
            level={progress.level}
            userId="temp-user-id"
            glandes={completedToday}
          />
        </div>
        
        {/* Zone scrollable pour les habitudes */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <MobileHabitsList initialHabits={habits} />
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Erreur lors du chargement de la progression:', error);
    // Fallback sans données de progression
    return (
      <main className="h-full w-full flex flex-col">
        {/* Hérisson fixe en haut */}
        <div className="shrink-0 bg-primary-100 border-b border-gray-100 px-4 py-2">
          <Hedgehog 
            score={score}
            level={1}
            glandes={completedToday}
          />
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
}
