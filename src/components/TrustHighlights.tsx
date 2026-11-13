import { container, Icon } from './ui';

const items = [
  { icon: Icon.Calendar, title: 'Established in 2015', text: 'Chess education in KZN since 2015' },
  { icon: Icon.Shield, title: 'FIDE Tier-2 Academy', text: 'Licensed by the World Chess Federation' },
  { icon: Icon.Rook, title: 'Expert titled coaches', text: 'National and International Masters' },
  { icon: Icon.Medal, title: 'Champions developed', text: 'Provincial, national and continental' },
];

export default function TrustHighlights() {
  return (
    <section aria-label="Academy highlights" className="bg-navy text-white">
      <div className={container}>
        <ul className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {items.map(({ icon: I, title, text }, i) => (
            <li
              key={title}
              className={`flex items-center gap-4 py-6 sm:py-8 lg:px-7 ${i === 0 ? 'lg:pl-0' : ''} ${i > 1 ? 'sm:border-t sm:border-white/10 lg:border-t-0' : ''}`}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold/40 text-gold">
                <I className="h-[22px] w-[22px]" />
              </span>
              <span>
                <span className="block text-[16px] font-bold">{title}</span>
                <span className="block text-sm text-white/65">{text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
