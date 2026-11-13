import { whatsappLink } from '../data/site';
import { Icon } from './ui';

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] z-40 inline-flex h-14 items-center gap-2 rounded-full bg-whatsapp pr-4 pl-4 text-white shadow-[0_12px_30px_-10px_rgba(16,43,78,0.55)] transition-colors hover:bg-[#187a41] sm:right-6 sm:bottom-6 sm:pr-5"
    >
      <Icon.WhatsApp className="h-7 w-7" />
      <span className="text-[15px] font-semibold max-sm:sr-only">Chat with us</span>
      <span className="sr-only sm:hidden">on WhatsApp</span>
    </a>
  );
}
