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
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🦔</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Salut {user.name} !</h1>
          <p className="text-gray-500 text-base">{user.email}</p>
        </div>

        {/* Formulaire épuré */}
        <div className="bg-white rounded-3xl p-8">
          <ProfileForm user={user} />
        </div>
      </div>
    </main>
  );
}