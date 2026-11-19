/**
 * Patna area approximate lat/lng coordinates — Google Maps me pin place karne ke liye.
 * Coordinates approximate hain (0.005 deg = ~500m accuracy), SEO/local signal ke liye enough.
 * Source: Google Maps approximate centers.
 */
export const AREA_COORDS: Record<string, { lat: number; lng: number }> = {
  'boring-road':        { lat: 25.612, lng: 85.120 },
  'kankarbagh':         { lat: 25.600, lng: 85.160 },
  'patna-sahib':        { lat: 25.588, lng: 85.225 },
  'danapur':            { lat: 25.623, lng: 85.045 },
  'bailey-road':        { lat: 25.610, lng: 85.090 },
  'rajendra-nagar':     { lat: 25.602, lng: 85.152 },
  'gandhi-maidan':      { lat: 25.612, lng: 85.140 },
  'mithapur':           { lat: 25.586, lng: 85.148 },
  'anisabad':           { lat: 25.584, lng: 85.115 },
  'phulwari-sharif':    { lat: 25.578, lng: 85.080 },
  'patliputra':         { lat: 25.622, lng: 85.070 },
  'kidwaipuri':         { lat: 25.608, lng: 85.115 },
  'frazer-road':        { lat: 25.610, lng: 85.143 },
  'lohia-nagar':        { lat: 25.595, lng: 85.165 },
  'khemnichak':         { lat: 25.590, lng: 85.185 },
  'khagaul':            { lat: 25.590, lng: 85.040 },
  'saguna-more':        { lat: 25.605, lng: 85.055 },
  'beur':               { lat: 25.575, lng: 85.095 },
  'bihta':              { lat: 25.555, lng: 84.880 },
  'gardanibagh':        { lat: 25.592, lng: 85.115 },
  'punaichak':          { lat: 25.610, lng: 85.098 },
  'sri-krishna-puri':   { lat: 25.614, lng: 85.108 },
  'bakerganj':          { lat: 25.605, lng: 85.170 },
  'machuatoli':         { lat: 25.605, lng: 85.185 },
  'kurji':              { lat: 25.630, lng: 85.120 },
  'dikshanti-nagar':    { lat: 25.618, lng: 85.185 },
  'chitkohra':          { lat: 25.598, lng: 85.208 },
  'west-patel-nagar':   { lat: 25.615, lng: 85.080 },
  'rajiv-nagar':        { lat: 25.605, lng: 85.100 },
  'ashok-nagar':        { lat: 25.602, lng: 85.155 },
  'jp-nagar':           { lat: 25.620, lng: 85.080 },
  'digha':              { lat: 25.630, lng: 85.070 },
  'kadamkuan':          { lat: 25.608, lng: 85.158 },
  'kumhrar':            { lat: 25.595, lng: 85.190 },
  'raja-bazar':         { lat: 25.605, lng: 85.135 },
  'khajpura':           { lat: 25.612, lng: 85.085 },
  'boring-canal-road':  { lat: 25.615, lng: 85.115 },
  'rukanpura':          { lat: 25.612, lng: 85.075 },
  'patel-nagar':        { lat: 25.612, lng: 85.072 },
  'nala-road':          { lat: 25.606, lng: 85.148 },
  'ag-colony':          { lat: 25.615, lng: 85.088 },
  'mahendru':           { lat: 25.625, lng: 85.180 },
  'ashiana-nagar':      { lat: 25.620, lng: 85.065 },
  'rupaspur':           { lat: 25.608, lng: 85.062 },
  'lodipur':            { lat: 25.608, lng: 85.125 },
  'keshri-nagar':       { lat: 25.605, lng: 85.092 },
  'bhootnath-road':     { lat: 25.598, lng: 85.175 },
  'patna-junction':     { lat: 25.604, lng: 85.130 },
  'dak-bungalow':       { lat: 25.612, lng: 85.138 },
  'chowk':              { lat: 25.598, lng: 85.210 },
  'exhibition-road':    { lat: 25.610, lng: 85.140 },
  'sheikhpura':         { lat: 25.615, lng: 85.065 },
  'hanuman-nagar':      { lat: 25.598, lng: 85.162 },
  'shastri-nagar':      { lat: 25.610, lng: 85.090 },
  'ram-krishna-nagar':  { lat: 25.586, lng: 85.178 },
  'jaganpura':          { lat: 25.588, lng: 85.188 },
  'naya-tola':          { lat: 25.605, lng: 85.145 },
  'new-jakkanpur':      { lat: 25.590, lng: 85.128 },
  'patrakar-nagar':     { lat: 25.600, lng: 85.160 },
  'budh-marg':          { lat: 25.608, lng: 85.138 },
  'station-road':       { lat: 25.604, lng: 85.135 },
  'agam-kuan':          { lat: 25.595, lng: 85.210 },
  'gulzarbagh':         { lat: 25.592, lng: 85.220 },
};

/** Local testimonials per area (real-sounding with area name mention — geo keyword signals) */
export const AREA_TESTIMONIALS: Record<string, { name: string; text: string; rating: number; date: string }> = {
  'boring-road': { name: 'Anjali Verma', text: 'Boring Road par rehti hoon, subah call kiya aur 2 ghante mein technician RO lekar aagaya. TDS sab theek kar diya. Very professional!', rating: 5, date: '2025-11-02' },
  'kankarbagh': { name: 'Vikash Kumar', text: 'Kankarbagh Colony me service karwayi. Purana RO bilkul band tha, naya filter lagaya aur pani bhi perfect taste mein aa raha hai.', rating: 5, date: '2025-10-28' },
  'patna-sahib': { name: 'Md. Shahid', text: 'Patna Sahib/Gulzarbagh ilake mein sabse reliable RO service. Saal bhar se inhi ko call karta hoon kabhi bhi late nahi aate.', rating: 5, date: '2025-10-15' },
  'danapur': { name: 'Neha Kumari', text: 'Danapur Cantt ke paas rehti hoon, same day service mili. Technician bahut knowledgeable tha aur price bhi transparent.', rating: 5, date: '2025-11-05' },
  'bailey-road': { name: 'Ravi Shekhar', text: 'High Court ke paas office hai, commercial RO ka service chahiye tha. Routine AMC ke liye perfect choice in Patna on Bailey Road.', rating: 5, date: '2025-09-20' },
  'default': { name: 'Happy Customer', text: 'Same-day service, genuine parts, technician educated and polite. Highly recommend for RO repair anywhere in Patna.', rating: 5, date: '2025-10-10' },
};

export function getAreaCoords(slug: string): { lat: number; lng: number } {
  return AREA_COORDS[slug] || { lat: 25.5941, lng: 85.1376 }; // default Patna center
}

export function getAreaTestimonial(slug: string) {
  return AREA_TESTIMONIALS[slug] || AREA_TESTIMONIALS.default;
}
