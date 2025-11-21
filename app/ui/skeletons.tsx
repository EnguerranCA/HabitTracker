// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
    >
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}

export function CardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}

export function RevenueChartSkeleton() {
  return (
    <div className={`${shimmer} relative w-full overflow-hidden md:col-span-4`}>
      <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
      <div className="rounded-xl bg-gray-100 p-4">
        <div className="sm:grid-cols-13 mt-0 grid h-[410px] grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4" />
        <div className="flex items-center pb-2 pt-6">
          <div className="h-5 w-5 rounded-full bg-gray-200" />
          <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export function InvoiceSkeleton() {
  return (
    <div className="flex flex-row items-center justify-between border-b border-gray-100 py-4">
      <div className="flex items-center">
        <div className="mr-2 h-8 w-8 rounded-full bg-gray-200" />
        <div className="min-w-0">
          <div className="h-5 w-40 rounded-md bg-gray-200" />
          <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
        </div>
      </div>
      <div className="mt-2 h-4 w-12 rounded-md bg-gray-200" />
    </div>
  );
}

export function LatestInvoicesSkeleton() {
  return (
    <div
      className={`${shimmer} relative flex w-full flex-col overflow-hidden md:col-span-4`}
    >
      <div className="mb-4 h-8 w-36 rounded-md bg-gray-100" />
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-100 p-4">
        <div className="bg-white px-6">
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
        </div>
        <div className="flex items-center pb-2 pt-6">
          <div className="h-5 w-5 rounded-full bg-gray-200" />
          <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

// Skeleton pour les habitudes
export function HabitCardSkeleton() {
  return (
    <div className={`${shimmer} relative overflow-hidden rounded-lg bg-gray-100 p-4 shadow-sm`}>
      <div className="flex items-center space-x-3">
        <div className="h-8 w-8 rounded-full bg-gray-200" />
        <div className="flex-1">
          <div className="h-5 w-24 rounded-md bg-gray-200 mb-1" />
          <div className="h-3 w-16 rounded-md bg-gray-200" />
        </div>
        <div className="h-6 w-6 rounded bg-gray-200" />
      </div>
    </div>
  );
}

export function HabitsListSkeleton() {
  return (
    <div className="space-y-4">
      <HabitCardSkeleton />
      <HabitCardSkeleton />
      <HabitCardSkeleton />
      <HabitCardSkeleton />
    </div>
  );
}

// Skeleton pour le hérisson
export function HedgehogSkeleton() {
  return (
    <div className={`${shimmer} relative overflow-hidden rounded-lg bg-gray-100 p-6 text-center`}>
      <div className="mb-4">
        <div className="h-24 w-24 rounded-full bg-gray-200 mx-auto" />
      </div>
      <div className="h-5 w-20 rounded-md bg-gray-200 mx-auto mb-2" />
      <div className="h-3 w-16 rounded-md bg-gray-200 mx-auto" />
    </div>
  );
}

// Skeleton pour les statistiques
export function StatCardSkeleton() {
  return (
    <div className={`${shimmer} relative overflow-hidden rounded-lg bg-gray-100 p-4`}>
      <div className="text-center">
        <div className="h-8 w-12 rounded-md bg-gray-200 mx-auto mb-2" />
        <div className="h-4 w-20 rounded-md bg-gray-200 mx-auto" />
      </div>
    </div>
  );
}

export function StatsGridSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <StatCardSkeleton />
      <StatCardSkeleton />
      <StatCardSkeleton />
    </div>
  );
}

// Skeleton pour le calendrier
export function CalendarSkeleton() {
  return (
    <div className={`${shimmer} relative overflow-hidden rounded-lg bg-gray-100 p-6`}>
      {/* En-tête du calendrier */}
      <div className="flex items-center justify-between mb-6">
        <div className="h-6 w-6 rounded bg-gray-200" />
        <div className="h-6 w-24 rounded-md bg-gray-200" />
        <div className="h-6 w-6 rounded bg-gray-200" />
      </div>
      
      {/* Jours de la semaine */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i} className="h-4 w-8 rounded-md bg-gray-200 mx-auto" />
        ))}
      </div>
      
      {/* Grille du calendrier */}
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 35 }, (_, i) => (
          <div key={i} className="aspect-square rounded-md bg-gray-200 p-2">
            <div className="h-4 w-4 rounded-full bg-gray-300 mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Skeleton pour le graphique
export function ChartSkeleton() {
  return (
    <div className={`${shimmer} relative overflow-hidden rounded-lg bg-gray-100 p-6`}>
      <div className="mb-4">
        <div className="h-6 w-32 rounded-md bg-gray-200 mb-2" />
        <div className="h-4 w-48 rounded-md bg-gray-200" />
      </div>
      <div className="h-64 rounded-md bg-gray-200" />
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <>
      {/* Titre principal */}
      <div className={`${shimmer} relative mb-6 h-8 w-48 overflow-hidden rounded-md bg-gray-100`} />
      
      {/* Grille principale */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Colonne gauche */}
        <div className="space-y-6">
          {/* Hérisson */}
          <HedgehogSkeleton />
          
          {/* Liste des habitudes */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className={`${shimmer} relative mb-4 h-6 w-32 overflow-hidden rounded-md bg-gray-100`} />
            <HabitsListSkeleton />
          </div>
        </div>
        
        {/* Colonne droite */}
        <div className="space-y-6">
          {/* Statistiques */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className={`${shimmer} relative mb-4 h-6 w-24 overflow-hidden rounded-md bg-gray-100`} />
            <StatsGridSkeleton />
          </div>
          
          {/* Calendrier */}
          <CalendarSkeleton />
        </div>
      </div>
    </>
  );
}

export function TableRowSkeleton() {
  return (
    <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      {/* Customer Name and Image */}
      <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-100"></div>
          <div className="h-6 w-24 rounded bg-gray-100"></div>
        </div>
      </td>
      {/* Email */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-32 rounded bg-gray-100"></div>
      </td>
      {/* Amount */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Date */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Status */}
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </td>
      {/* Actions */}
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex justify-end gap-3">
          <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
          <div className="h-[38px] w-[38px] rounded bg-gray-100"></div>
        </div>
      </td>
    </tr>
  );
}

export function InvoicesMobileSkeleton() {
  return (
    <div className="mb-2 w-full rounded-md bg-white p-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-8">
        <div className="flex items-center">
          <div className="mr-2 h-8 w-8 rounded-full bg-gray-100"></div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </div>
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
          <div className="mt-2 h-6 w-24 rounded bg-gray-100"></div>
        </div>
        <div className="flex justify-end gap-2">
          <div className="h-10 w-10 rounded bg-gray-100"></div>
          <div className="h-10 w-10 rounded bg-gray-100"></div>
        </div>
      </div>
    </div>
  );
}

export function InvoicesTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th
                  scope="col"
                  className="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6"
                >
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
