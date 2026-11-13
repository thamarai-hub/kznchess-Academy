import { container, SectionHeading } from './ui';

export default function Testimonials() {
  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="bg-mist py-20 sm:py-28">
      <div className={container}>
        <SectionHeading id="testimonials-title" kicker="Testimonials" title="What Parents Say About Us" align="center" />

        <figure className="reveal relative mx-auto mt-14 max-w-3xl rounded-[28px] border border-line bg-white px-7 pt-14 pb-10 text-center sm:px-14 sm:pt-16 sm:pb-12">
          <span aria-hidden="true" className="absolute -top-8 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-gold text-navy">
            <svg viewBox="0 0 32 24" className="h-6 w-8" fill="currentColor">
              <path d="M0 24V14.4C0 6.6 4.2 1.8 12.4 0l1.6 3.4C9.7 4.8 7.6 7.4 7.3 11H13v13H0Zm19 0V14.4C19 6.6 23.2 1.8 31.4 0L33 3.4C28.7 4.8 26.6 7.4 26.3 11H32v13H19Z" />
            </svg>
          </span>
          <blockquote>
            <p className="text-xl leading-relaxed font-medium tracking-[-0.01em] text-navy text-pretty sm:text-[1.6rem] sm:leading-[1.5]">
              Our journey with the KZN Chess Academy has been such a special one. As parents it makes us so happy to see
              how much Peyton has grown not just as a chess player but also in her confidence, patience and resilience.
            </p>
          </blockquote>
          <figcaption className="mt-8 flex items-center justify-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-gold" />
            <span className="font-bold text-navy">Mrs Chetty</span>
            <span className="text-slate">Parent</span>
            <span aria-hidden="true" className="h-px w-8 bg-gold" />
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
