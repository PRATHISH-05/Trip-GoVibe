const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const defaults = {
  state: 'India',
  bestSeasons: '',
  avoidSeasons: '',
  seasonScore: JSON.stringify({}),
  budgetTier: 'MEDIUM',
  entryFee: 0,
  avgStayCost: 800,
  avgFoodCost: 400,
  adventureScore: 50,
  spiritualScore: 50,
  instagramScore: 50,
  foodieScore: 50,
  natureScore: 50,
  familyScore: 60,
  boysScore: 60,
  coupleScore: 60,
  soloScore: 60,
  isHiddenGem: false,
  isFamous: false,
  tags: '',
  crowdCalendar: JSON.stringify({ weekday: 'medium', weekend: 'high' }),
  openingHours: null,
  closedDays: '',
  bestTimeOfDay: null,
  minHoursNeeded: 2,
  imageUrl: null,
};

const place = (data) => ({ ...defaults, ...data });

const places = [
  // Golden Triangle & North
  place({ name: 'Red Fort', type: 'FORT', district: 'Delhi', state: 'Delhi', lat: 28.6562, lon: 77.2410,
    description: 'UNESCO fort with Mughal architecture and museums.', bestSeasons: 'OCT,NOV,DEC,JAN,FEB,MAR', avoidSeasons: 'MAY,JUN,JUL',
    seasonScore: JSON.stringify({ OCT: 95, NOV: 95, DEC: 90, JAN: 90, FEB: 95, MAR: 90 }), budgetTier: 'MEDIUM', entryFee: 35,
    familyScore: 90, instagramScore: 85, isFamous: true }),
  place({ name: 'India Gate', type: 'HERITAGE_SITE', district: 'Delhi', state: 'Delhi', lat: 28.6129, lon: 77.2295,
    description: 'War memorial with lawns and evening lighting.', bestSeasons: 'OCT,NOV,DEC,JAN,FEB,MAR', avoidSeasons: 'MAY,JUN,JUL',
    budgetTier: 'LOW', instagramScore: 80, familyScore: 85, isFamous: true }),
  place({ name: 'Amber Fort', type: 'FORT', district: 'Jaipur', state: 'Rajasthan', lat: 26.9855, lon: 75.8513,
    description: 'Hilltop fort with palaces, light shows, and views.', bestSeasons: 'OCT,NOV,DEC,JAN,FEB,MAR', avoidSeasons: 'MAY,JUN,JUL',
    budgetTier: 'MEDIUM', entryFee: 100, instagramScore: 95, adventureScore: 60, isFamous: true }),
  place({ name: 'Hawa Mahal', type: 'HERITAGE_SITE', district: 'Jaipur', state: 'Rajasthan', lat: 26.9239, lon: 75.8267,
    description: 'Iconic palace with honeycomb windows, great for photos.', bestSeasons: 'OCT,NOV,DEC,JAN,FEB', avoidSeasons: 'MAY,JUN',
    budgetTier: 'LOW', entryFee: 50, instagramScore: 95, isFamous: true }),
  place({ name: 'Taj Mahal', type: 'HERITAGE_SITE', district: 'Agra', state: 'Uttar Pradesh', lat: 27.1751, lon: 78.0421,
    description: 'Wonder of the world in white marble by the Yamuna.', bestSeasons: 'OCT,NOV,DEC,JAN,FEB', avoidSeasons: 'MAY,JUN',
    budgetTier: 'MEDIUM', entryFee: 250, instagramScore: 100, coupleScore: 95, isFamous: true }),
  place({ name: 'Agra Fort', type: 'FORT', district: 'Agra', state: 'Uttar Pradesh', lat: 27.1795, lon: 78.0211,
    description: 'Red sandstone fort with palaces and river views.', bestSeasons: 'OCT,NOV,DEC,JAN,FEB', avoidSeasons: 'MAY,JUN',
    budgetTier: 'LOW', entryFee: 50, instagramScore: 85, familyScore: 85, isFamous: true }),

  // West & Coastline
  place({ name: 'Gateway of India', type: 'HERITAGE_SITE', district: 'Mumbai', state: 'Maharashtra', lat: 18.9220, lon: 72.8347,
    description: 'Harbor monument facing the Arabian Sea.', bestSeasons: 'NOV,DEC,JAN,FEB', avoidSeasons: 'JUL,AUG',
    budgetTier: 'LOW', instagramScore: 90, isFamous: true }),
  place({ name: 'Marine Drive', type: 'BEACH', district: 'Mumbai', state: 'Maharashtra', lat: 18.9430, lon: 72.8238,
    description: 'Sea-facing promenade known as the Queens Necklace.', bestSeasons: 'NOV,DEC,JAN,FEB', avoidSeasons: 'JUL,AUG',
    budgetTier: 'LOW', instagramScore: 88, coupleScore: 90, isFamous: true }),
  place({ name: 'Baga Beach', type: 'BEACH', district: 'Goa', state: 'Goa', lat: 15.5569, lon: 73.7517,
    description: 'Lively beach with shacks, nightlife, and water sports.', bestSeasons: 'NOV,DEC,JAN,FEB', avoidSeasons: 'JUL,AUG',
    budgetTier: 'MEDIUM', instagramScore: 85, adventureScore: 70, isFamous: true }),
  place({ name: 'Dudhsagar Falls', type: 'WATERFALL', district: 'Goa', state: 'Goa', lat: 15.3140, lon: 74.3140,
    description: 'Spectacular four-tiered waterfall on the Mandovi.', bestSeasons: 'JUL,AUG,SEP,OCT', avoidSeasons: 'APR,MAY',
    budgetTier: 'LOW', adventureScore: 85, natureScore: 95, instagramScore: 90, isFamous: true }),
  place({ name: 'Om Beach', type: 'BEACH', district: 'Gokarna', state: 'Karnataka', lat: 14.5170, lon: 74.3185,
    description: 'Serene beach shaped like Om symbol, calmer than Goa.', bestSeasons: 'NOV,DEC,JAN,FEB', avoidSeasons: 'JUL,AUG',
    budgetTier: 'LOW', isHiddenGem: true, instagramScore: 85, natureScore: 80 }),

  // Karnataka circuits
  place({ name: 'Cubbon Park', type: 'PARK', district: 'Bangalore', state: 'Karnataka', lat: 12.9763, lon: 77.5929,
    description: 'Green lung in the city with museums and walking tracks.', bestSeasons: 'NOV,DEC,JAN,FEB', avoidSeasons: '',
    budgetTier: 'LOW', familyScore: 90, natureScore: 75, isFamous: true }),
  place({ name: 'Abbey Falls', type: 'WATERFALL', district: 'Coorg', state: 'Karnataka', lat: 12.4570, lon: 75.7224,
    description: 'Rain-fed waterfall amidst coffee estates.', bestSeasons: 'JUL,AUG,SEP,OCT', avoidSeasons: 'APR,MAY',
    budgetTier: 'LOW', adventureScore: 75, natureScore: 90, isHiddenGem: true }),
  place({ name: 'Mullayanagiri Peak', type: 'VIEWPOINT', district: 'Chikmagalur', state: 'Karnataka', lat: 13.3829, lon: 75.7413,
    description: 'Highest peak in Karnataka, trekking and sunrise views.', bestSeasons: 'SEP,OCT,NOV,DEC,JAN', avoidSeasons: 'MAY',
    budgetTier: 'LOW', adventureScore: 90, instagramScore: 85, isFamous: true }),

  // Hyderabad & East coast
  place({ name: 'Charminar', type: 'MOSQUE', district: 'Hyderabad', state: 'Telangana', lat: 17.3616, lon: 78.4747,
    description: 'Iconic 16th-century mosque and market hub.', bestSeasons: 'NOV,DEC,JAN,FEB', avoidSeasons: 'MAY,JUN',
    budgetTier: 'LOW', instagramScore: 85, isFamous: true }),
  place({ name: 'Ramoji Film City', type: 'AMUSEMENT_PARK', district: 'Hyderabad', state: 'Telangana', lat: 17.2543, lon: 78.6808,
    description: 'Massive film studio complex with theme attractions.', bestSeasons: 'NOV,DEC,JAN,FEB', avoidSeasons: 'MAY,JUN',
    budgetTier: 'MEDIUM', familyScore: 90, isFamous: true }),
  place({ name: 'RK Beach', type: 'BEACH', district: 'Visakhapatnam', state: 'Andhra Pradesh', lat: 17.7100, lon: 83.3160,
    description: 'Urban beach promenade with Submarine museum nearby.', bestSeasons: 'NOV,DEC,JAN,FEB', avoidSeasons: 'JUL,AUG',
    budgetTier: 'LOW', instagramScore: 80, isFamous: true }),
  place({ name: 'Araku Valley', type: 'HILL_STATION', district: 'Araku', state: 'Andhra Pradesh', lat: 18.3273, lon: 82.8806,
    description: 'Coffee plantations, viewpoints, and tribal culture.', bestSeasons: 'OCT,NOV,DEC,JAN,FEB', avoidSeasons: 'MAY',
    budgetTier: 'LOW', natureScore: 90, coupleScore: 85, isHiddenGem: true }),

  // Kerala
  place({ name: 'Fort Kochi', type: 'HERITAGE_SITE', district: 'Kochi', state: 'Kerala', lat: 9.9650, lon: 76.2421,
    description: 'Colonial streets, Chinese fishing nets, cafes.', bestSeasons: 'NOV,DEC,JAN,FEB', avoidSeasons: 'JUN,JUL',
    budgetTier: 'MEDIUM', instagramScore: 85, foodieScore: 80, isFamous: true }),
  place({ name: 'Munnar Tea Gardens', type: 'GARDEN', district: 'Munnar', state: 'Kerala', lat: 10.0889, lon: 77.0595,
    description: 'Endless tea estates with cool weather and views.', bestSeasons: 'SEP,OCT,NOV,DEC,JAN', avoidSeasons: 'MAY',
    budgetTier: 'MEDIUM', natureScore: 95, coupleScore: 95, isFamous: true }),
  place({ name: 'Alleppey Backwaters', type: 'LAKE', district: 'Alleppey', state: 'Kerala', lat: 9.4981, lon: 76.3388,
    description: 'Houseboat cruises through palm-lined canals.', bestSeasons: 'NOV,DEC,JAN,FEB', avoidSeasons: 'JUN,JUL',
    budgetTier: 'HIGH', coupleScore: 95, natureScore: 90, instagramScore: 90, isFamous: true }),

  // Mountains & East
  place({ name: 'Solang Valley', type: 'ADVENTURE_SPORT', district: 'Manali', state: 'Himachal Pradesh', lat: 32.3182, lon: 77.1577,
    description: 'Adventure hub for skiing, paragliding, and snow.', bestSeasons: 'DEC,JAN,FEB,MAR', avoidSeasons: 'JUL,AUG',
    budgetTier: 'MEDIUM', adventureScore: 95, isFamous: true }),
  place({ name: 'Pangong Lake View', type: 'LAKE', district: 'Leh', state: 'Ladakh', lat: 33.7542, lon: 78.7558,
    description: 'High-altitude blue lake with dramatic mountains.', bestSeasons: 'MAY,JUN,JUL,AUG,SEP', avoidSeasons: 'DEC,JAN',
    budgetTier: 'HIGH', adventureScore: 90, instagramScore: 95, isFamous: true }),
  place({ name: 'Laxman Jhula', type: 'HERITAGE_SITE', district: 'Rishikesh', state: 'Uttarakhand', lat: 30.1241, lon: 78.3296,
    description: 'Suspension bridge over the Ganga, yoga town vibes.', bestSeasons: 'OCT,NOV,DEC,JAN,FEB,MAR', avoidSeasons: 'JUL,AUG',
    budgetTier: 'LOW', spiritualScore: 90, isFamous: true }),
  place({ name: 'Tiger Hill', type: 'VIEWPOINT', district: 'Darjeeling', state: 'West Bengal', lat: 26.9866, lon: 88.2783,
    description: 'Sunrise point with Kanchenjunga views.', bestSeasons: 'OCT,NOV,DEC,JAN', avoidSeasons: 'JUL,AUG',
    budgetTier: 'LOW', instagramScore: 90, natureScore: 90, isFamous: true }),
  place({ name: 'Victoria Memorial', type: 'HERITAGE_SITE', district: 'Kolkata', state: 'West Bengal', lat: 22.5448, lon: 88.3426,
    description: 'Iconic marble building with museum and gardens.', bestSeasons: 'NOV,DEC,JAN,FEB', avoidSeasons: 'MAY,JUN',
    budgetTier: 'LOW', instagramScore: 85, familyScore: 85, isFamous: true }),

  // Heritage North / East
  place({ name: 'Golden Temple', type: 'TEMPLE', district: 'Amritsar', state: 'Punjab', lat: 31.6200, lon: 74.8765,
    description: 'Holiest Sikh shrine with serene sarovar.', bestSeasons: 'NOV,DEC,JAN,FEB,MAR', avoidSeasons: 'MAY,JUN',
    budgetTier: 'LOW', spiritualScore: 100, familyScore: 95, isFamous: true }),
  place({ name: 'Dashashwamedh Ghat', type: 'HERITAGE_SITE', district: 'Varanasi', state: 'Uttar Pradesh', lat: 25.3060, lon: 83.0106,
    description: 'Main ghat with evening Ganga aarti and boat rides.', bestSeasons: 'NOV,DEC,JAN,FEB', avoidSeasons: 'MAY,JUN',
    budgetTier: 'LOW', spiritualScore: 95, instagramScore: 85, isFamous: true }),
  place({ name: 'City Palace Udaipur', type: 'HERITAGE_SITE', district: 'Udaipur', state: 'Rajasthan', lat: 24.5760, lon: 73.6837,
    description: 'Lake-facing palace complex with museums.', bestSeasons: 'NOV,DEC,JAN,FEB', avoidSeasons: 'MAY,JUN',
    budgetTier: 'MEDIUM', coupleScore: 90, instagramScore: 90, isFamous: true }),
];

