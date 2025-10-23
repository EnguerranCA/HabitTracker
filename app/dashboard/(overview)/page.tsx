import { josefinSans } from '@/app/ui/fonts';
import Link from 'next/link';

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
          <Link href="/dashboard/habits" className="block">
            <p className="truncate rounded-xl bg-info-bg px-4 py-8 text-center text-2xl border border-info/20 hover:bg-info-bg/80 transition-colors">
              📚 Gérer mes habitudes
            </p>
          </Link>
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
          Bienvenue dans Habit'Hisson ! 🦔
        </h2>
        <p className="text-foreground-secondary">
          Commencez à créer vos habitudes et suivez la croissance de votre hérisson virtuel. 
          Chaque habitude accomplie vous rapporte des glands pour nourrir et faire grandir votre compagnon !
        </p>
      </div>
    </main>
  );
}
