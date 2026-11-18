import { useState } from 'react';
import DonationForm from '../components/DonationForm';
import { btnGold, btnOutline, btnOutlineLight, container, Icon, Img, SectionHeading } from '../components/ui';
import { academy, donation, DONATION_ENQUIRY, hasBankDetails, photos, whatsappLink, type Photo } from '../data/site';

const equipmentMessage =
  'Hello KZN Chess Academy, I would like to donate chess equipment to the academy. Please let me know what is needed at the moment.';
const sponsorMessage =
  'Hello KZN Chess Academy, I am interested in sponsoring or partnering with the academy. Please share how we can work together.';

type Area = { title: string; text: string; photo: Photo };

const areas: Area[] = [
  {
    title: 'Chess in the Community',
    text: 'Community-focused initiatives that make chess learning more accessible and encourage participation.',
    photo: photos.communityGames,
  },
  {
    title: 'Infinite Chess',
    text: 'Our specialised chess programme for children with autism, part of the academy’s commitment to inclusive chess education.',
    photo: photos.inclusiveOutreach,
  },
  {
    title: 'Chess in Schools',
    text: 'Programmes that introduce chess and structured learning opportunities within schools.',
    photo: photos.schoolClass,
  },
  {
    title: 'Tournaments and chess camps',
    text: 'Helping young players take part in tournaments and chess camps, where they gain match experience and confidence.',
    photo: photos.tournamentOutdoor,
  },
];

const textLink = 'font-semibold text-royal underline decoration-gold decoration-2 underline-offset-4 hover:text-navy';

