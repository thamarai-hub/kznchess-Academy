import { useRef, useState, type FormEvent } from 'react';
import { academy, FORM_ENDPOINT, fullAddress, mapsDirectionsUrl, programmeOptions, whatsappLink } from '../data/site';
import { btnPrimary, btnWhatsApp, container, Icon, SectionHeading } from './ui';
import { errorText, Field, fieldBase, isEmail, isPhone, type Status } from './form';

type Values = {
  name: string;
  email: string;
  phone: string;
  age: string;
  programme: string;
  format: string;
  message: string;
  consent: boolean;
};
type Errors = Partial<Record<keyof Values, string>>;

const initial: Values = { name: '', email: '', phone: '', age: '', programme: '', format: '', message: '', consent: false };
const formats = ['Online', 'At the academy', 'Private lessons'];

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = 'Enter the parent or guardian’s name.';
  if (!isEmail(v.email)) e.email = 'Enter an email address like name@example.com.';
  if (!isPhone(v.phone)) e.phone = 'Enter a phone or WhatsApp number, for example +27 82 123 4567.';
  const age = Number(v.age);
  if (!v.age.trim() || !Number.isInteger(age) || age < 1 || age > 99) e.age = 'Enter your child’s age in years.';
  if (!v.programme) e.programme = 'Choose a programme, or “Not sure yet”.';
  if (!v.format) e.format = 'Choose a class format.';
  if (!v.consent) e.consent = 'Tick the box so the academy can contact you about this enquiry.';
  return e;
}

function composeMessage(v: Values): string {
  const lines = [
    'Hello KZN Chess Academy, I would like to enquire about chess classes for my child.',
    '',
    `Parent / guardian: ${v.name.trim()}`,
    `Email: ${v.email.trim()}`,
    `Phone / WhatsApp: ${v.phone.trim()}`,
    `Child’s age: ${v.age.trim()}`,
    `Programme: ${v.programme}`,
    `Preferred format: ${v.format}`,
  ];
  if (v.message.trim()) lines.push('', `Message: ${v.message.trim()}`);
  lines.push('', 'Please share the available programmes, fees, lesson times and registration details.');
  return lines.join('\n');
}

