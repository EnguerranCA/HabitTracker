import MobileNavigation from '@/app/ui/mobile-navigation';

export const experimental_ppr = true;
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen bg-primary-50 flex flex-col">
      {/* Mobile-first layout */}
      <div className="max-w-sm mx-auto h-full flex flex-col relative">
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
        <MobileNavigation />
      </div>
    </div>
  );
}