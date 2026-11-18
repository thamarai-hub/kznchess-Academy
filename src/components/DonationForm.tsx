import { useRef, useState, type FormEvent } from 'react';
import { academy, donationAreas, FORM_ENDPOINT, whatsappLink } from '../data/site';
import { btnGold, btnPrimary, btnWhatsApp, Icon } from './ui';
import { errorText, Field, fieldBase, isEmail, isPhone, type Status } from './form';

type Values = {
  name: string;
  email: string;
  phone: string;
  organisation: string;
  type: string;
  amount: string;
  area: string;
  message: string;
  consent: boolean;
};
type Errors = Partial<Record<keyof Values, string>>;

const initial: Values = {
  name: '',
  email: '',
  phone: '',
  organisation: '',
  type: '',
  amount: '',
  area: donationAreas[0],
  message: '',
  consent: false,
};

const supportTypes = ['Once-off donation', 'Monthly donation', 'Chess equipment', 'Sponsorship or partnership'];
const moneyTypes = new Set(['Once-off donation', 'Monthly donation']);
// Suggested amounts in South African rand. These are only shortcuts; any amount can be entered.
const presets = ['250', '500', '1000', '2500'];

const formatRand = (v: string) => `R${Number(v).toLocaleString('en-ZA')}`;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = 'Enter your name.';
  if (!isEmail(v.email)) e.email = 'Enter an email address like name@example.com.';
  if (!isPhone(v.phone)) e.phone = 'Enter a phone or WhatsApp number, for example +27 82 123 4567.';
  if (!v.type) e.type = 'Choose how you would like to support the academy.';
  if (moneyTypes.has(v.type) && v.amount.trim()) {
    const n = Number(v.amount);
    if (!Number.isFinite(n) || n <= 0) e.amount = 'Enter an amount in rand, for example 500, or leave it blank.';
  }
  if (!v.consent) e.consent = 'Tick the box so the academy can contact you about your donation.';
  return e;
}

function composeMessage(v: Values): string {
  const lines = [
    'Hello KZN Chess Academy, I would like to support the academy.',
    '',
    `Name: ${v.name.trim()}`,
    `Email: ${v.email.trim()}`,
    `Phone / WhatsApp: ${v.phone.trim()}`,
  ];
  if (v.organisation.trim()) lines.push(`Organisation: ${v.organisation.trim()}`);
  lines.push(`Type of support: ${v.type}`);
  if (moneyTypes.has(v.type) && v.amount.trim()) {
    lines.push(`Amount: ${formatRand(v.amount)}${v.type === 'Monthly donation' ? ' per month' : ''}`);
  }
  lines.push(`Area to support: ${v.area}`);
  if (v.message.trim()) lines.push('', `Message: ${v.message.trim()}`);
  lines.push(
    '',
    moneyTypes.has(v.type)
      ? 'Please share your banking details and how I can complete my donation.'
      : 'Please let me know how I can help.',
  );
  return lines.join('\n');
}

