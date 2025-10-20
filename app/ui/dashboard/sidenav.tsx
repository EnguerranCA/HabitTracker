import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import HabitHissonLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-center justify-center rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 p-4 md:h-40 shadow-lg"
        href="/"
      >
        <div className="w-full text-center">
          <HabitHissonLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-background-muted md:block"></div>
        <div className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-background-muted p-3 text-sm font-medium text-foreground-secondary md:flex-none md:justify-start md:p-2 md:px-3">
          <PowerIcon className="w-6" />
          <div className="hidden md:block">Mode Développement</div>
        </div>
      </div>
    </div>
  );
}
