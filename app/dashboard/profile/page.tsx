import { Metadata } from 'next';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import ProfileForm from '@/app/ui/profile/profile-form';
import { User } from '@/app/lib/definitions';
import { prisma } from '@/app/lib/prisma';
import { getUserProgress } from '@/app/lib/actions';
import { 
  calculateLevel, 
  getXpForLevel, 
  getXpForNextLevel, 
  getCurrentLevelXp, 
  getXpNeededForCurrentLevel 
} from '@/app/lib/xp-system';

export const metadata: Metadata = {
  title: 'Profil | Habit Tracker',
  description: 'Gérez vos informations personnelles et paramètres de compte'
};

export default async function ProfilePage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect('/login');
  }

  // Debug pour voir la structure de la session
  console.log('Session user:', session.user);

  // Récupérer l'utilisateur complet depuis la base de données
  const dbUser = await prisma.user.findFirst({
    where: { 
      email: session.user.email! 
    }
  });

  if (!dbUser) {
    redirect('/login');
  }

  const user: User = {
    id: dbUser.id,
    name: dbUser.name,
    email: dbUser.email,
    password: ''
  };

  // Récupérer les données de progression
  let progress;
  try {
    progress = await getUserProgress(dbUser.id);
  } catch (error) {
    // Utiliser des valeurs par défaut si erreur
    console.error('Erreur progression:', error);
    progress = { level: 1, xp: 0, totalXp: 0 };
  }

  // Calculer les données pour la barre de progression
  const currentLevelXp = getCurrentLevelXp(progress.totalXp, progress.level);
  const xpNeededForLevel = getXpNeededForCurrentLevel(progress.level);
  const progressPercentage = xpNeededForLevel > 0 ? (currentLevelXp / xpNeededForLevel) * 100 : 100;
  const nextLevelXp = getXpForNextLevel(progress.level);

  return (
    <main className="max-w-2xl mx-auto py-8">
      <div className="space-y-8">
        {/* En-tête simple */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🦔</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Salut {user.name} !</h1>
          <p className="text-gray-500 text-base">{user.email}</p>
        </div>

        {/* Barre de progression XP */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Niveau {progress.level}</h2>
            <div className="text-sm text-gray-600">
              {progress.totalXp} XP total
            </div>
          </div>
          
          {/* Barre de progression */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>{currentLevelXp} XP</span>
              <span>{nextLevelXp} XP</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-linear-to-r from-primary-400 to-primary-600 h-4 rounded-full transition-all duration-500 ease-out shadow-lg"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              ></div>
            </div>
            <div className="text-center mt-2 text-sm text-gray-600">
              {xpNeededForLevel - currentLevelXp} XP pour niveau {progress.level + 1}
            </div>
          </div>
          
          {/* Statistiques */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-blue-50 p-4 rounded-2xl">
              <div className="text-2xl font-bold text-blue-700">
                {'totalHabitsCompleted' in progress ? progress.totalHabitsCompleted : 0}
              </div>
              <div className="text-sm text-blue-600">Habitudes accomplies</div>
            </div>
            <div className="bg-green-50 p-4 rounded-2xl">
              <div className="text-2xl font-bold text-green-700">
                {'longestStreak' in progress ? progress.longestStreak : 0}
              </div>
              <div className="text-sm text-green-600">Meilleur streak</div>
            </div>
          </div>
        </div>

        {/* Formulaire épuré */}
        <div className="bg-white rounded-3xl p-8">
          <ProfileForm user={user} />
        </div>
      </div>
    </main>
  );
}