export default function DonationForm() {
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof Values>(key: K, val: Values[K]) => {
    setValues((v) => ({ ...v, [key]: val }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
    if (status.kind === 'ready' || status.kind === 'sent') setStatus({ kind: 'idle' });
  };

  const describedBy = (k: keyof Values, hint = false) => (errors[k] ? `d-${k}-error` : hint ? `d-${k}-hint` : undefined);
  const inputClass = (k: keyof Values) => `${fieldBase} ${errors[k] ? 'border-[#d92d20]' : 'border-line'}`;
  const showAmount = moneyTypes.has(values.type);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstKey = (Object.keys(initial) as (keyof Values)[]).find((k) => found[k]);
    if (firstKey) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }
    const message = composeMessage(values);

    if (FORM_ENDPOINT) {
      setStatus({ kind: 'sending' });
      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ formType: 'donation', ...values, summary: message }),
        });
        if (!res.ok) throw new Error(String(res.status));
        setStatus({ kind: 'sent' });
        setValues(initial);
      } catch {
        setStatus({ kind: 'ready', message, failed: true });
      }
    } else {
      setStatus({ kind: 'ready', message });
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  const mailto =
    status.kind === 'ready'
      ? `mailto:${academy.email}?subject=${encodeURIComponent(`Donation: ${values.name.trim()}`)}&body=${encodeURIComponent(status.message)}`
      : '';

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} aria-labelledby="donation-form-title" className="reveal rounded-[28px] border border-line bg-white p-6 shadow-[0_24px_60px_-40px_rgba(16,43,78,0.45)] sm:p-10">
      <h3 id="donation-form-title" className="text-2xl font-bold tracking-tight text-navy">
        Tell us about your donation
      </h3>
      <p className="mt-1.5 text-[15px] text-slate">Fields marked optional can be left blank.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Field id="d-name" label="Your name" error={errors.name}>
            <input id="d-name" name="name" type="text" autoComplete="name" value={values.name} onChange={(e) => set('name', e.target.value)} aria-invalid={!!errors.name} aria-describedby={describedBy('name')} className={inputClass('name')} />
          </Field>
        </div>
        <Field id="d-email" label="Email address" error={errors.email}>
          <input id="d-email" name="email" type="email" autoComplete="email" inputMode="email" value={values.email} onChange={(e) => set('email', e.target.value)} aria-invalid={!!errors.email} aria-describedby={describedBy('email')} className={inputClass('email')} />
        </Field>
        <Field id="d-phone" label="Phone / WhatsApp number" error={errors.phone}>
          <input id="d-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+27" value={values.phone} onChange={(e) => set('phone', e.target.value)} aria-invalid={!!errors.phone} aria-describedby={describedBy('phone')} className={inputClass('phone')} />
        </Field>
        <div className="sm:col-span-2">
          <Field id="d-organisation" label="Company or organisation (optional)">
            <input id="d-organisation" name="organisation" type="text" autoComplete="organization" value={values.organisation} onChange={(e) => set('organisation', e.target.value)} className={`${fieldBase} border-line`} />
          </Field>
        </div>

        <fieldset className="sm:col-span-2" aria-describedby={errors.type ? 'd-type-error' : undefined}>
          <legend className="mb-2 block text-[15px] font-semibold text-navy">How would you like to help?</legend>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {supportTypes.map((t) => (
              <label
                key={t}
                className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border bg-white px-4 py-3 text-[15px] font-medium transition-colors has-[:checked]:border-gold has-[:checked]:bg-gold-soft/60 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-gold/30 ${
                  errors.type ? 'border-[#d92d20]' : 'border-line'
                }`}
              >
                <input type="radio" name="type" value={t} checked={values.type === t} onChange={() => set('type', t)} className="h-[18px] w-[18px] accent-[#8a6512]" />
                {t}
              </label>
            ))}
          </div>
          {errors.type && (
            <p id="d-type-error" className={errorText}>
              {errors.type}
            </p>
          )}
        </fieldset>

        {showAmount && (
          <div className="sm:col-span-2">
            <p id="d-amount-label" className="mb-2 block text-[15px] font-semibold text-navy">
              Amount {values.type === 'Monthly donation' ? 'per month ' : ''}(optional)
            </p>
            <div className="flex flex-wrap gap-2" role="group" aria-labelledby="d-amount-label">
              {presets.map((p) => {
                const on = values.amount === p;
                return (
                  <button
                    key={p}
                    type="button"
                    aria-pressed={on}
                    onClick={() => set('amount', on ? '' : p)}
                    className={`min-h-11 rounded-full border px-4 text-[15px] font-semibold tabular-nums transition-colors ${
                      on ? 'border-navy bg-navy text-white' : 'border-line bg-white text-navy hover:border-navy/40'
                    }`}
                  >
                    {formatRand(p)}
                  </button>
                );
              })}
            </div>
            <div className="relative mt-3 max-w-[16rem]">
              <label htmlFor="d-amount" className="sr-only">
                Another amount in rand
              </label>
              <span aria-hidden="true" className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 font-semibold text-slate">
                R
              </span>
              <input
                id="d-amount"
                name="amount"
                type="number"
                inputMode="decimal"
                min={1}
                step="any"
                placeholder="Another amount"
                value={values.amount}
                onChange={(e) => set('amount', e.target.value)}
                aria-invalid={!!errors.amount}
                aria-describedby={describedBy('amount', true)}
                className={`${inputClass('amount')} pl-9 tabular-nums`}
              />
            </div>
            {errors.amount ? (
              <p id="d-amount-error" className={errorText}>
                {errors.amount}
              </p>
            ) : (
              <p id="d-amount-hint" className="mt-1.5 text-sm text-slate">
                You can confirm the amount later when you make your transfer.
              </p>
            )}
          </div>
        )}

        <div className="sm:col-span-2">
          <Field id="d-area" label="Where should your support go?">
            <div className="relative">
              <select id="d-area" name="area" value={values.area} onChange={(e) => set('area', e.target.value)} className={`${fieldBase} border-line appearance-none pr-11`}>
                {donationAreas.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
              <Icon.ChevronRight className="pointer-events-none absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 rotate-90 text-slate" />
            </div>
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field id="d-message" label="Message (optional)" hint="For example, equipment you can offer or the event you would like to sponsor.">
            <textarea id="d-message" name="message" rows={3} value={values.message} onChange={(e) => set('message', e.target.value)} aria-describedby={describedBy('message', true)} className={`${fieldBase} border-line`} />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <label className="flex cursor-pointer items-start gap-3 text-[15px] leading-relaxed text-ink">
            <input type="checkbox" name="consent" checked={values.consent} onChange={(e) => set('consent', e.target.checked)} aria-invalid={!!errors.consent} aria-describedby={describedBy('consent')} className="mt-1 h-5 w-5 shrink-0 accent-[#2364aa]" />
            I agree that KZN Chess Academy may contact me by phone, WhatsApp or email about my donation.
          </label>
          {errors.consent && (
            <p id="d-consent-error" className={`${errorText} pl-8`}>
              {errors.consent}
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" className={`${btnGold} w-full sm:w-auto`} disabled={status.kind === 'sending'}>
          <Icon.Heart className="h-5 w-5" />
          {status.kind === 'sending' ? 'Sending…' : 'Send Donation Details'}
        </button>
        {!FORM_ENDPOINT && <p className="text-sm text-slate">You’ll send it through WhatsApp or email, so you keep a copy.</p>}
      </div>

      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none">
        {status.kind === 'sent' && (
          <div className="mt-6 rounded-2xl border border-[#abefc6] bg-[#ecfdf3] p-5 text-[15px] text-[#05603a]">
            <p className="font-semibold">Donation details sent.</p>
            <p className="mt-1">Thank you. The academy will contact you with the next steps.</p>
          </div>
        )}
        {status.kind === 'ready' && (
          <div className="mt-6 rounded-2xl border border-gold/60 bg-mist p-5 sm:p-6">
            <p className="font-semibold text-navy">{status.failed ? 'Your details couldn’t be sent from this page.' : 'Your donation details are ready to send.'}</p>
            <p className="mt-1 text-[15px] text-slate">
              They haven’t reached the academy yet. Choose WhatsApp or email, then press send in that app. No payment is taken on this website.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a href={whatsappLink(status.message)} target="_blank" rel="noopener noreferrer" className={btnWhatsApp}>
                <Icon.WhatsApp className="h-5 w-5" />
                Send via WhatsApp
              </a>
              <a href={mailto} className={`${btnPrimary} !bg-navy hover:!bg-navy-deep`}>
                <Icon.Mail className="h-5 w-5" />
                Send via email
              </a>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
