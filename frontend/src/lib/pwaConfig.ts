"use client";

// PWA Configuration for Next.js
// This file contains configuration for offline functionality and service worker setup

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface PWAState {
  isInstallable: boolean;
  isInstalled: boolean;
  isOnline: boolean;
  updateAvailable: boolean;
}

// Service Worker registration
export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered:', registration);
      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      return null;
    }
  }
  return null;
};

// Check if app is installable
export const canInstallPWA = (): boolean => {
  if (typeof window === 'undefined') return false;

  // Check for standalone mode
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  if (isStandalone) return false;

  // Check for beforeinstallprompt event
  const isInstallable = !!window.BeforeInstallPrompt;
  if (window.matchMedia('(display-mode: browser)').matches && isInstallable) {
    return true;
  }

  return false;
};

// Show install prompt
export const showInstallPrompt = async (): Promise<boolean> => {
  if (typeof window === 'undefined') return false;

  const promptEvent = (window as any).BeforeInstallPrompt;
  if (!promptEvent) return false;

  try {
    await promptEvent.prompt();
    const choiceResult = await promptEvent.userChoice;
    return choiceResult.outcome === 'accepted';
  } catch (error) {
    console.error('Install prompt failed:', error);
    return false;
  }
};

// Cache strategies for different types of content
export const CACHE_STRATEGIES = {
  // Cache-first for critical resources
  critical: {
    cacheName: 'skyfare-critical',
    strategy: 'cache-first',
    expiration: { maxAgeSeconds: 3600 },
    cacheableResponseCodes: { 0: 200, 1: 200, 2: 200, 3: 200 },
  },

  // Network-first for dynamic data
  dynamic: {
    cacheName: 'skyfare-dynamic',
    strategy: 'network-first',
    expiration: { maxAgeSeconds: 300 },
    cacheableResponseCodes: { 0: 200, 1: 200, 2: 200 },
  },

  // Cache-first for tour images
  images: {
    cacheName: 'skyfare-images',
    strategy: 'cache-first',
    expiration: { maxAgeSeconds: 86400 },
    cacheableResponseCodes: { 0: 200, 1: 200, 2: 200 },
  },

  // Stale-while-revalidate for content
  content: {
    cacheName: 'skyfare-content',
    strategy: 'stale-while-revalidate',
    expiration: { maxAgeSeconds: 3600 },
    cacheableResponseCodes: { 0: 200, 1: 200, 2: 200 },
  },
};

// Offline fallback pages
export const OFFLINE_FALLBACKS = {
  '/tours/[id]': '/offline-tour',
  '/tours': '/offline-tours',
  '/login': '/login',
  '/register': '/login',
  '/booking': '/offline-booking',
  '/account': '/login',
};

// PWA event listeners setup
export const setupPWAEvents = (
  callback: (state: Partial<PWAState>) => void
) => {
  if (typeof window === 'undefined') return () => {};

  const updateState = (updates: Partial<PWAState>) => {
    callback(updates as PWAState);
  };

  // Before install prompt
  const handleBeforeInstallPrompt = (event: Event) => {
    event.preventDefault();
    updateState({ isInstallable: true });
    (window as any).BeforeInstallPrompt = event;
  };

  // App installed
  const handleAppInstalled = () => {
    updateState({ isInstalled: true, isInstallable: false });
    delete (window as any).BeforeInstallPrompt;
  };

  // Online status
  const handleOnline = () => {
    updateState({ isOnline: true });
  };

  const handleOffline = () => {
    updateState({ isOnline: false });
  };

  // Add event listeners
  window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  window.addEventListener('appinstalled', handleAppInstalled);
  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);

  // Cleanup function
  return () => {
    window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.removeEventListener('appinstalled', handleAppInstalled);
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
};

// Check if running in standalone mode
export const isStandalone = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(display-mode: standalone)').matches;
};

// Request notification permission
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return false;
  }

  const permission = await Notification.requestPermission();
  return permission === 'granted';
};

// Show local notification
export const showLocalNotification = (title: string, options?: NotificationOptions) => {
  if (typeof window === 'undefined' || !isStandalone()) {
    return;
  }

  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, options);
  }
};

// Cache tour data for offline access
export const cacheTourData = async (tours: any[]): Promise<void> => {
  if (typeof window === 'undefined') return;

  try {
    const cache = await caches.open(CACHE_STRATEGIES.content.cacheName);
    const tourData = JSON.stringify(tours);
    await cache.put('/api/tours', new Response(tourData, {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    }));
  } catch (error) {
    console.error('Failed to cache tour data:', error);
  }
};

// Get cached tour data
export const getCachedTourData = async (): Promise<any[]> => {
  if (typeof window === 'undefined') return [];

  try {
    const cache = await caches.open(CACHE_STRATEGIES.content.cacheName);
    const response = await cache.match('/api/tours');
    if (response) {
      return await response.json();
    }
  } catch (error) {
    console.error('Failed to get cached tour data:', error);
  }
  return [];
};

// Check if content is available offline
export const isContentAvailableOffline = async (): Promise<boolean> => {
  if (typeof window === 'undefined') return false;

  try {
    const cache = await caches.open(CACHE_STRATEGIES.content.cacheName);
    const response = await cache.match('/api/tours');
    return response !== undefined;
  } catch (error) {
    return false;
  }
};

export default {
  registerServiceWorker,
  canInstallPWA,
  showInstallPrompt,
  CACHE_STRATEGIES,
  OFFLINE_FALLBACKS,
  setupPWAEvents,
  isStandalone,
  requestNotificationPermission,
  showLocalNotification,
  cacheTourData,
  getCachedTourData,
  isContentAvailableOffline,
};