// Candidate data with multilingual roles and bios
export const candidates = [
  {
    nr: 1,
    name: 'Vigdís Elva Þorgeirsdóttir',
    roleKey: 'candidate.1.role',
    bioKey: 'candidate.1.bio',
    image: '/Vigdís.jpg',
    slug: 'vigdis',
  },
  {
    nr: 2,
    name: 'Ragnar Rögnvaldsson',
    roleKey: 'candidate.2.role',
    bioKey: 'candidate.2.bio',
    image: '/Ragnar.jpg',
    slug: 'ragnar',
  },
  {
    nr: 3,
    name: 'Ástrós Elísdóttir',
    roleKey: 'candidate.3.role',
    bioKey: 'candidate.3.bio',
    image: '/Ástrós.jpg',
    slug: 'astros',
  },
  {
    nr: 4,
    name: 'Jóhann Guðbjartur Sigurjónsson',
    roleKey: 'candidate.4.role',
    bioKey: 'candidate.4.bio',
    image: '/Jóhann.jpg',
    slug: 'johann',
  },
  {
    nr: 5,
    name: 'Halla María Þórðardóttir',
    roleKey: 'candidate.5.role',
    bioKey: 'candidate.5.bio',
    image: '/Halla.jpg',
    slug: 'halla',
  },
  {
    nr: 6,
    name: 'Patrik Snær Bjarnason',
    roleKey: 'candidate.6.role',
    bioKey: 'candidate.6.bio',
    image: '/Patrik.jpg',
    slug: 'patrik',
  },
  {
    nr: 7,
    name: 'Eva Dís Gunnarsdóttir',
    roleKey: 'candidate.7.role',
    bioKey: 'candidate.7.bio',
    image: '/Eva Dís.jpg',
    slug: 'eva-dis',
  },
  {
    nr: 8,
    name: 'Andri Már Welding',
    roleKey: 'candidate.8.role',
    bioKey: 'candidate.8.bio',
    image: '/Andri.jpg',
    slug: 'andri',
  },
  {
    nr: 9,
    name: 'Daniela Esmeralda Ortega',
    roleKey: 'candidate.9.role',
    bioKey: 'candidate.9.bio',
    image: '/Daniela.jpg',
    slug: 'daniela',
  },
  {
    nr: 10,
    name: 'Ágúst Óðinn Ómarsson',
    roleKey: 'candidate.10.role',
    bioKey: 'candidate.10.bio',
    image: '/Ágúst.jpg',
    slug: 'agust',
  },
];

export function getCandidateBySlug(slug) {
  return candidates.find(c => c.slug === slug) || null;
}
