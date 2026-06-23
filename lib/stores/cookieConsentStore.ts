import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CookieConsent = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
};

interface CookieConsentState {
  hasConsented: boolean;
  consent: CookieConsent;
  showBanner: boolean;
  
  // Actions
  acceptAll: () => void;
  rejectAll: () => void;
  setConsent: (consent: CookieConsent) => void;
  hideBanner: () => void;
  showBanner: () => void;
  resetConsent: () => void;
}

const defaultConsent: CookieConsent = {
  necessary: true, // Always true - required for site functionality
  analytics: false,
  marketing: false,
  preferences: false,
};

export const useCookieConsentStore = create<CookieConsentState>()(
  persist(
    (set) => ({
      hasConsented: false,
      consent: defaultConsent,
      showBanner: true,

      acceptAll: () => {
        set({
          hasConsented: true,
          consent: {
            necessary: true,
            analytics: true,
            marketing: true,
            preferences: true,
          },
          showBanner: false,
        });
      },

      rejectAll: () => {
        set({
          hasConsented: true,
          consent: defaultConsent,
          showBanner: false,
        });
      },

      setConsent: (consent: CookieConsent) => {
        set({
          hasConsented: true,
          consent: { ...consent, necessary: true }, // Necessary always true
          showBanner: false,
        });
      },

      hideBanner: () => {
        set({ showBanner: false });
      },

      showBanner: () => {
        set({ showBanner: true });
      },

      resetConsent: () => {
        set({
          hasConsented: false,
          consent: defaultConsent,
          showBanner: true,
        });
      },
    }),
    {
      name: 'deee-todo-cookie-consent',
      partialize: (state) => ({
        hasConsented: state.hasConsented,
        consent: state.consent,
      }),
    }
  )
);
