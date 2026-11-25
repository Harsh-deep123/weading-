export type ScreenId = 'invitation' | 'story' | 'ceremonies' | 'hospitality' | 'rsvp';

export interface CeremonyItem {
  id: string;
  dayKey: 'day1' | 'day2' | 'day3';
  dayLabel: string;
  dateText: string;
  timeText: string;
  title: string;
  subtitle: string;
  venue: string;
  attire: string;
  image: string;
  imageAlt: string;
  description: string;
  rituals: string[];
  culinary: string;
  music: string;
}

export interface StoryChapter {
  id: string;
  numeral: string;
  year: string;
  location: string;
  title: string;
  excerpt: string;
  pullQuote: string;
}

export interface AttireGuide {
  id: string;
  ceremony: string;
  paletteName: string;
  swatches: { name: string; hex: string }[];
  forHer: string;
  forHim: string;
  note: string;
}

export interface BlessingEntry {
  id: string;
  guestName: string;
  city: string;
  message: string;
  date: string;
}

export const WEDDING_IMAGES = {
  palaceCourtyard: '/src/assets/images/royal_palace_courtyard_1795616144038.jpg',
  coupleJharokha: '/src/assets/images/couple_jharokha_portrait_1795616144143.jpg',
  sangeetPavilion: '/src/assets/images/mehendi_sangeet_pavilion_1795616145579.jpg',
  sacredMandap: '/src/assets/images/sacred_mandap_pheras_1795616145735.jpg',
};