const routes = [
  // Golden Triangle
  { from: 'Delhi', to: 'Jaipur', distance: 280, duration: 300, modes: 'car,bus', cost: 800 },
  { from: 'Delhi', to: 'Agra', distance: 220, duration: 210, modes: 'car,bus,train', cost: 700 },
  { from: 'Jaipur', to: 'Agra', distance: 240, duration: 240, modes: 'car,bus', cost: 700 },

  // Mumbai-Goa-Gokarna
  { from: 'Mumbai', to: 'Baga Beach', distance: 590, duration: 600, modes: 'train,bus,car', cost: 1200 },
  { from: 'Baga Beach', to: 'Om Beach', distance: 150, duration: 210, modes: 'car,bus', cost: 600 },
  { from: 'Baga Beach', to: 'Dudhsagar Falls', distance: 90, duration: 120, modes: 'car,bus', cost: 400 },

  // Karnataka loop
  { from: 'Bangalore', to: 'Abbey Falls', distance: 265, duration: 360, modes: 'car,bus', cost: 900 },
  { from: 'Abbey Falls', to: 'Mullayanagiri Peak', distance: 120, duration: 180, modes: 'car', cost: 700 },
  { from: 'Bangalore', to: 'Hyderabad', distance: 570, duration: 540, modes: 'car,bus,train', cost: 1100 },

  // Hyderabad coast
  { from: 'Hyderabad', to: 'RK Beach', distance: 620, duration: 660, modes: 'train,bus', cost: 1000 },
  { from: 'RK Beach', to: 'Araku Valley', distance: 115, duration: 180, modes: 'car,bus', cost: 500 },

  // Kerala triangle
  { from: 'Fort Kochi', to: 'Munnar Tea Gardens', distance: 130, duration: 210, modes: 'car,bus', cost: 800 },
  { from: 'Munnar Tea Gardens', to: 'Alleppey Backwaters', distance: 170, duration: 240, modes: 'car,bus', cost: 900 },

  // North mountains
  { from: 'Delhi', to: 'Golden Temple', distance: 450, duration: 420, modes: 'train,bus,car', cost: 1000 },
  { from: 'Delhi', to: 'Laxman Jhula', distance: 240, duration: 300, modes: 'car,bus', cost: 700 },
  { from: 'Laxman Jhula', to: 'Solang Valley', distance: 540, duration: 660, modes: 'car,bus', cost: 1500 },
  { from: 'Solang Valley', to: 'Pangong Lake View', distance: 480, duration: 840, modes: 'car', cost: 3000 },

  // East
  { from: 'Varanasi', to: 'Victoria Memorial', distance: 690, duration: 780, modes: 'train,bus', cost: 1400 },
  { from: 'Varanasi', to: 'Delhi', distance: 820, duration: 900, modes: 'train,bus,car', cost: 1500 },

  // Rajasthan/West links
  { from: 'Jaipur', to: 'City Palace Udaipur', distance: 395, duration: 420, modes: 'car,bus', cost: 1000 },
  { from: 'City Palace Udaipur', to: 'Gateway of India', distance: 760, duration: 720, modes: 'train,flight', cost: 2000 },
];

