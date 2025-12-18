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
      { name: 'Isha Yoga Center', type: 'TEMPLE', distance: 30, time: 2, fee: 0, score: 95 },
      { name: 'Nilgiri Mountain Railway', type: 'VIEWPOINT', distance: 45, time: 3, fee: 500, score: 88 },
      { name: 'Ooty Lake', type: 'LAKE', distance: 50, time: 2, fee: 100, score: 85 },
      { name: 'Botanical Garden', type: 'GARDEN', distance: 50, time: 2, fee: 150, score: 82 },
    ],
    'delhi': [
      { name: 'India Gate', type: 'VIEWPOINT', distance: 0, time: 1, fee: 0, score: 92 },
      { name: 'Red Fort', type: 'TEMPLE', distance: 5, time: 2, fee: 300, score: 90 },
      { name: 'Jama Masjid', type: 'TEMPLE', distance: 6, time: 1, fee: 0, score: 88 },
      { name: 'Chandni Chowk', type: 'MALL', distance: 7, time: 2, fee: 0, score: 80 },
    ],
    'goa': [
      { name: 'Baga Beach', type: 'VIEWPOINT', distance: 0, time: 3, fee: 0, score: 90 },
      { name: 'Fort Aguada', type: 'TEMPLE', distance: 8, time: 2, fee: 200, score: 85 },
      { name: 'Dudhsagar Falls', type: 'WATERFALL', distance: 60, time: 4, fee: 300, score: 88 },
      { name: 'Anjuna Flea Market', type: 'MALL', distance: 12, time: 2, fee: 0, score: 75 },
    ],
  };

  const cityLower = city.toLowerCase();
  const places = mockPlaces[cityLower] || mockPlaces['coimbatore'];

  const dayItineraries = Array.from({ length: Math.min(days, 4) }, (_, dayIdx) => ({
    dayNumber: dayIdx + 1,
    date: new Date(new Date(startDate).getTime() + dayIdx * 24 * 60 * 60 * 1000).toISOString(),
    places: places.slice(dayIdx * 2, (dayIdx + 1) * 2).map((p) => ({
      ...p,
      description: `Must-visit ${p.type.replace('_', ' ')} in ${city}`,
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
    origin: { name: city, district: city, state: 'India' },
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
