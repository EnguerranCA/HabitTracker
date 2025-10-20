import { josefinSans } from '@/app/ui/fonts';

export default async function Page() {
  return (
    <main>
      <h1 className={`${josefinSans.className} mb-4 text-xl md:text-2xl text-foreground`}>
        Dashboard Habit'Hisson
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-background border border-border p-4 shadow-md">
          <div className="flex p-4">
            <h3 className="ml-2 text-sm font-medium text-foreground">
              Bienvenue dans votre tracker d'habitudes !
            </h3>
          </div>
          <p className="truncate rounded-xl bg-primary-50 px-4 py-8 text-center text-2xl border border-primary-200">
            🦔 Commencez à suivre vos habitudes
          </p>
        </div>
        
        <div className="rounded-xl bg-background border border-border p-4 shadow-md">
          <div className="flex p-4">
            <h3 className="ml-2 text-sm font-medium text-foreground">
              Mes habitudes
            </h3>
          </div>
          <p className="truncate rounded-xl bg-info-bg px-4 py-8 text-center text-2xl border border-info/20">
            📚 5 habitudes actives
          </p>
        </div>
        
        <div className="rounded-xl bg-background border border-border p-4 shadow-md">
          <div className="flex p-4">
            <h3 className="ml-2 text-sm font-medium text-foreground">
              Streak actuel
            </h3>
          </div>
          <p className="truncate rounded-xl bg-success-bg px-4 py-8 text-center text-2xl border border-success/20">
            🔥 7 jours
          </p>
        </div>
        
        <div className="rounded-xl bg-background border border-border p-4 shadow-md">
          <div className="flex p-4">
            <h3 className="ml-2 text-sm font-medium text-foreground">
              Niveau hérisson
            </h3>
          </div>
          <p className="truncate rounded-xl bg-warning-bg px-4 py-8 text-center text-2xl border border-warning/20">
            ⭐ Niveau 3
          </p>
        </div>
      </div>
      
      <div className="mt-8 rounded-xl bg-background border border-border p-6 shadow-md">
        <h2 className={`${josefinSans.className} mb-4 text-lg text-foreground`}>
          Mode Développement Actif
        </h2>
        <p className="text-foreground-secondary">
          L'authentification est temporairement désactivée pour permettre le développement 
          sans dépendance à la base de données Vercel. Toutes les fonctionnalités de base 
          sont accessibles pour tester l'interface.
        </p>
      </div>
    </main>
  );
}
