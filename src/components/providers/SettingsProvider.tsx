'use client';
import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { PHONES } from '@/lib/utils';

type SettingsMap = Record<string, any>;

const SettingsContext = createContext<SettingsMap>({});

// Global event to force all consumers to re-read PHONES/settings
const TICK_EVENT = 'ro-settings-tick';

/**
 * Global settings provider — /api/settings se public config fetch karta hai
 * (phone numbers, prices, hero banner, brand).
 *
 * Special: PHONES constant ko directly mutate karta hai so purane code mein bhi
 * jo hardcoded PHONES.primary use kar rahe hain, unhe bhi naya number mil jaye.
 * Force re-render ke liye custom event dispatch karta hai.
 */
export default function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SettingsMap>({});
  const [tick, setTick] = useState(0);

  const applySettings = useCallback((d: SettingsMap) => {
    setSettings(d);
    // Mutate shared PHONES object so legacy code that imports PHONES directly gets new values
    if (d['contact.primaryPhone']) PHONES.primary = String(d['contact.primaryPhone']);
    if (d['contact.secondaryPhone']) PHONES.secondary = String(d['contact.secondaryPhone']);
    if (d['contact.whatsapp']) PHONES.whatsapp = String(d['contact.whatsapp']);
    if (d['service.visitCharge']) (window as any).__RO_VISIT_CHARGE__ = Number(d['service.visitCharge']);
    // Notify everyone to re-render
    window.dispatchEvent(new Event(TICK_EVENT));
    setTick(t => t + 1);
  }, []);

  useEffect(() => {
    fetch('/api/settings', { cache: 'no-store' })
      .then(r => r.json())
      .then(d => { if (d && typeof d === 'object') applySettings(d); })
      .catch(() => {});

    const onTick = () => setTick(t => t + 1);
    window.addEventListener(TICK_EVENT, onTick);

    const t = setInterval(() => {
      fetch('/api/settings', { cache: 'no-store' })
        .then(r => r.json())
        .then(d => { if (d && typeof d === 'object') applySettings(d); })
        .catch(() => {});
    }, 60000);

    return () => { clearInterval(t); window.removeEventListener(TICK_EVENT, onTick); };
  }, [applySettings]);

  return (
    <SettingsContext.Provider value={{ ...settings, __tick: tick }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}

/** Hook jo global tick pe re-render karta hai - legacy PHONES consumers ke liye */
export function useSettingsTick() {
  const ctx = useContext(SettingsContext);
  return ctx.__tick || 0;
}

export function useSetting<T = any>(key: string, fallback: T): T {
  const s = useContext(SettingsContext);
  return (s[key] ?? fallback) as T;
}
