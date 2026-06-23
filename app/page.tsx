import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import ContactSection from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <MainLayout showParticles={true}>
      <HeroSection />
      <ServicesSection />
      <FeaturesSection />
      <ContactSection />
    </MainLayout>
  );
}
