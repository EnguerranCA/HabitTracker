import { lusitana } from '@/app/ui/fonts';

export default function HabitHissonLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-background`}
    >
      <span className="text-5xl mr-3">🦔</span>
      <p className="text-[32px] md:text-[38px]">Habit'Hisson</p>
    </div>
  );
}
