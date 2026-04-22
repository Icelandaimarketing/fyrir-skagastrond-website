// Candidate data — images served from Supabase Storage (candidate-photos bucket)
import { getCandidateFallbackImage } from './candidateImageFallbacks.js';

// Static fallback candidate data. Supabase Storage is the production source of truth.

export const candidates = [
  {
    nr: 1,
    name: 'Vigdís Elva Þorgeirsdóttir',
    roleKey: 'candidate.1.role',
    bioKey: 'candidate.1.bio',
    image: getCandidateFallbackImage('vigdis'),
    slug: 'vigdis',
  },
  {
    nr: 2,
    name: 'Ragnar Rögnvaldsson',
    roleKey: 'candidate.2.role',
    bioKey: 'candidate.2.bio',
    image: getCandidateFallbackImage('ragnar'),
    slug: 'ragnar',
  },
  {
    nr: 3,
    name: 'Ástrós Elísdóttir',
    roleKey: 'candidate.3.role',
    bioKey: 'candidate.3.bio',
    image: getCandidateFallbackImage('astros'),
    slug: 'astros',
  },
  {
    nr: 4,
    name: 'Jóhann Guðbjartur Sigurjónsson',
    roleKey: 'candidate.4.role',
    bioKey: 'candidate.4.bio',
    image: getCandidateFallbackImage('johann'),
    slug: 'johann',
  },
  {
    nr: 5,
    name: 'Halla María Þórðardóttir',
    roleKey: 'candidate.5.role',
    bioKey: 'candidate.5.bio',
    image: getCandidateFallbackImage('halla'),
    slug: 'halla',
  },
  {
    nr: 6,
    name: 'Patrik Snær Bjarnason',
    roleKey: 'candidate.6.role',
    bioKey: 'candidate.6.bio',
    image: getCandidateFallbackImage('patrik'),
    slug: 'patrik',
  },
  {
    nr: 7,
    name: 'Eva Dís Gunnarsdóttir',
    roleKey: 'candidate.7.role',
    bioKey: 'candidate.7.bio',
    image: getCandidateFallbackImage('eva-dis'),
    slug: 'eva-dis',
  },
  {
    nr: 8,
    name: 'Andri Már Welding Hákonarson',
    roleKey: 'candidate.8.role',
    bioKey: 'candidate.8.bio',
    image: getCandidateFallbackImage('andri'),
    slug: 'andri',
  },
  {
    nr: 9,
    name: 'Daniela Esmeralda Ortega',
    roleKey: 'candidate.9.role',
    bioKey: 'candidate.9.bio',
    image: getCandidateFallbackImage('daniela'),
    slug: 'daniela',
  },
  {
    nr: 10,
    name: 'Ágúst Óðinn Ómarsson',
    roleKey: 'candidate.10.role',
    bioKey: 'candidate.10.bio',
    image: getCandidateFallbackImage('agust'),
    slug: 'agust',
  },
];

export function getCandidateBySlug(slug) {
  return candidates.find(c => c.slug === slug) || null;
}
