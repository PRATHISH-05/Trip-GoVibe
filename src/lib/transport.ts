// Transport calculation utilities for inter-city travel

export interface TransportOption {
  type: 'FLIGHT' | 'TRAIN' | 'BUS' | 'DRIVE';
  costPerPerson: number;
  durationHours: number;
  comfort: 'BASIC' | 'STANDARD' | 'PREMIUM';
  description: string;
}

export interface TransportRecommendation {
  from: string;
  to: string;
  distance: number;
  recommended: TransportOption;
  alternatives: TransportOption[];
  totalCost: number;
}

// Major Indian cities and their coordinates
const majorCities: Record<string, { lat: number; lng: number; state: string }> =
  {
    delhi: { lat: 28.7041, lng: 77.1025, state: 'delhi' },
    mumbai: { lat: 19.076, lng: 72.8776, state: 'maharashtra' },
    bangalore: { lat: 12.9716, lng: 77.5946, state: 'karnataka' },
    hyderabad: { lat: 17.3645, lng: 78.4711, state: 'telangana' },
    chennai: { lat: 13.0827, lng: 80.2707, state: 'tamilnadu' },
    kolkata: { lat: 22.5726, lng: 88.3639, state: 'westbengal' },
    pune: { lat: 18.5204, lng: 73.8567, state: 'maharashtra' },
    jaipur: { lat: 26.9124, lng: 75.7873, state: 'rajasthan' },
    lucknow: { lat: 26.8467, lng: 80.946, state: 'uttarpradesh' },
    chandigarh: { lat: 30.7333, lng: 76.7794, state: 'chandigarh' },
    ahmedabad: { lat: 23.0225, lng: 72.5714, state: 'gujarat' },
    surat: { lat: 21.1702, lng: 72.8311, state: 'gujarat' },
    indore: { lat: 22.7196, lng: 75.8577, state: 'madhya pradesh' },
    kochi: { lat: 9.9312, lng: 76.2673, state: 'kerala' },
    goa: { lat: 15.8497, lng: 73.8278, state: 'goa' },
    amritsar: { lat: 31.634, lng: 74.8722, state: 'punjab' },
  };

// Calculate haversine distance between two coordinates
function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

// Get transport options based on distance
export function getTransportOptions(
  distance: number,
  numPeople: number
): TransportOption[] {
  const options: TransportOption[] = [];

  if (distance <= 100) {
    // Local travel - primarily bus/car
    options.push({
      type: 'BUS',
      costPerPerson: 300,
      durationHours: distance / 40,
      comfort: 'BASIC',
      description: 'AC Bus - Budget friendly',
    });
    options.push({
      type: 'DRIVE',
      costPerPerson: 500,
      durationHours: distance / 60,
      comfort: 'STANDARD',
      description: 'Rental Car',
    });
  } else if (distance <= 500) {
    // Medium distance - bus or train
    options.push({
      type: 'TRAIN',
      costPerPerson: 800,
      durationHours: distance / 50,
      comfort: 'STANDARD',
      description: 'Train 2AC/3AC',
    });
    options.push({
      type: 'BUS',
      costPerPerson: 600,
      durationHours: distance / 50,
      comfort: 'STANDARD',
      description: 'Volvo Bus',
    });
    options.push({
      type: 'FLIGHT',
      costPerPerson: 3000,
      durationHours: 2,
      comfort: 'PREMIUM',
      description: 'Flight',
    });
  } else if (distance <= 1000) {
    // Long distance - flight or train
    options.push({
      type: 'FLIGHT',
      costPerPerson: 4000,
      durationHours: 2.5,
      comfort: 'PREMIUM',
      description: 'Economy Flight',
    });
    options.push({
      type: 'TRAIN',
      costPerPerson: 1500,
      durationHours: distance / 60,
      comfort: 'STANDARD',
      description: 'Train 1AC/2AC',
    });
  } else {
    // Very long distance - primarily flight
    options.push({
      type: 'FLIGHT',
      costPerPerson: 5000,
      durationHours: 3,
      comfort: 'PREMIUM',
      description: 'Flight',
    });
    options.push({
      type: 'TRAIN',
      costPerPerson: 2000,
      durationHours: 24,
      comfort: 'STANDARD',
      description: 'Train - Long journey',
    });
  }

  return options;
}

// Calculate transport recommendation
export function calculateTransportCost(
  from: string,
  to: string,
  numPeople: number
): TransportRecommendation {
  const fromCity = from.toLowerCase();
  const toCity = to.toLowerCase();

  const fromCoords = majorCities[fromCity] || majorCities['bangalore'];
  const toCoords = majorCities[toCity] || majorCities['mumbai'];

  const distance = haversineDistance(
    fromCoords.lat,
    fromCoords.lng,
    toCoords.lat,
    toCoords.lng
  );

  const options = getTransportOptions(distance, numPeople);
  const recommended = options[0]; // Best value-for-money option

  return {
    from: from,
    to: to,
    distance: Math.round(distance),
    recommended: {
      ...recommended,
      costPerPerson: recommended.costPerPerson,
    },
    alternatives: options.slice(1),
    totalCost: Math.round(recommended.costPerPerson * numPeople),
  };
}

// Get transport type based on distance and preferences
export function recommendTransportType(
  distance: number,
  budget: number,
  comfort: 'BUDGET' | 'STANDARD' | 'PREMIUM' = 'STANDARD',
  numPeople: number = 1
): string {
  if (distance <= 100) {
    return 'BUS/CAR';
  } else if (distance <= 500) {
    if (comfort === 'BUDGET') return 'BUS';
    if (comfort === 'PREMIUM') return 'FLIGHT';
    return 'TRAIN';
  } else if (distance <= 1000) {
    if (comfort === 'BUDGET') return 'TRAIN';
    return 'FLIGHT';
  } else {
    return 'FLIGHT';
  }
}
