import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      originCity,
      budget,
      days,
      startDate,
    } = body;
    
    if (!originCity || !budget || !days) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const itinerary = generateMockItinerary(originCity, days, budget, startDate);
    return NextResponse.json({ success: true, itinerary });
    
  } catch (error) {
    console.error('Itinerary error:', error);
    const itinerary = generateMockItinerary('Your City', 3, 30000, new Date().toISOString());
    return NextResponse.json({ success: true, itinerary });
  }
}

function generateMockItinerary(city: string, days: number, budget: number, startDate: any) {
  const mockPlaces: { [key: string]: any[] } = {
    'coimbatore': [
      { name: 'Isha Yoga Center', type: 'TEMPLE', distance: 30, time: 2, fee: 0, score: 95, lat: 11.0332, lon: 76.7353, desc: 'Adiyogi statue and meditation center in Tamil Nadu foothills' },
      { name: 'Marudhamalai Temple', type: 'TEMPLE', distance: 15, time: 2, fee: 0, score: 88, lat: 11.0499, lon: 76.8439, desc: 'Ancient hilltop temple dedicated to Lord Murugan with scenic views' },
      { name: 'Kovai Kutralam Falls', type: 'WATERFALL', distance: 35, time: 3, fee: 50, score: 85, lat: 10.9835, lon: 76.7834, desc: 'Natural waterfall amidst lush greenery, perfect for nature lovers' },
      { name: 'VOC Park & Zoo', type: 'PARK', distance: 8, time: 2, fee: 30, score: 80, lat: 11.0096, lon: 76.9689, desc: 'Well-maintained park with mini zoo and children play areas' },
    ],
    'chennai': [
      { name: 'Marina Beach', type: 'VIEWPOINT', distance: 0, time: 2, fee: 0, score: 92, lat: 13.0499, lon: 80.2824, desc: 'Second longest urban beach in the world with scenic sunset views' },
      { name: 'Kapaleeshwarar Temple', type: 'TEMPLE', distance: 6, time: 2, fee: 0, score: 90, lat: 13.0339, lon: 80.2694, desc: '7th century Dravidian architecture temple in Mylapore' },
      { name: 'Fort St. George', type: 'VIEWPOINT', distance: 4, time: 2, fee: 100, score: 88, lat: 13.0822, lon: 80.2889, desc: 'First English fortress in India with colonial museum' },
      { name: 'Mahabalipuram', type: 'TEMPLE', distance: 55, time: 4, fee: 250, score: 95, lat: 12.6269, lon: 80.1932, desc: 'UNESCO World Heritage Site with ancient rock-cut temples and Shore Temple' },
    ],
    'delhi': [
      { name: 'India Gate', type: 'VIEWPOINT', distance: 0, time: 1, fee: 0, score: 92, lat: 28.6129, lon: 77.2295, desc: 'War memorial arc dedicated to Indian soldiers, iconic landmark' },
      { name: 'Red Fort', type: 'TEMPLE', distance: 5, time: 2, fee: 300, score: 90, lat: 28.6562, lon: 77.2410, desc: 'UNESCO World Heritage Site, Mughal Emperor residence with stunning architecture' },
      { name: 'Qutub Minar', type: 'VIEWPOINT', distance: 12, time: 2, fee: 250, score: 89, lat: 28.5245, lon: 77.1855, desc: 'Tallest brick minaret in the world, UNESCO heritage monument' },
      { name: 'Lotus Temple', type: 'TEMPLE', distance: 10, time: 2, fee: 0, score: 87, lat: 28.5535, lon: 77.2588, desc: 'Bahai House of Worship with unique lotus-shaped architecture' },
    ],
    'mumbai': [
      { name: 'Gateway of India', type: 'VIEWPOINT', distance: 0, time: 1, fee: 0, score: 94, lat: 18.9220, lon: 72.8347, desc: 'Iconic arch monument overlooking Arabian Sea, colonial architecture' },
      { name: 'Marine Drive', type: 'VIEWPOINT', distance: 3, time: 2, fee: 0, score: 90, lat: 18.9432, lon: 72.8236, desc: 'Queens Necklace promenade with stunning sea views and evening lights' },
      { name: 'Elephanta Caves', type: 'TEMPLE', distance: 10, time: 4, fee: 300, score: 92, lat: 18.9633, lon: 72.9315, desc: 'UNESCO World Heritage rock-cut cave temples on island' },
      { name: 'Juhu Beach', type: 'VIEWPOINT', distance: 18, time: 2, fee: 0, score: 85, lat: 19.0896, lon: 72.8269, desc: 'Popular beach with street food, celebrity spotting, and sunset views' },
    ],
    'bangalore': [
      { name: 'Lalbagh Botanical Garden', type: 'GARDEN', distance: 0, time: 2, fee: 50, score: 90, lat: 12.9507, lon: 77.5848, desc: 'Historic 240-acre garden with glass house and diverse plant species' },
      { name: 'Bangalore Palace', type: 'VIEWPOINT', distance: 5, time: 2, fee: 280, score: 88, lat: 12.9987, lon: 77.5920, desc: 'Tudor-style palace with Victorian architecture and royal artifacts' },
      { name: 'Nandi Hills', type: 'HILL_STATION', distance: 60, time: 4, fee: 50, score: 92, lat: 13.3703, lon: 77.6838, desc: 'Ancient hill fortress with breathtaking sunrise views and Tipus Drop' },
      { name: 'ISKCON Temple', type: 'TEMPLE', distance: 8, time: 2, fee: 0, score: 85, lat: 13.0096, lon: 77.5502, desc: 'Modern Krishna temple with stunning architecture and spiritual ambiance' },
    ],
    'goa': [
      { name: 'Baga Beach', type: 'VIEWPOINT', distance: 0, time: 3, fee: 0, score: 90, lat: 15.5551, lon: 73.7516, desc: 'Popular beach known for water sports, nightlife, and shacks' },
      { name: 'Fort Aguada', type: 'TEMPLE', distance: 8, time: 2, fee: 200, score: 85, lat: 15.4909, lon: 73.7733, desc: '17th century Portuguese fort with lighthouse and sea views' },
      { name: 'Dudhsagar Falls', type: 'WATERFALL', distance: 60, time: 4, fee: 300, score: 88, lat: 15.3144, lon: 74.3144, desc: 'Four-tiered waterfall in Bhagwan Mahavir Wildlife Sanctuary' },
      { name: 'Basilica of Bom Jesus', type: 'TEMPLE', distance: 10, time: 2, fee: 0, score: 92, lat: 15.5008, lon: 73.9114, desc: 'UNESCO World Heritage church holding remains of St. Francis Xavier' },
    ],
    'jaipur': [
      { name: 'Hawa Mahal', type: 'VIEWPOINT', distance: 0, time: 1, fee: 200, score: 93, lat: 26.9239, lon: 75.8267, desc: 'Palace of Winds with 953 windows, iconic pink sandstone architecture' },
      { name: 'Amer Fort', type: 'TEMPLE', distance: 11, time: 3, fee: 500, score: 95, lat: 26.9855, lon: 75.8513, desc: 'Magnificent hilltop fort with mirror palace and elephant rides' },
      { name: 'City Palace', type: 'VIEWPOINT', distance: 1, time: 2, fee: 400, score: 90, lat: 26.9255, lon: 75.8237, desc: 'Royal residence with museums, courtyards, and Rajasthani architecture' },
      { name: 'Jantar Mantar', type: 'VIEWPOINT', distance: 1.5, time: 2, fee: 200, score: 88, lat: 26.9247, lon: 75.8249, desc: 'UNESCO astronomical observatory with worlds largest stone sundial' },
    ],
  };

  const cityLower = city.toLowerCase().trim();
  // Try exact match first, then fuzzy match
  let places = mockPlaces[cityLower];
  
  if (!places) {
    // Fuzzy matching for similar city names
    const matchedKey = Object.keys(mockPlaces).find(key => 
      cityLower.includes(key) || key.includes(cityLower)
    );
    places = matchedKey ? mockPlaces[matchedKey] : mockPlaces['chennai'];
  }

  const dayItineraries = Array.from({ length: Math.min(days, 4) }, (_, dayIdx) => ({
    dayNumber: dayIdx + 1,
    date: new Date(new Date(startDate).getTime() + dayIdx * 24 * 60 * 60 * 1000).toISOString(),
    places: places.slice(dayIdx * 2, (dayIdx + 1) * 2).map((p) => ({
      ...p,
      description: p.desc || `Must-visit ${p.type.replace('_', ' ')} in ${city}`,
      isHiddenGem: Math.random() > 0.7,
      minHoursNeeded: p.time,
      distanceKm: p.distance,
      entryFee: p.fee,
    })),
    totalCost: 2000 + dayIdx * 500,
    travelTime: 120 + dayIdx * 60,
    notes: `Day ${dayIdx + 1}: Explore local attractions and experience authentic culture`,
  }));

  return {
    title: `${days}-Day Trip to ${city}`,
    days: dayItineraries,
    totalCost: budget,
    costBreakdown: {
      travel: Math.floor(budget * 0.2),
      stay: Math.floor(budget * 0.4),
      food: Math.floor(budget * 0.2),
      tickets: Math.floor(budget * 0.2),
    },
    totalDistance: 150,
    averageScore: 87,
    origin: { 
      name: city, 
      district: city, 
      state: 'India',
      lat: places[0]?.lat || 11.0168,
      lon: places[0]?.lon || 76.9558
    },
    transport: {
      from: city,
      to: city,
      recommended: { type: 'BUS' },
      totalCost: Math.floor(budget * 0.1),
    },
    tripMetadata: {
      budget: budget,
      budgetSufficient: true,
    },
  };
}