export default function ContactForm() {
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

  const describedBy = (k: keyof Values, hint = false) => (errors[k] ? `${k}-error` : hint ? `${k}-hint` : undefined);

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
          body: JSON.stringify({ ...values, summary: message }),
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

  const inputClass = (k: keyof Values) => `${fieldBase} ${errors[k] ? 'border-[#d92d20]' : 'border-line'}`;
  const mailto =
    status.kind === 'ready'
      ? `mailto:${academy.email}?subject=${encodeURIComponent(`Chess class enquiry: ${values.name.trim()}`)}&body=${encodeURIComponent(status.message)}`
      : '';

  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-white py-20 sm:py-28">
      <div className={`${container} grid gap-12 lg:grid-cols-12 lg:gap-16`}>
        <div className="lg:col-span-5">
          <SectionHeading
            id="contact-title"
            kicker="Contact and enrolment"
            title="Let’s Make the First Move Together"
            intro="Tell us a little about your child and we’ll recommend the right class, then share options, fees and lesson times."
          />

          <ul className="reveal mt-10 space-y-6">
            <li className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mist text-royal"><Icon.Pin className="h-5 w-5" /></span>
              <div>
                <p className="text-sm font-medium text-slate">Address</p>
                <p className="text-[17px] font-semibold text-navy">{fullAddress}</p>
                <a href={mapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex min-h-10 items-center text-[15px] font-semibold text-royal underline decoration-gold decoration-2 underline-offset-4 hover:text-navy">
                  Get directions on Google Maps
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mist text-royal"><Icon.Phone className="h-5 w-5" /></span>
              <div>
                <p className="text-sm font-medium text-slate">Phone</p>
                <a href={academy.phoneHref} className="text-[17px] font-semibold text-navy hover:text-royal">{academy.phoneDisplay}</a>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mist text-whatsapp"><Icon.WhatsApp className="h-5 w-5" /></span>
              <div>
                <p className="text-sm font-medium text-slate">WhatsApp</p>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="text-[17px] font-semibold text-navy hover:text-royal">{academy.whatsappDisplay}</a>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mist text-royal"><Icon.Mail className="h-5 w-5" /></span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate">Email</p>
                <a href={`mailto:${academy.email}`} className="text-[17px] font-semibold break-words text-navy hover:text-royal">{academy.email}</a>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mist text-royal"><Icon.Clock className="h-5 w-5" /></span>
              <div>
                <p className="text-sm font-medium text-slate">Class schedule window</p>
                <p className="text-[17px] font-semibold text-navy">{academy.scheduleWindow}</p>
                <p className="text-[15px] text-slate">Lesson days and times are confirmed when you enquire.</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-7">
          <form ref={formRef} noValidate onSubmit={onSubmit} aria-labelledby="form-title" className="reveal rounded-[28px] border border-line bg-mist p-6 sm:p-10">
            <h3 id="form-title" className="text-2xl font-bold tracking-tight text-navy">
              Enrolment enquiry
            </h3>
            <p className="mt-1.5 text-[15px] text-slate">All fields are required except the message.</p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field id="name" label="Parent / Guardian Name" error={errors.name}>
                  <input id="name" name="name" type="text" autoComplete="name" value={values.name} onChange={(e) => set('name', e.target.value)} aria-invalid={!!errors.name} aria-describedby={describedBy('name')} className={inputClass('name')} />
                </Field>
              </div>
              <Field id="email" label="Email Address" error={errors.email}>
                <input id="email" name="email" type="email" autoComplete="email" inputMode="email" value={values.email} onChange={(e) => set('email', e.target.value)} aria-invalid={!!errors.email} aria-describedby={describedBy('email')} className={inputClass('email')} />
              </Field>
              <Field id="phone" label="Phone / WhatsApp Number" error={errors.phone}>
                <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+27" value={values.phone} onChange={(e) => set('phone', e.target.value)} aria-invalid={!!errors.phone} aria-describedby={describedBy('phone')} className={inputClass('phone')} />
              </Field>
              <Field id="age" label="Child’s Age" error={errors.age}>
                <input id="age" name="age" type="number" inputMode="numeric" min={1} max={99} value={values.age} onChange={(e) => set('age', e.target.value)} aria-invalid={!!errors.age} aria-describedby={describedBy('age')} className={inputClass('age')} />
              </Field>
              <Field id="programme" label="Programme Interested In" error={errors.programme}>
                <div className="relative">
                  <select id="programme" name="programme" value={values.programme} onChange={(e) => set('programme', e.target.value)} aria-invalid={!!errors.programme} aria-describedby={describedBy('programme')} className={`${inputClass('programme')} appearance-none pr-11`}>
                    <option value="">Select a programme</option>
                    {programmeOptions.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                  <Icon.ChevronRight className="pointer-events-none absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 rotate-90 text-slate" />
                </div>
              </Field>

              <fieldset className="sm:col-span-2" aria-describedby={errors.format ? 'format-error' : undefined}>
                <legend className="mb-2 block text-[15px] font-semibold text-navy">Preferred Class Format</legend>
                <div className="grid gap-2.5 sm:grid-cols-3">
                  {formats.map((f) => (
                    <label
                      key={f}
                      className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border bg-white px-4 py-3 text-[15px] font-medium transition-colors has-[:checked]:border-royal has-[:checked]:bg-[#eef4fb] has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-royal/20 ${
                        errors.format ? 'border-[#d92d20]' : 'border-line'
                      }`}
                    >
                      <input type="radio" name="format" value={f} checked={values.format === f} onChange={() => set('format', f)} className="h-[18px] w-[18px] accent-[#2364aa]" />
                      {f}
                    </label>
                  ))}
                </div>
                {errors.format && (
                  <p id="format-error" className={errorText}>
                    {errors.format}
                  </p>
                )}
              </fieldset>

              <div className="sm:col-span-2">
                <Field id="message" label="Message (optional)" hint="Anything we should know, such as your child’s experience or preferred days.">
                  <textarea id="message" name="message" rows={4} value={values.message} onChange={(e) => set('message', e.target.value)} aria-describedby={describedBy('message', true)} className={`${fieldBase} border-line`} />
                </Field>
              </div>

              <div className="sm:col-span-2">
                <label className="flex cursor-pointer items-start gap-3 text-[15px] leading-relaxed text-ink">
                  <input type="checkbox" name="consent" checked={values.consent} onChange={(e) => set('consent', e.target.checked)} aria-invalid={!!errors.consent} aria-describedby={describedBy('consent')} className="mt-1 h-5 w-5 shrink-0 accent-[#2364aa]" />
                  I agree that KZN Chess Academy may contact me by phone, WhatsApp or email about this enquiry.
                </label>
                {errors.consent && (
                  <p id="consent-error" className={`${errorText} pl-8`}>
                    {errors.consent}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button type="submit" className={`${btnPrimary} w-full sm:w-auto`} disabled={status.kind === 'sending'}>
                {status.kind === 'sending' ? 'Sending…' : 'Send Enquiry'}
              </button>
              {!FORM_ENDPOINT && <p className="text-sm text-slate">You’ll send it through WhatsApp or email, so you keep a copy.</p>}
            </div>

            <div ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none">
              {status.kind === 'sent' && (
                <div className="mt-6 rounded-2xl border border-[#abefc6] bg-[#ecfdf3] p-5 text-[15px] text-[#05603a]">
                  <p className="font-semibold">Enquiry sent.</p>
                  <p className="mt-1">The academy will be in touch using the details you provided.</p>
                </div>
              )}
              {status.kind === 'ready' && (
                <div className="mt-6 rounded-2xl border border-gold/60 bg-white p-5 sm:p-6">
                  <p className="font-semibold text-navy">{status.failed ? 'Your enquiry couldn’t be sent from this page.' : 'Your enquiry is ready to send.'}</p>
                  <p className="mt-1 text-[15px] text-slate">
                    It hasn’t reached the academy yet. Choose WhatsApp or email, then press send in that app.
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
        </div>
      </div>
    </section>
  );
}
