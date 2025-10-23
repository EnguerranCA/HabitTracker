'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { josefinSans } from '@/app/ui/fonts';
import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import SuccessNotification from '@/app/ui/habits/success-notification';

export default function Page() {
  const searchParams = useSearchParams();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (searchParams.get('success') === 'created') {
      setShowSuccess(true);
    }
  }, [searchParams]);

  return (
    <div className="w-full">
      {showSuccess && (
        <SuccessNotification
          message="🦔 Habitude créée avec succès ! Votre hérisson vous remercie !"
          onClose={() => setShowSuccess(false)}
        />
      )}
      
      <div className="flex w-full items-center justify-between">
        <h1 className={`${josefinSans.className} text-2xl text-foreground`}>
          Mes Habitudes 🌰
        </h1>
      </div>
      
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <div className="flex items-center space-x-2">
          <span className="text-4xl">🦔</span>
          <div>
            <p className="text-sm text-foreground-secondary">
              Créez vos premières habitudes pour faire grandir votre hérisson !
            </p>
          </div>
        </div>
        <Link
          href="/dashboard/habits/create"
          className="flex h-10 items-center rounded-lg bg-primary-600 px-4 text-sm font-medium text-white transition-colors hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        >
          <span className="hidden md:block">Créer une habitude</span>{' '}
          <PlusIcon className="h-5 md:ml-4" />
        </Link>
      </div>
      
      {/* Placeholder pour la liste des habitudes */}
      <div className="mt-8 rounded-xl bg-background border border-border p-6 shadow-md">
        <div className="text-center py-12">
          <span className="text-6xl mb-4 block">📚</span>
          <h3 className={`${josefinSans.className} text-lg font-semibold text-foreground mb-2`}>
            Aucune habitude pour le moment
          </h3>
          <p className="text-foreground-secondary mb-6">
            Commencez par créer votre première habitude pour démarrer votre aventure !
          </p>
          <Link
            href="/dashboard/habits/create"
            className="inline-flex items-center rounded-lg bg-primary-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-500"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Ma première habitude
          </Link>
        </div>
      </div>
    </div>
  );
}