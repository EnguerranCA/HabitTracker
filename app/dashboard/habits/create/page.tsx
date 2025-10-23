import Form from '@/app/ui/habits/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { josefinSans } from '@/app/ui/fonts';

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
              <p className="text-sm text-foreground-secondary">
                Ajoutez une habitude à votre routine quotidienne pour faire grandir votre hérisson ! 🌰
              </p>
            </div>
          </div>
          
          <Form />
        </div>
      </div>
    </main>
  );
}