function DonateHero() {
  return (
    <section aria-labelledby="donate-title" className="relative overflow-hidden bg-white">
      <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-[38%] bg-gold-soft/50 lg:block" />
      <div className={`${container} relative grid items-center gap-10 pt-10 pb-14 sm:pt-14 lg:grid-cols-12 lg:gap-8 lg:py-20`}>
        <div className="lg:col-span-6 lg:pr-4">
          <p className="hero-in mb-6 inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold-soft/60 px-3.5 py-1.5 text-[13px] font-semibold text-gold-ink">
            <Icon.Heart className="h-4 w-4" />
            Support KZN Chess Academy
          </p>
          <h1 id="donate-title" className="hero-in hero-in-2 text-[2.5rem] leading-[1.05] font-extrabold tracking-[-0.03em] text-navy text-balance sm:text-[3.2rem] lg:text-[3.6rem]">
            Help Bring Chess to Every Child
          </h1>
          <p className="hero-in hero-in-3 mt-6 max-w-[34rem] text-[17px] leading-relaxed text-slate sm:text-lg">
            Your donation helps KZN Chess Academy reach more children across KwaZulu-Natal, in schools, in communities
            and through Infinite Chess, our programme for children with autism.
          </p>
          <div className="hero-in hero-in-4 mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#give" className={btnGold}>
              <Icon.Heart className="h-5 w-5" />
              Make a Donation
            </a>
            <a href={whatsappLink(DONATION_ENQUIRY)} target="_blank" rel="noopener noreferrer" className={btnOutline}>
              <Icon.WhatsApp className="h-5 w-5 text-whatsapp" />
              Ask on WhatsApp
            </a>
          </div>
          <p className="hero-in hero-in-4 mt-8 text-sm text-slate">
            A licensed FIDE Tier-2 Academy, founded in 2015 and based in Umhlanga, Durban.
          </p>
        </div>

        <div className="relative lg:col-span-6">
          <div aria-hidden="true" className="checker absolute -top-5 -right-5 hidden h-36 w-36 text-gold/70 sm:block" />
          <figure className="hero-photo relative overflow-hidden rounded-[28px] bg-mist shadow-[0_30px_60px_-30px_rgba(16,43,78,0.45)]">
            <Img photo={photos.communityDay} eager sizes="(min-width: 1024px) 560px, 100vw" className="aspect-[4/3] w-full object-cover" />
            <figcaption className="bg-white px-4 py-3 text-sm text-slate sm:absolute sm:bottom-4 sm:left-4 sm:max-w-[18rem] sm:rounded-2xl sm:bg-white/92 sm:backdrop-blur">
              {photos.communityDay.caption}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function VisionBand() {
  return (
    <section aria-label="Our vision" className="relative overflow-hidden bg-navy text-white">
      <div aria-hidden="true" className="checker absolute -bottom-6 -left-6 h-40 w-40 text-gold/[0.12]" />
      <div className={`${container} relative py-16 sm:py-20`}>
        <figure className="reveal mx-auto max-w-3xl text-center">
          <span aria-hidden="true" className="mx-auto mb-6 block h-3 w-3 rotate-45 bg-gold" />
          <blockquote>
            <p className="text-[1.6rem] leading-[1.3] font-bold tracking-[-0.015em] text-balance sm:text-[2.1rem]">
              To create a future where chess is accessible to every child and recognised as a valuable part of education
              and personal development.
            </p>
          </blockquote>
          <figcaption className="mt-6 text-sm font-semibold text-gold">The vision of KZN Chess Academy</figcaption>
        </figure>
      </div>
    </section>
  );
}

function ImpactAreas() {
  return (
    <section id="impact" aria-labelledby="impact-title" className="bg-mist py-20 sm:py-28">
      <div className={container}>
        <SectionHeading
          id="impact-title"
          kicker="Where your support goes"
          title="Programmes Your Gift Can Support"
          intro="Choose an area when you tell us about your donation, or let the academy direct your gift to wherever it is needed most."
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((a) => (
            <li key={a.title} className="reveal flex flex-col overflow-hidden rounded-[22px] border border-line bg-white">
              <Img photo={a.photo} sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw" className="aspect-[3/2] w-full object-cover" />
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-bold tracking-tight text-navy">{a.title}</h3>
                <p className="mt-2.5 leading-relaxed text-slate">{a.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CopyRow({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };
  return (
    <div className="flex items-center justify-between gap-3 border-b border-white/10 py-3 last:border-0">
      <div className="min-w-0">
        <dt className="text-[13px] text-white/60">{label}</dt>
        <dd className="font-semibold break-words text-white tabular-nums select-all">{value}</dd>
      </div>
      <button type="button" onClick={copy} className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-white hover:border-gold hover:text-gold">
        <span className="sr-only">{copied ? `${label} copied` : `Copy ${label}`}</span>
        {copied ? <Icon.Check className="h-[18px] w-[18px]" /> : <Icon.Copy className="h-[18px] w-[18px]" />}
      </button>
    </div>
  );
}

function BankTransfer() {
  if (hasBankDetails) {
    const b = donation.bank;
    return (
      <dl className="mt-6 rounded-2xl bg-white/[0.06] px-5 py-1">
        <CopyRow label="Bank" value={b.bankName} />
        {b.accountName && <CopyRow label="Account name" value={b.accountName} />}
        <CopyRow label="Account number" value={b.accountNumber} />
        {b.branchCode && <CopyRow label="Branch code" value={b.branchCode} />}
        {b.reference && <CopyRow label="Reference" value={b.reference} />}
      </dl>
    );
  }
  return (
    <div className="mt-6 rounded-2xl bg-white/[0.06] p-5">
      <p className="text-[15px] leading-relaxed text-white/80">
        The academy shares its banking details directly, so you can be sure they are correct before you transfer.
      </p>
      <a href={whatsappLink(DONATION_ENQUIRY)} target="_blank" rel="noopener noreferrer" className={`${btnGold} mt-5 w-full`}>
        <Icon.WhatsApp className="h-5 w-5" />
        Request banking details
      </a>
      <p className="mt-4 text-sm text-white/70">
        Or email
        <a href={`mailto:${academy.email}?subject=${encodeURIComponent('Banking details for a donation')}`} className="mt-0.5 block font-semibold [overflow-wrap:anywhere] text-white underline decoration-gold decoration-2 underline-offset-4 select-all">
          {academy.email}
        </a>
      </p>
    </div>
  );
}

function WaysToGive() {
  return (
    <section id="give" aria-labelledby="give-title" className="bg-white py-20 sm:py-28">
      <div className={container}>
        <SectionHeading id="give-title" kicker="Ways to give" title="Choose How You’d Like to Help" />

        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          <article className="reveal flex flex-col rounded-[24px] bg-navy p-7 text-white sm:p-9 lg:col-span-6 lg:row-span-2">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold text-navy">
              <Icon.Bank className="h-6 w-6" />
            </span>
            <h3 className="mt-6 text-2xl font-bold tracking-tight">Make a financial donation</h3>
            <p className="mt-2.5 max-w-md leading-relaxed text-white/75">
              Give once or every month by bank transfer (EFT). Every contribution helps more children learn and play.
            </p>
            <BankTransfer />
            {donation.paymentUrl && (
              <a href={donation.paymentUrl} target="_blank" rel="noopener noreferrer" className={`${btnOutlineLight} mt-4`}>
                Donate online
              </a>
            )}
          </article>

          <article className="reveal flex flex-col rounded-[24px] border border-line bg-white p-7 sm:p-8 lg:col-span-6">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-mist text-royal">
                <Icon.Box className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-xl font-bold tracking-tight text-navy">Donate chess equipment</h3>
                <p className="mt-2 leading-relaxed text-slate">
                  Chess sets, boards and clocks help more children learn and play. Ask us what is needed before you donate items.
                </p>
                <a href={whatsappLink(equipmentMessage)} target="_blank" rel="noopener noreferrer" className={`mt-4 inline-flex min-h-11 items-center gap-2 ${textLink}`}>
                  <Icon.WhatsApp className="h-[18px] w-[18px] text-whatsapp" />
                  Ask what’s needed
                </a>
              </div>
            </div>
          </article>

          <article className="reveal flex flex-col rounded-[24px] border border-line bg-white p-7 sm:p-8 lg:col-span-6">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-mist text-royal">
                <Icon.Briefcase className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-xl font-bold tracking-tight text-navy">Sponsor or partner with us</h3>
                <p className="mt-2 leading-relaxed text-slate">
                  Businesses, schools and organisations can support programmes, events or young players. Talk to us about working together.
                </p>
                <a href={whatsappLink(sponsorMessage)} target="_blank" rel="noopener noreferrer" className={`mt-4 inline-flex min-h-11 items-center gap-2 ${textLink}`}>
                  <Icon.WhatsApp className="h-[18px] w-[18px] text-whatsapp" />
                  Start a conversation
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

const steps = [
  { title: 'Tell us about your donation', text: 'Fill in the form and send it to the academy by WhatsApp or email.' },
  { title: 'Hear back from the academy', text: 'The academy confirms your details and shares how to complete your donation.' },
  { title: 'Complete your gift', text: 'Make your transfer using your name as the reference, or arrange to drop off equipment.' },
];

function DonationEnquiry() {
  return (
    <section id="pledge" aria-labelledby="pledge-title" className="bg-mist py-20 sm:py-28">
      <div className={`${container} grid gap-12 lg:grid-cols-12 lg:gap-16`}>
        <div className="lg:col-span-5">
          <SectionHeading
            id="pledge-title"
            kicker="Donate"
            title="Start Your Donation"
            intro="No payment is taken on this website. Share your details and the academy will guide you through the rest."
          />

          <ol className="reveal mt-10 space-y-6">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-gold font-bold text-navy tabular-nums">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold text-navy">{s.title}</h3>
                  <p className="mt-1 leading-relaxed text-slate">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="reveal mt-10 rounded-2xl border border-line bg-white p-5">
            <p className="font-semibold text-navy">Questions about giving?</p>
            <ul className="mt-3 space-y-2 text-[15px]">
              <li className="flex items-center gap-2.5">
                <Icon.Phone className="h-[18px] w-[18px] shrink-0 text-royal" />
                <a href={academy.phoneHref} className={textLink}>
                  {academy.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon.Mail className="h-[18px] w-[18px] shrink-0 text-royal" />
                <a href={`mailto:${academy.email}`} className={`${textLink} min-w-0 [overflow-wrap:anywhere]`}>
                  {academy.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-7">
          <DonationForm />
        </div>
      </div>
    </section>
  );
}

export default function DonatePage() {
  return (
    <>
      <DonateHero />
      <VisionBand />
      <ImpactAreas />
      <WaysToGive />
      <DonationEnquiry />
    </>
  );
}
