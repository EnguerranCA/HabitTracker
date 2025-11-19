import Form from '@/app/ui/habits/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchHabitById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { josefinSans } from '@/app/ui/fonts';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const habit = await fetchHabitById(id);

  if (!habit) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Habitudes', href: '/dashboard/habits' },
          {
            label: 'Modifier l\'habitude',
            href: `/dashboard/habits/${id}/edit`,
            active: true,
          },
        ]}
      />
      <div className="rounded-xl bg-background border border-border p-6 shadow-md">
        <h1 className={`${josefinSans.className} text-2xl font-bold text-foreground mb-6 flex items-center gap-3`}>
          <span className="text-3xl">✏️</span>
          Modifier l&apos;habitude
        </h1>
        <Form habit={habit} />
      </div>
    </main>
  );
}