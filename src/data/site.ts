// Single source of truth for all academy details shown on the website.
// Everything here comes from the academy's onboarding form. Do not add
// prices, ratings, schedules or achievements that the academy has not supplied.

export const academy = {
  name: 'KZN Chess Academy',
  url: 'https://kznchessacademy.org',
  founded: 2015,
  founder: 'National Master Erick Takawira',
  address: {
    street: '1 Umhlanga Boulevard',
    locality: 'Umhlanga',
    city: 'Durban',
    region: 'KwaZulu-Natal',
    country: 'South Africa',
  },
  email: 'info@kznchessacademy.org',
  phoneDisplay: '+27 73 434 8634',
  phoneHref: 'tel:+27734348634',
  whatsappDisplay: '+27 76 233 3510',
  whatsappNumber: '27762333510',
  scheduleWindow: '09:00–18:00',
  facebook: 'https://web.facebook.com/kznchessacademy',
  instagram: 'https://www.instagram.com/kznchessacademy',
} as const;

export const fullAddress = `${academy.address.street}, ${academy.address.locality}, ${academy.address.city}, ${academy.address.region}, ${academy.address.country}`;

export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`;

// Optional: set this to a form service endpoint (for example Formspree or a
// serverless function) that accepts a JSON POST. While it is empty, the
// enquiry form prepares the message for WhatsApp or email instead, and never
// claims that anything was submitted.
export const FORM_ENDPOINT = '';

export const DEFAULT_ENQUIRY =
  'Hello KZN Chess Academy, I would like to enquire about chess classes for my child. Please share the available programmes and registration details.';

export function whatsappLink(message: string = DEFAULT_ENQUIRY): string {
  return `https://wa.me/${academy.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function programmeEnquiry(programme: string): string {
  return `Hello KZN Chess Academy, I would like to enquire about ${programme} for my child. Please share the available options, fees, lesson times and registration details.`;
}

// The site has two pages: the single-page home and /donate/.
// Section links from the donate page go back to the home page anchors.
export type Page = 'home' | 'donate';
export const DONATE_PATH = '/donate/';
export function sectionHref(page: Page, id: string): string {
  return page === 'home' ? `#${id}` : `/#${id}`;
}

// Donation settings. Leave a field empty until the academy confirms it:
// empty bank details show a "request banking details" option instead, and an
// empty paymentUrl hides the online payment option. Never publish unconfirmed
// banking details.
export const donation = {
  bank: {
    bankName: '',
    accountName: '',
    accountNumber: '',
    branchCode: '',
    reference: 'DONATION + your surname',
  },
  // A hosted payment page, for example a PayFast, Yoco or SnapScan link.
  paymentUrl: '',
} as const;

export const hasBankDetails = Boolean(donation.bank.accountNumber && donation.bank.bankName);

export const DONATION_ENQUIRY =
  'Hello KZN Chess Academy, I would like to make a donation to support the academy. Please share your banking details and how I can contribute.';

export const donationAreas = [
  'Wherever it’s needed most',
  'Chess in the Community',
  'Infinite Chess',
  'Chess in Schools',
  'Tournaments and chess camps',
];

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'programmes', label: 'Programmes' },
  { id: 'coaches', label: 'Coaches' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
] as const;

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

const img = (name: string, width: number, height: number, alt: string, caption?: string): Photo => ({
  src: `/images/${name}.webp`,
  width,
  height,
  alt,
  caption,
});

