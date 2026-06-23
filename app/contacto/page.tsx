import MainLayout from '@/components/layout/MainLayout';
import ContactSection from '@/components/sections/ContactSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto - DEEE TODO',
  description: 'Ponte en contacto con DEEE TODO. Visítanos en Algemesí, llámanos al 657 66 67 41 o envíanos un mensaje. Estamos aquí para ayudarte con tu proyecto.',
};

export default function ContactPage() {
  return (
    <MainLayout showParticles={true}>
      <div className="min-h-screen pt-12">
        <ContactSection />
      </div>
    </MainLayout>
  );
}
