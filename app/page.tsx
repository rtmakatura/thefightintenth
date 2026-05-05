import HeroV2 from '@/components/home/HeroV2';
import Telemetry from '@/components/home/Telemetry';
import AboutBookV2 from '@/components/home/AboutBookV2';
import PatchInterlude from '@/components/home/PatchInterlude';
import PraiseStage from '@/components/home/PraiseStage';
import CTABanner from '@/components/home/CTABanner';

export default function HomePage() {
  return (
    <main>
      <HeroV2 />
      <Telemetry />
      <AboutBookV2 />
      <PatchInterlude />
      <PraiseStage />
      <CTABanner />
    </main>
  );
}