// Asset map: original uploaded filename -> optimised web asset in public/images.
export const photos = {
  // IMG-20250720-WA0066.jpg
  heroLearner: img('community-match-young-learner', 1050, 1400,
    'A young learner studies the board during a game against an adult opponent at an outdoor chess event in Durban',
    'Thinking through the next move at a community chess day'),
  // IMG-20170317-WA0005.jpg
  schoolClass: img('school-chess-class', 1032, 581,
    'Primary school learners in uniform stand with their teachers behind a table of chess sets in a classroom',
    'Chess in Schools: learners ready for their lesson'),
  // FB_IMG_1767172929634.jpg
  teamTrophy: img('mzansi-2025-team-trophy', 1400, 921,
    'Young players in matching team kit hold a trophy and medals at the Mzansi Inter-Provincial Chess Tournament in Gqeberha, 2025',
    'Celebrating with the trophy at the Mzansi Inter-Provincial Chess Tournament, Gqeberha 2025'),
  // FB_IMG_1767172907820.jpg
  teamJuniors: img('mzansi-2025-team-juniors', 1400, 817,
    'A group of junior players in team kit wearing medals at the Mzansi Inter-Provincial Chess Tournament, 2025',
    'Junior players at the Mzansi Inter-Provincial Chess Tournament, 2025'),
  // FB_IMG_1767172956998.jpg
  teamSquad: img('mzansi-2025-team-squad', 1400, 775,
    'A squad of players and team officials in matching kit at the Mzansi Inter-Provincial Chess Tournament, 2025',
    'The squad and team officials at the Mzansi Inter-Provincial Chess Tournament, 2025'),
  // IMG-20260210-WA0006.jpg
  playerPortrait: img('mzansi-2025-player-portrait', 935, 1280,
    'A smiling young chess player sits behind a chessboard set up for a game',
    'All smiles before the round begins'),
  // IMG-20251217-WA0040.jpg
  teamOnTour: img('team-on-tour', 1280, 1217,
    'Players in team kit stand on a lawn with their coach in front of a seaside hotel',
    'The team together on tour'),
  // 571803413_10233501320129486_1421659402466917179_n.jpg
  tournamentOutdoor: img('tournament-outdoor-round', 1400, 788,
    'Players compete in a rated round at an outdoor chess tournament, with a chess clock beside the board',
    'Tournament play under the open sky'),
  // IMG-20250(3).jpg
  tournamentEvening: img('tournament-evening-round', 1400, 933,
    'Spectators gather around a board as players compete in an evening chess game with a digital clock',
    'An evening round watched by spectators'),
  // FB_IMG_1755339869250.jpg
  schoolsHuddle: img('schools-team-huddle', 1400, 1172,
    'Learners and educators join hands in a team huddle in a hall set up for a chess event',
    'Team spirit at a schools chess event'),
  // IMG-20250720-WA0068.jpg
  communityDay: img('durban-community-chess-day', 1400, 1050,
    'Children and adults play chess at tables under colourful gazebos at an outdoor community event in Durban',
    'Chess in the Community at an outdoor event in Durban'),
  // IMG-20250723-WA0011.jpg
  communitySession: img('community-chess-session', 720, 1280,
    'Young people play several games of chess on green and white boards at a community session',
    'A community chess session'),
  // IMG-20250806-WA0014.jpg
  communityGames: img('community-chess-games', 720, 1280,
    'Players of different ages play chess at shared tables during a community chess afternoon',
    'Games in progress at a community chess afternoon'),
  // Picture1.jpg
  indoorEvent: img('indoor-chess-event', 506, 675,
    'Learners in school uniform play chess at tables during a busy indoor chess event',
    'Learners at an indoor chess event'),
  // Picture2.jpg
  inclusiveOutreach: img('inclusive-chess-outreach', 585, 484,
    'Educators hold up roll-up chessboards in a special needs classroom decorated with flags and artwork',
    'Inclusive chess outreach with educators'),
  // Picture4.jpg
  prizeGiving: img('international-prize-giving', 620, 414,
    'Children hold certificates and prizes alongside adults at an international chess prize-giving',
    'Prize-giving at an international chess event'),
  // images (4).jpg
  womanInChessAwards: img('woman-in-chess-awards', 496, 403,
    'Guests on stage holding awards at the Year of the Woman in Chess Awards',
    'At the Year of the Woman in Chess Awards'),
} satisfies Record<string, Photo>;

// KZN Chess Academy Logo - Mustard.jpg (trimmed)
export const logo = {
  src: '/images/kzn-chess-academy-logo.webp',
  width: 667,
  height: 461,
  alt: 'KZN Chess Academy logo',
};

export const galleryPhotos: Photo[] = [
  photos.communityDay,
  photos.heroLearner,
  photos.schoolClass,
  photos.teamSquad,
  photos.tournamentOutdoor,
  photos.playerPortrait,
  photos.schoolsHuddle,
  photos.tournamentEvening,
  photos.teamOnTour,
  photos.indoorEvent,
  photos.communitySession,
  photos.inclusiveOutreach,
  photos.teamTrophy,
  photos.teamJuniors,
  photos.communityGames,
  photos.prizeGiving,
  photos.womanInChessAwards,
];

type Coach = {
  name: string;
  title?: string;
  titleAbbr?: string;
  role?: string;
  credentials: string[];
};

export const coaches: Coach[] = [
  {
    name: 'Erick Takawira',
    title: 'National Master',
    titleAbbr: 'NM',
    role: 'Founder & Director',
    credentials: ['FIDE Trainer', 'South African National Coach'],
  },
  {
    name: 'Johannes Mabusela',
    title: 'International Master',
    titleAbbr: 'IM',
    credentials: ['FIDE Trainer', 'South African National Coach'],
  },
  {
    name: 'Rodwell Makoto',
    title: 'International Master',
    titleAbbr: 'IM',
    credentials: ['FIDE Instructor', '2012 South African Open Champion'],
  },
  {
    // Spelling as supplied on the onboarding form ("Minenhle"); confirm before launch.
    name: 'Minenhle Ngcongo',
    title: 'Coach',
    credentials: ['2023 KZN Closed Champion'],
  },
];

export const faqs = [
  {
    q: 'What age can my child start learning chess?',
    a: 'We generally recommend starting from around five years old. However, every child is different. What matters most is that they are interested and able to follow simple instructions.',
  },
  {
    q: 'Does my child need to know how to play chess before joining?',
    a: 'Not at all. Many children start with us knowing little or nothing about chess.',
  },
  {
    q: 'What are the benefits of learning chess?',
    a: 'Chess gives children opportunities to practise thinking ahead, solving problems, concentrating and making decisions. It also teaches patience and how to handle both winning and losing.',
  },
  {
    q: 'Where are your chess lessons held?',
    a: 'We are based in KwaZulu-Natal. Contact us to learn more about available training locations and which classes would be most convenient for your child. Online classes are also available.',
  },
  {
    q: 'How much do chess lessons cost?',
    a: 'Our fees depend on the type of programme your child joins. Get in touch and we will share the available options, fees and lesson times.',
  },
  {
    q: 'How do I register my child?',
    a: 'Simply contact us. We will explain how our classes work, help you find a suitable group for your child and guide you through the registration process.',
  },
];

export const programmeOptions = [
  'Online Chess Classes',
  'Group Chess Classes',
  'Private Chess Coaching',
  'Chess in Schools',
  'Chess in the Community',
  'Infinite Chess',
  'Tournaments and chess camps',
  'Not sure yet',
];