export const CEREMONIES: CeremonyItem[] = [
  {
    id: 'mehendi',
    dayKey: 'day1',
    dayLabel: 'Day I',
    dateText: 'Friday, December 11, 2026',
    timeText: '11:30 AM – 3:30 PM',
    title: 'Mehendi & Courtyard High Tea',
    subtitle: 'Saffron sunbeams, henna artistry, and folk sarangi',
    venue: 'Zenana Mahal Terrace, City Palace',
    attire: 'Pastel Lehengas · Ivory & Sage Kurtas',
    image: WEDDING_IMAGES.sangeetPavilion,
    imageAlt: 'Rajasthani palace courtyard with rose garlands and brass lotus bowls for Mehendi',
    description:
      'Gather beneath sunlit sandstone arches overlooking the Aravalli hills for an afternoon of artisanal Rajasthani henna, rosewater sherbets, and acoustic folk melodies.',
    rituals: [
      'Traditional Sojat henna artists and floral haathphool bar',
      'Lac bangle crafting station by Jaipur artisans',
      'Manganiyar folk ensemble performing courtyard ragas',
    ],
    culinary: 'Kesar Badam Thandai, Mirchi Vada, Rose Petal Ghevar, and Darjeeling First Flush',
    music: 'Live Sarangi, Algoza, and Courtyard Folk Percussion',
  },
  {
    id: 'sangeet',
    dayKey: 'day1',
    dayLabel: 'Day I',
    dateText: 'Friday, December 11, 2026',
    timeText: '7:30 PM Onwards',
    title: 'Sangeet & Royal Durbar',
    subtitle: 'Candlelit lanterns, family choreography, and starlight revelry',
    venue: 'Jagmandir Island Pavilion, Lake Pichola',
    attire: 'Jewel-Toned Velvet · Heritage Bandhgala',
    image: WEDDING_IMAGES.palaceCourtyard,
    imageAlt: 'Candlelit Udaipur palace courtyard illuminated with brass diyas for evening Sangeet',
    description:
      'Private royal barges ferry guests across Lake Pichola to an illuminated island courtyard where hundreds of brass diyas set the stage for music, dance, and toast-making.',
    rituals: [
      'Royal barge arrival from Bansi Ghat Jetty at 7:00 PM',
      'Family Sangeet performances under the Mor Chowk canopy',
      'Midnight Sufi qawwali session by the water pavilion',
    ],
    culinary: 'Mewari Royal Thali, Saffron Smoked Kebabs, and Charcoal-Roasted Dal Baati',
    music: 'Classical Kathak Ensemble followed by Sufi Qawwali & Midnight Orchestra',
  },
  {
    id: 'baraat-varmala',
    dayKey: 'day2',
    dayLabel: 'Day II',
    dateText: 'Saturday, December 12, 2026',
    timeText: '4:30 PM – 7:00 PM',
    title: 'Baraat Procession & Varmala',
    subtitle: 'Royal safas, shehnai fanfare, and lotus garland exchange',
    venue: 'Tripolia Gate to Mor Chowk Courtyard',
    attire: 'Heritage Silk Sherwanis · Royal Safas & Sarees',
    image: WEDDING_IMAGES.coupleJharokha,
    imageAlt: 'Bride and groom standing beneath a sandstone jharokha arch overlooking Lake Pichola',
    description:
      'The Baraat winds through historic sandstone gates accompanied by traditional brass band fanfare and marigold showers, culminating at dusk as Aman and Priya exchange floral varmalas.',
    rituals: [
      'Safa tying ceremony for guests at 3:45 PM in the Darikhana Courtyard',
      'Grand Baraat procession led by Marwari horses and nagada drums',
      'Dusk Varmala exchange beneath floating rose canopies',
    ],
    culinary: 'Cardamom Masala Chai, Pistachio Kulfi, and Royal Chaat Promenade',
    music: 'Shehnai Chautal, Brass Fanfare, and Classical Tabla',
  },
  {
    id: 'pheras-reception',
    dayKey: 'day3',
    dayLabel: 'Day III',
    dateText: 'Dec 12 (8:00 PM) & Dec 13 (7:30 PM)',
    timeText: 'Sacred Pheras & Grand Farewell Banquet',
    title: 'Sacred Pheras & Royal Reception',
    subtitle: 'Seven sacred vows by the fire and a gilded farewell dinner',
    venue: 'Sheesh Mahal Mandap & Durbar Hall',
    attire: 'Deep Maroon Zardozi · Gold & Ivory Couture',
    image: WEDDING_IMAGES.sacredMandap,
    imageAlt: 'Four-pillar floral wedding mandap inside an ornate sandstone durbar hall',
    description:
      'Beneath four carved sandstone pillars wrapped in crimson and blush roses, Aman and Priya circle the sacred Agni, followed the next evening by a candlelit Royal Reception.',
    rituals: [
      'Vedic chanting and Hastamelap beneath the Sheesh Mahal Mandap',
      'Saptapadi (Seven Sacred Vows) around the sandalwood fire',
      'Sunday Evening Sit-Down Royal Reception & String Quartet',
    ],
    culinary: 'Seven-Course Mewari Degustation Menu with Heritage Sweets & Champagne Toast',
    music: 'Vedic Chants, Flute Recital, and Chamber String Quartet',
  },
];

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: 'jaipur',
    numeral: '01',
    year: 'Autumn 2022',
    location: 'Rambagh Gardens, Jaipur',
    title: 'An Unplanned Conversation Over Saffron Tea',
    excerpt:
      'Both invited to an architectural conservation symposium in Jaipur, Aman was sketching the symmetry of a sandstone chhatri while Priya debated acoustic restoration in heritage courtyards. What began as a shared table at twilight turned into four hours of conversation after every lantern had been dimmed.',
    pullQuote: '“We came looking at three-hundred-year-old arches, and walked out building our own.”',
  },
  {
    id: 'monsoon',
    numeral: '02',
    year: 'Monsoon 2024',
    location: 'Malabar Hill & Lake Pichola',
    title: 'Two Cities, One Shared Horizon',
    excerpt:
      'Between Priya’s classical music recitals in Mumbai and Aman’s heritage restoration projects across Rajasthan, weekends became miniature journeys—late-night flights, handwritten postcards, and quiet mornings overlooking monsoon rains.',
    pullQuote: '“Distance only sharpened the patience with which we kept choosing each other.”',
  },
  {
    id: 'proposal',
    numeral: '03',
    year: 'Winter 2025',
    location: 'Badi Lake Pavilion, Udaipur',
    title: 'The Promise Under the Winter Stars',
    excerpt:
      'With only two brass diyas, a custom-engraved family heirloom ring, and the Aravalli hills mirrored on still water, Aman asked Priya to spend every season ahead together. The families of Rathore and Singhania gathered the following morning to bless the union.',
    pullQuote: '“Under a quiet Udaipur sky, two families became one courtyard.”',
  },
];

