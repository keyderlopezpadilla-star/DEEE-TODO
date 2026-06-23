'use client';

import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import ParticleBackground from '../ui/ParticleBackground';

interface MainLayoutProps {
  children: ReactNode;
  showParticles?: boolean;
}

export default function MainLayout({ children, showParticles = true }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-dark text-foreground">
      {/* Animated particle background */}
      {showParticles && <ParticleBackground />}
      
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="pt-20 md:pt-24">
        {children}
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
