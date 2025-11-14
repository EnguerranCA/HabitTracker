import { josefinSans } from '@/app/ui/fonts';
import { fetchUserHabits } from '@/app/lib/data';
import QuickCreateFormClient from '@/app/ui/habits/quick-create-form-client';

export default async function Page() {
  const habits = await fetchUserHabits();

  return (
    <main>
      <h1 className={`${josefinSans.className} mb-4 text-xl md:text-2xl text-foreground`}>
        Dashboard Habit&apos;Hisson
      </h1>
      {/* Formulaire de création d'habitude - priorité visuelle */}
      <div className="mb-6 rounded-xl bg-background border border-border p-4 shadow-md">
        <div className="flex p-2 mb-3">
          <h3 className="ml-2 text-sm font-medium text-foreground flex items-center gap-2">
            <span className="text-xl">🦔</span>
            Créer une nouvelle habitude
          </h3>
        </div>
        <QuickCreateFormClient />
      </div>

      {/* Statistiques */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl bg-background border border-border p-4 shadow-md">
          <div className="flex p-4">
            <h3 className="ml-2 text-sm font-medium text-foreground">
              Mes habitudes actuelles
            </h3>
          </div>
          <p className="truncate rounded-xl bg-primary-50 px-4 py-8 text-center text-2xl border border-primary-200">
            🦔 {habits.length} habitude{habits.length > 1 ? 's' : ''}
          </p>
        </div>
        
        {/* <div className="rounded-xl bg-background border border-border p-4 shadow-md">
          <div className="flex p-4">
            <h3 className="ml-2 text-sm font-medium text-foreground">
              Streak actuel
            </h3>
          </div>
          <p className="truncate rounded-xl bg-success-bg px-4 py-8 text-center text-2xl border border-success/20">
            🔥 7 jours
          </p>
        </div> */}
        
        {/* <div className="rounded-xl bg-background border border-border p-4 shadow-md">
          <div className="flex p-4">
            <h3 className="ml-2 text-sm font-medium text-foreground">
              Niveau hérisson
            </h3>
          </div>
          <p className="truncate rounded-xl bg-warning-bg px-4 py-8 text-center text-2xl border border-warning/20">
            ⭐ Niveau 3
          </p>
        </div> */}
      </div>
      
      {/* Liste des habitudes */}
      {habits && habits.length > 0 && (
        <div className="mt-6 rounded-xl bg-background border border-border p-6 shadow-md">
          <h3 className={`${josefinSans.className} text-lg font-semibold text-foreground mb-4 flex items-center gap-2`}>
            <span className="text-xl">📋</span>
            Mes habitudes du jour
          </h3>
          
          <div className="space-y-3">
            {habits.map((habit: any) => (
              <div
                key={habit.id}
                className="flex items-center justify-between p-4 rounded-lg border bg-background border-border"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{habit.emoji}</span>
                  
                  <div>
                    <p className="font-medium text-foreground">
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
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-8 rounded-xl bg-background border border-border p-6 shadow-md">
        <h2 className={`${josefinSans.className} mb-4 text-lg text-foreground`}>
          Bienvenue dans Habit&apos;Hisson ! 🦔
        </h2>
        <p className="text-foreground-secondary">
          Commencez à créer vos habitudes et suivez la croissance de votre hérisson virtuel. 
          Chaque habitude accomplie vous rapporte des glands pour nourrir et faire grandir votre compagnon !
        </p>
      </div>
    </main>
  );
}
