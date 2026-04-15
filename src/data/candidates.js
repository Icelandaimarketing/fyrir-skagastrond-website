// Candidate data — images served from Supabase Storage (candidate-photos bucket)
const STORAGE = 'https://yestlkukcdjlrtvxugkg.supabase.co/storage/v1/object/public/candidate-photos';

export const candidates = [
  {
    nr: 1,
    name: 'Vigdís Elva Þorgeirsdóttir',
    roleKey: 'candidate.1.role',
    bioKey: 'candidate.1.bio',
    image: `${STORAGE}/vigdis.jpg`,
    slug: 'vigdis',
  },
  {
    nr: 2,
    name: 'Ragnar Rögnvaldsson',
    roleKey: 'candidate.2.role',
    bioKey: 'candidate.2.bio',
    image: `${STORAGE}/ragnar.jpg`,
    slug: 'ragnar',
  },
  {
    nr: 3,
    name: 'Ástrós Elísdóttir',
    roleKey: 'candidate.3.role',
    bioKey: 'candidate.3.bio',
    image: `${STORAGE}/astros.jpg`,
    slug: 'astros',
  },
  {
    nr: 4,
    name: 'Jóhann Guðbjartur Sigurjónsson',
    roleKey: 'candidate.4.role',
    bioKey: 'candidate.4.bio',
    image: `${STORAGE}/johann.jpg`,
    slug: 'johann',
  },
  {
    nr: 5,
    name: 'Halla María Þórðardóttir',
    roleKey: 'candidate.5.role',
    bioKey: 'candidate.5.bio',
    image: `${STORAGE}/halla.jpg`,
    slug: 'halla',
  },
  {
    nr: 6,
    name: 'Patrik Snær Bjarnason',
    roleKey: 'candidate.6.role',
    bioKey: 'candidate.6.bio',
    image: `${STORAGE}/patrik.jpg`,
    slug: 'patrik',
  },
  {
    nr: 7,
    name: 'Eva Dís Gunnarsdóttir',
    roleKey: 'candidate.7.role',
    bioKey: 'candidate.7.bio',
    image: `${STORAGE}/eva-dis.jpg`,
    slug: 'eva-dis',
  },
  {
    nr: 8,
    name: 'Andri Már Welding Hákonarson',
    roleKey: 'candidate.8.role',
    bioKey: 'candidate.8.bio',
    image: `${STORAGE}/andri.jpg`,
    slug: 'andri',
  },
  {
    nr: 9,
    name: 'Daniela Esmeralda Ortega',
    roleKey: 'candidate.9.role',
    bioKey: 'candidate.9.bio',
    image: `${STORAGE}/daniela.jpg`,
    slug: 'daniela',
  },
  {
    nr: 10,
    name: 'Ágúst Óðinn Ómarsson',
    roleKey: 'candidate.10.role',
    bioKey: 'candidate.10.bio',
    image: `${STORAGE}/agust.jpg`,
    slug: 'agust',
  },
];

export function getCandidateBySlug(slug) {
  return candidates.find(c => c.slug === slug) || null;
}
