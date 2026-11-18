import type { ReactNode } from 'react';

// Shared building blocks for the enquiry and donation forms.

export const fieldBase =
  'block w-full rounded-xl border bg-white px-4 py-3 text-[16px] text-ink placeholder:text-slate/60 transition-colors focus:border-royal focus:outline-none focus:ring-4 focus:ring-royal/15';
export const errorText = 'mt-1.5 text-sm font-medium text-[#b42318]';

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
export const isPhone = (v: string) => {
  const digits = v.replace(/\D/g, '');
  return digits.length >= 9 && digits.length <= 15 && !/[^\d\s+()-]/.test(v);
};

// 'ready' means the message is prepared for WhatsApp or email but has NOT been delivered.
export type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent' } | { kind: 'ready'; message: string; failed?: boolean };

export function Field({ id, label, error, hint, children }: { id: string; label: string; error?: string; hint?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[15px] font-semibold text-navy">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-slate">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className={errorText}>
          {error}
        </p>
      )}
    </div>
  );
}
