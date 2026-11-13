import { useId, useState } from 'react';
import { faqs } from '../data/site';
import { container, Icon, SectionHeading } from './ui';

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-mist py-20 sm:py-28">
      <div className={`${container} grid gap-10 lg:grid-cols-12 lg:gap-16`}>
        <div className="lg:col-span-4">
          <SectionHeading
            id="faq-title"
            kicker="FAQs"
            title="Frequently Asked Questions"
            intro={
              <>
                Can’t find what you’re looking for?{' '}
                <a href="#contact" className="font-semibold text-royal underline decoration-gold decoration-2 underline-offset-4 hover:text-navy">
                  Get in touch
                </a>{' '}
                and we’ll help.
              </>
            }
          />
        </div>

        <div className="reveal lg:col-span-8">
          <ul className="divide-y divide-line overflow-hidden rounded-[22px] border border-line bg-white">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              const btnId = `${baseId}-q${i}`;
              const panelId = `${baseId}-a${i}`;
              return (
                <li key={f.q}>
                  <h3>
                    <button
                      id={btnId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left text-[17px] font-semibold text-navy hover:bg-mist/60 sm:px-8 sm:py-6"
                    >
                      {f.q}
                      <span
                        aria-hidden="true"
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                          isOpen ? 'rotate-45 border-gold bg-gold text-navy' : 'border-line text-royal'
                        }`}
                      >
                        <Icon.Plus className="h-[18px] w-[18px]" />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                    inert={!isOpen}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-[44rem] px-6 pb-6 text-[16px] leading-relaxed text-slate sm:px-8 sm:pb-7">{f.a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
