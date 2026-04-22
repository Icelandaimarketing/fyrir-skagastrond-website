export const CANDIDATE_IMAGE_FALLBACKS = {
  vigdis: '/Vigdís 1st/1.jpg',
  ragnar: '/Ragnar 2nd/22.jpg',
  astros: '/Ástrós 3rd/25.jpg',
  johann: '/Jóhann 4th/5.jpg',
  halla: '/Halla 5th/19.jpg',
  patrik: '/Patrik 6th/10.jpg',
  'eva-dis': '/Eva Dís 7th/14.jpg',
  andri: '/Andri 8th/Andri.jpeg',
  daniela: '/Daniela 9th/18.jpg',
  agust: '/Ágúst 10th/7.jpg',
};

export const CANDIDATE_IMAGE_OBJECT_POSITIONS = {
  andri: '62% center',
};

export function getCandidateFallbackImage(slug) {
  return CANDIDATE_IMAGE_FALLBACKS[slug] || '/F Skagastrond.jpg';
}

export function getCandidateImageObjectPosition(slug) {
  return CANDIDATE_IMAGE_OBJECT_POSITIONS[slug] || 'center';
}
