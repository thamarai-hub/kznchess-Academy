import { whatsappLink } from '../data/site';
import { btnGold, btnOutlineLight, container, Icon } from './ui';

export default function FinalCTA() {
  return (
    <section aria-labelledby="cta-title" className="bg-white pt-10 sm:pt-14">
      <div className={container}>
        <div className="reveal relative overflow-hidden rounded-[32px] bg-royal px-6 py-14 text-center text-white sm:px-12 sm:py-20">
          <div aria-hidden="true" className="checker absolute -top-10 -left-10 h-56 w-56 text-white/[0.06]" />
          <div aria-hidden="true" className="checker absolute -right-10 -bottom-10 h-56 w-56 text-gold/25" />
          <div className="relative mx-auto max-w-2xl">
            <span aria-hidden="true" className="mx-auto mb-6 block h-3 w-3 rotate-45 bg-gold" />
            <h2 id="cta-title" className="text-[2rem] leading-[1.1] font-extrabold tracking-[-0.02em] text-balance sm:text-[2.8rem]">
              Your Child’s Chess Journey Starts Here
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-white/85">
              Whether your child is discovering chess for the first time or looking to develop their competitive skills,
              we would love to hear from you.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <a href="#contact" className={btnGold}>
                Enquire About Classes
              </a>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={btnOutlineLight}>
                <Icon.WhatsApp className="h-5 w-5" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
