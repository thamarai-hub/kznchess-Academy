import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustHighlights from './components/TrustHighlights';
import AboutSection from './components/AboutSection';
import ProgrammesGrid from './components/ProgrammesGrid';
import WhyChooseUs from './components/WhyChooseUs';
import CoachesSection from './components/CoachesSection';
import AchievementsSection from './components/AchievementsSection';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import MissionVision from './components/MissionVision';
import FAQAccordion from './components/FAQAccordion';
import FinalCTA from './components/FinalCTA';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import DonatePage from './pages/DonatePage';
import type { Page } from './data/site';

// Fades sections in as they scroll into view (skipped when reduced motion is set; see index.css).
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function HomePage() {
  return (
    <>
      <Hero />
      <TrustHighlights />
      <AboutSection />
      <ProgrammesGrid />
      <WhyChooseUs />
      <CoachesSection />
      <AchievementsSection />
      <Gallery />
      <Testimonials />
      <MissionVision />
      <FAQAccordion />
      <FinalCTA />
      <ContactForm />
    </>
  );
}

export default function App({ page = 'home' }: { page?: Page }) {
  useReveal();
  return (
    <>
      <Header page={page} />
      <main id="main">{page === 'donate' ? <DonatePage /> : <HomePage />}</main>
      <Footer page={page} />
      <WhatsAppButton />
    </>
  );
}