export const ATTIRE_GUIDES: AttireGuide[] = [
  {
    id: 'mehendi-attire',
    ceremony: 'Mehendi & Courtyard High Tea',
    paletteName: 'Rose Quartz, Mint & Champagne Ivory',
    swatches: [
      { name: 'Rose Petal', hex: '#E8A598' },
      { name: 'Blush Silk', hex: '#F4C2C2' },
      { name: 'Champagne', hex: '#F3E5AB' },
      { name: 'Ivory Parchment', hex: '#FAF6EE' },
    ],
    forHer: 'Lightweight organza sarees, floral gota-patti lehengas, or flowing anarkalis in sunlit pastels.',
    forHim: 'Linen or raw silk kurta-pajama sets with embroidered Nehru jackets in ivory, pistachio, or blush.',
    note: 'Sunlit open courtyard · Comfortable block heels or embroidered juttis recommended.',
  },
  {
    id: 'sangeet-attire',
    ceremony: 'Sangeet & Royal Durbar',
    paletteName: 'Deep Maroon, Antique Gold & Velvet Wine',
    swatches: [
      { name: 'Royal Maroon', hex: '#800020' },
      { name: 'Velvet Burgundy', hex: '#4A0404' },
      { name: 'Royal Gold', hex: '#D4AF37' },
      { name: 'Bronze Zari', hex: '#AA771C' },
    ],
    forHer: 'Jewel-toned Banarasi silk, velvet lehengas, or shimmer-draped cocktail sarees.',
    forHim: 'Tailored Bandhgalas, velvet Jodhpuri jackets, or black-tie heritage sherwanis.',
    note: 'Evening lakeside breeze · Cashmere shawls will be available at the island jetty.',
  },
  {
    id: 'pheras-attire',
    ceremony: 'Baraat, Pheras & Reception',
    paletteName: 'Crimson Heritage, Sandalwood & Gilded Foil',
    swatches: [
      { name: 'Sindoor Maroon', hex: '#570013' },
      { name: 'Gilded Foil', hex: '#D4AF37' },
      { name: 'Sandstone Cream', hex: '#F1EDE6' },
      { name: 'Warm Charcoal', hex: '#2A0808' },
    ],
    forHer: 'Classic zardozi lehengas, Kanjeevaram silk sarees, and heirloom kundan or polki jewelry.',
    forHim: 'Ivory or maroon silk sherwanis paired with ceremonial stoles and traditional Rajputana safas.',
    note: 'Safa tying concierge is stationed outside Mor Chowk from 3:30 PM.',
  },
];

export const INITIAL_BLESSINGS: BlessingEntry[] = [
  {
    id: 'b1',
    guestName: 'Maharani Gayatri & Vikram Rathore',
    city: 'Jaipur',
    message: 'May your courtyard always echo with laughter, sacred harmony, and timeless warmth. Counting the days until Udaipur.',
    date: 'November 18, 2026',
  },
  {
    id: 'b2',
    guestName: 'Meera & Devansh Singhania',
    city: 'Mumbai',
    message: 'From your first afternoon in Jaipur to the sacred fire at Sheesh Mahal—our hearts are brimming with joy for you both.',
    date: 'November 21, 2026',
  },
  {
    id: 'b3',
    guestName: 'Ananya Deshmukh',
    city: 'New Delhi',
    message: 'Cannot wait to celebrate under the winter stars at Jagmandir! Wishing Aman & Priya a lifetime of grace.',
    date: 'November 24, 2026',
  },
];
