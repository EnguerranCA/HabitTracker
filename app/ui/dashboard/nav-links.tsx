'use client';

import {
  HomeIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  UserIcon,
  SparklesIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Navigation pour Habit'Hisson - Liens principaux de l'application
const links = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Mes Habitudes', href: '/dashboard/habits', icon: CalendarDaysIcon },
  { name: 'Calendrier', href: '/dashboard/calendar', icon: ChartBarIcon },
  { name: 'Mon Hérisson', href: '/dashboard/hedgehog', icon: SparklesIcon },
  { name: 'Focus Sessions', href: '/dashboard/focus', icon: ClockIcon },
  { name: 'Profil', href: '/dashboard/profile', icon: UserIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
    
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium transition-colors md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-background-muted text-foreground-secondary hover:bg-primary-50 hover:text-primary-600': pathname !== link.href,
                'bg-primary-100 text-primary-700 border border-primary-200': pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