async function main() {
  console.log('🌱 Starting database seed...');

  await prisma.route.deleteMany({});
  await prisma.place.deleteMany({});
  await prisma.itineraryDay.deleteMany({});
  await prisma.itinerary.deleteMany({});

  console.log('📍 Inserting places...');
  const createdPlaces = {};
  for (const p of places) {
    const created = await prisma.place.create({ data: p });
    createdPlaces[p.name] = created.id;
    console.log(`✓ Created ${p.name}`);
  }

  console.log('🛤️  Inserting routes...');
  const districtAnchor = {};
  for (const p of places) {
    if (!districtAnchor[p.district]) {
      districtAnchor[p.district] = p.name;
    }
  }

  for (const route of routes) {
    const fromName = createdPlaces[route.from]
      ? route.from
      : districtAnchor[route.from] || route.from;
    const toName = createdPlaces[route.to]
      ? route.to
      : districtAnchor[route.to] || route.to;

    const fromPlaceId = createdPlaces[fromName] || Object.values(createdPlaces)[0];
    const toPlaceId = createdPlaces[toName];
    if (!fromPlaceId || !toPlaceId) {
      console.log(`⚠️  Skipped route: ${route.from} → ${route.to}`);
      continue;
    }
    await prisma.route.create({
      data: {
        fromPlaceId,
        toPlaceId,
        distanceKm: route.distance,
        durationMinutes: route.duration,
        transportModes: route.modes,
        estimatedCost: route.cost,
      },
    });
    console.log(`✓ Created route: ${route.from} → ${route.to}`);
  }

  console.log('✅ Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
