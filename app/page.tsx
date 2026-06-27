import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/sections/HeroSection';
import CopisteriaSection from '@/components/sections/CopisteriaSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ShopPreview from '@/components/sections/ShopPreview';
import FeaturesSection from '@/components/sections/FeaturesSection';
import ContactSection from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <MainLayout showParticles={true}>
      <HeroSection />
      <CopisteriaSection />
      <ServicesSection />
      <ShopPreview />
      <FeaturesSection />
      <ContactSection />
    </MainLayout>
  );
}
