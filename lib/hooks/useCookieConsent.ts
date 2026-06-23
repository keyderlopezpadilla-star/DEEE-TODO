import { useEffect } from 'react';
import { useCookieConsentStore } from '../stores/cookieConsentStore';

/**
 * Hook to check if a specific type of cookie is consented
 * Use this before initializing analytics, marketing, or preference cookies
 */
export function useCookieConsent() {
  const { consent, hasConsented } = useCookieConsentStore();

  return {
    hasConsented,
    canUseAnalytics: hasConsented && consent.analytics,
    canUseMarketing: hasConsented && consent.marketing,
    canUsePreferences: hasConsented && consent.preferences,
    consent,
  };
}

/**
 * Hook to conditionally initialize analytics
 * Example usage:
 * 
 * useAnalytics(() => {
 *   // Initialize Google Analytics
 *   gtag('config', 'GA_MEASUREMENT_ID');
 * });
 */
export function useAnalytics(initFn: () => void) {
  const { canUseAnalytics } = useCookieConsent();

  useEffect(() => {
    if (canUseAnalytics) {
      initFn();
    }
  }, [canUseAnalytics, initFn]);
}

/**
 * Hook to conditionally initialize marketing pixels
 * Example usage:
 * 
 * useMarketing(() => {
 *   // Initialize Facebook Pixel
 *   fbq('init', 'PIXEL_ID');
 * });
 */
export function useMarketing(initFn: () => void) {
  const { canUseMarketing } = useCookieConsent();

  useEffect(() => {
    if (canUseMarketing) {
      initFn();
    }
  }, [canUseMarketing, initFn]);
}
