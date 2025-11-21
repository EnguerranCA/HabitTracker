import { Metadata } from 'next';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import ProfileForm from '@/app/ui/profile/profile-form';
import { User } from '@/app/lib/definitions';
import { prisma } from '@/app/lib/prisma';

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

  return (
    <main className="max-w-2xl mx-auto py-8">
      <div className="space-y-8">
        {/* En-tête simple */}
        <div className="text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🦔</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">{user.name}</h1>
          <p className="text-gray-500 text-sm">{user.email}</p>
        </div>

        {/* Stats rapides */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="py-4">
            <div className="text-2xl font-bold text-gray-900">12</div>
            <div className="text-xs text-gray-500">Habitudes</div>
          </div>
          <div className="py-4">
            <div className="text-2xl font-bold text-blue-600">7</div>
            <div className="text-xs text-gray-500">Streak</div>
          </div>
          <div className="py-4">
            <div className="text-2xl font-bold text-green-600">89%</div>
            <div className="text-xs text-gray-500">Réussite</div>
          </div>
        </div>

        {/* Formulaire épuré */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <ProfileForm user={user} />
        </div>
      </div>
    </main>
  );
}