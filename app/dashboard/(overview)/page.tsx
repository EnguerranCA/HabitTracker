import { lusitana } from '@/app/ui/fonts';

export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Habit Tracker Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
          <div className="flex p-4">
            <h3 className="ml-2 text-sm font-medium">Welcome to your Habit Tracker!</h3>
          </div>
          <p className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl">
            🦔 Start tracking your habits
          </p>
        </div>
      </div>
    </main>
  );
}