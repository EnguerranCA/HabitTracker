import Form from '@/app/ui/habits/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { josefinSans } from '@/app/ui/fonts';
import Image from 'next/image';

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Habitudes', href: '/dashboard/habits' },
          {
            label: 'Créer une habitude',
            href: '/dashboard/habits/create',
            active: true,
          },
        ]}
      />
      
      <div className="mt-6">
        <div className="rounded-md bg-background border border-border p-6 shadow-md">
          <div className="flex items-center space-x-3 mb-6">
            <span className="text-3xl">🦔</span>
            <div>
              <h2 className={`${josefinSans.className} text-xl font-semibold text-foreground`}>
                Créer une nouvelle habitude
              </h2>
              <p className="text-sm text-foreground-secondary flex items-center gap-1">
                Ajoutez une habitude à votre routine quotidienne pour faire grandir votre hérisson ! 
                <Image src="/gland.webp" alt="Gland" width={16} height={16} className="inline-block" />
              </p>
            </div>
          </div>
          
          <Form />
        </div>
      </div>
    </main>
  );
}