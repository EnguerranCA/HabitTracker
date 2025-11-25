'use client';

import { HomeIcon, CalendarIcon, UserIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import DebugDateButton from './debug-date-button';

export default function MobileNavigation() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-primary-500 text-white shadow-lg">
      <div className="flex justify-around items-center py-3">
        <Link 
          href="/dashboard" 
          className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
            pathname === '/dashboard' ? 'bg-primary-600' : 'hover:bg-primary-400'
          }`}
        >
          <HomeIcon className="w-6 h-6" />
          <span className="text-xs font-medium">Accueil</span>
        </Link>
        
        <Link 
          href="/dashboard/calendar" 
          className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
            pathname === '/dashboard/calendar' ? 'bg-primary-600' : 'hover:bg-primary-400'
          }`}
        >
          <CalendarIcon className="w-6 h-6" />
          <span className="text-xs font-medium">Calendrier</span>
        </Link>
        
        <Link 
          href="/dashboard/profile" 
          className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
            pathname === '/dashboard/profile' ? 'bg-primary-600' : 'hover:bg-primary-400'
          }`}
        >
          <UserIcon className="w-6 h-6" />
          <span className="text-xs font-medium">Profil</span>
        </Link>
        
        {/* Bouton debug date - visible uniquement en développement */}
        <DebugDateButton />
      </div>
    </div>
  );
}