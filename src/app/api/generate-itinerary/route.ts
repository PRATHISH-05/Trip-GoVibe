import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calculateFinalScore, getMonthEnum } from '@/lib/scoring';
import { generateItinerary, PlaceWithRoute } from '@/lib/itinerary';
import { aiArrangeItinerary, AiPlaceInput } from '@/lib/ai-itinerary';
import { calculateTransportCost } from '@/lib/transport';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      originCity,
      budget,
      days,
      startDate,
      numPeople = 1,
      tripType,
      personalities = [],
      showHiddenGems = false,
      season = null,
      pickupPoint,
      dropoffPoint,
      adults,
      children,
      useAi = false,
    } = body;
    
    // Validation
    if (!originCity || !budget || !days || !tripType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const travelDate = startDate ? new Date(startDate) : new Date();
    const travelMonth = getMonthEnum(travelDate);

    // Normalize tripType
    const normalizedTripType = tripType.toLowerCase().replace('boys', 'friends');
    
    // Determine budget level for smart filtering
    const budgetLevel = budget < 20000 ? 'low' : budget < 50000 ? 'medium' : 'high';
    
    // Determine season for filtering
    let filterSeason = season;
    if (!filterSeason) {
      const month = travelDate.getMonth() + 1;
      if (month >= 3 && month <= 5) filterSeason = 'summer';
      else if (month >= 6 && month <= 9) filterSeason = 'monsoon';
      else filterSeason = 'winter';
    }

    // Calculate inter-city transport cost if pickup/dropoff are different
    let transportInfo: any = null;
    let transportCost = 0;
    if (pickupPoint && dropoffPoint) {
      const pickup = pickupPoint.toLowerCase();
      const dropoff = dropoffPoint.toLowerCase();
      if (pickup !== dropoff) {
        transportInfo = calculateTransportCost(pickupPoint, dropoffPoint, numPeople);
        transportCost = transportInfo.totalCost;
      }
    }

    // Fetch places with smart filtering using PlaceTag metadata
    const placesWithTags = await prisma.place.findMany({
      include: {
        placeTags: true,
      } as any,
      where: showHiddenGems
        ? { OR: [{ isHiddenGem: true }, { isFamous: true }] }
        : undefined,
    });

    // Resolve origin locally for case-insensitive match on name or district
    const originLower = originCity.toLowerCase();
    
    // Create state mapping for better matching
    const stateMapping: { [key: string]: string } = {
      'coimbatore': 'Tamil Nadu',
      'tamil': 'Tamil Nadu',
      'tn': 'Tamil Nadu',
      'goa': 'Goa',
      'kerala': 'Kerala',
      'kl': 'Kerala',
      'delhi': 'Delhi',
      'delhi ncr': 'Delhi',
      'agra': 'Uttar Pradesh',
      'uttar': 'Uttar Pradesh',
      'up': 'Uttar Pradesh',
      'maharashtra': 'Maharashtra',
      'mh': 'Maharashtra',
      'mumbai': 'Maharashtra',
      'bangalore': 'Karnataka',
      'karnataka': 'Karnataka',
      'ka': 'Karnataka',
      'hyderabad': 'Telangana',
      'telangana': 'Telangana',
      'tg': 'Telangana',
      'andhra': 'Andhra Pradesh',
      'ap': 'Andhra Pradesh',
      'rajasthan': 'Rajasthan',
      'rj': 'Rajasthan',
      'jaipur': 'Rajasthan',
      'punjab': 'Punjab',
      'amritsar': 'Punjab',
      'himachal': 'Himachal Pradesh',
      'shimla': 'Himachal Pradesh',
      'uttarakhand': 'Uttarakhand',
      'jharkhand': 'Jharkhand',
      'odisha': 'Odisha',
      'manipur': 'Manipur',
      'mizoram': 'Mizoram',
      'andaman': 'Andaman and Nicobar Islands',
      'lakshadweep': 'Lakshadweep',
      'puducherry': 'Puducherry',
      'chhattisgarh': 'Chhattisgarh',
      'meghalaya': 'Meghalaya',
      'arunachal': 'Arunachal Pradesh',
      'nagaland': 'Nagaland',
      'tripura': 'Tripura',
    };
    
    // Find the target state based on origin input
    let targetState = '';
    for (const [key, state] of Object.entries(stateMapping)) {
      if (originLower.includes(key)) {
        targetState = state;
        break;
      }
    }
    
    // First try: find exact match by district/name
    let origin = placesWithTags.find(
      (p) =>
        p.district.toLowerCase() === originLower ||
        p.name.toLowerCase() === originLower
    );
    
    // Second try: partial match by district/name
    if (!origin) {
      origin = placesWithTags.find(
        (p) =>
          p.district.toLowerCase().includes(originLower) ||
          p.name.toLowerCase().includes(originLower)
      );
    }
    
    // Third try: find place in the target state
    if (!origin && targetState) {
      origin = placesWithTags.find(p => p.state === targetState);
    }
    
    // Last resort: use first place but log warning
    if (!origin && placesWithTags.length > 0) {
      origin = placesWithTags[0];
      console.warn(`Origin "${originCity}" not found, using fallback: ${origin.name}`);
    }

    if (!origin) {
      return NextResponse.json(
        { error: 'No places available in database' },
        { status: 404 }
      );
    }
    
    // **STRICT STATE FILTERING**: Only use places from the same state as origin
    const originState = origin.state;
    const statePlaces = placesWithTags.filter(p => p.state === originState);
    
    if (statePlaces.length === 0) {
      return NextResponse.json(
        { error: `No places found in ${originState}` },
        { status: 404 }
      );
    }
    
    console.log(`Generating itinerary for ${originState} with ${statePlaces.length} available places`);

    // Radius filter: keep places within radiusKm (default 100 km) from origin
    const radiusKm = Math.max(10, Math.min(300, Number(body?.radiusKm ?? 100)));
    const withDistances = statePlaces
      .filter(p => p.id !== origin.id)
      .map(p => ({ p, d: calculateStraightLineDistance(origin, p) }));

    let nearbyWithinRadius = withDistances.filter(x => x.d <= radiusKm);

    // If none found within radius, expand to 150 km, then take 20 nearest as fallback
    if (nearbyWithinRadius.length === 0) {
      const expanded = withDistances.filter(x => x.d <= 150);
      nearbyWithinRadius = expanded.length > 0
        ? expanded
        : withDistances.sort((a, b) => a.d - b.d).slice(0, Math.min(20, withDistances.length));
    }

    // Final candidate list for scoring
    const candidatePlaces = nearbyWithinRadius.map(x => x.p);

    
    // Calculate distance from origin and apply smart filters
    const scoredPlaces: PlaceWithRoute[] = [];
    
    for (const placeWithTag of candidatePlaces) {
      if (placeWithTag.id === origin.id) continue; // Skip origin itself
      
      const tag = (placeWithTag as any).placeTags[0];
      
      // Try to find route from origin
      const route = await prisma.route.findFirst({
        where: {
          OR: [
            { fromPlaceId: origin.id, toPlaceId: placeWithTag.id },
            { fromPlaceId: placeWithTag.id, toPlaceId: origin.id },
          ],
        },
      });
      
      // If no direct route, calculate straight-line distance as fallback
      let distanceKm = route?.distanceKm || calculateStraightLineDistance(origin, placeWithTag);
      
      // travel cost fallback
      let travelCost = route?.estimatedCost || distanceKm * 15; // ₹15/km fallback
      let travelTime = route?.durationMinutes || distanceKm * 1.5; // 40km/h average
      
      // Calculate score with personality boost
      const score = calculateFinalScore(
        placeWithTag,
        distanceKm,
        travelMonth,
        travelDate,
        budget,
        days,
        (tripType as string),
        personalities as string[],
        // Override weights to temporarily ignore budget influence
        { season: 30, budget: 0, days: 25, personality: 25, crowd: 20 }
      );
      
      // Add popularity bonus from PlaceTag
      const popularityBoost = tag ? (tag.popularity * 5) : 0;
      const finalScore = score + popularityBoost;
      
      // **INCLUDE ALL PLACES** - no score filtering, just show what's available
      scoredPlaces.push({
        ...placeWithTag,
        distanceKm,
        travelCost,
        travelTime,
        score: finalScore,
      });
    }
    
    // Sort by score
    scoredPlaces.sort((a, b) => b.score - a.score);
    const topPlaces = scoredPlaces; // include all nearby places (within radius or nearest fallback)

    // Try AI arrangement only when explicitly requested and key is present
    let aiArrangement: any = null;
    if (useAi) {
      if (!process.env.OPENAI_API_KEY) {
        aiArrangement = { error: 'OPENAI_API_KEY not set' };
      } else {
        try {
          // Increase to 20 places (or all if less) to show more tourist attractions
          const limited = topPlaces.slice(0, Math.min(20, topPlaces.length));
          const aiPlaces: AiPlaceInput[] = limited.map((p) => ({
            name: p.name,
            distanceKm: Math.round(p.distanceKm),
            district: p.district,
          }));

          const aiResult = await aiArrangeItinerary({
            places: aiPlaces,
            tripType: normalizedTripType as string,
            days,
            startDate: startDate || null,
            personalities: personalities as string[],
          });

          aiArrangement = aiResult;
        } catch (aiErr) {
          console.warn('AI arrangement failed, falling back to local algorithm:', aiErr);
          aiArrangement = { error: String(aiErr) };
        }
      }
    }

    // Generate algorithmic itinerary with transport cost (fallback / baseline)
    let itinerary = generateItinerary(
      topPlaces,
      days,
      budget,
      numPeople,
      startDate ? new Date(startDate) : null,
      transportCost
    );

    // If AI provided a valid arrangement, map it into our itinerary structure
    if (aiArrangement && Array.isArray(aiArrangement.days)) {
      try {
        const aiDays = aiArrangement.days;
        const daySchedules: any[] = [];
        let totalCostAcc = 0;
        let totalDistanceAcc = 0;

        for (const d of aiDays) {
          const dayNumber = d.day;
          const date = startDate ? new Date(new Date(startDate).getTime() + (dayNumber - 1) * 86400000) : null;
          const placeNames: string[] = [ ...(d.morning || []), ...(d.afternoon || []), ...(d.evening || []) ];
          const places: PlaceWithRoute[] = [];
          let dayDistance = 0;
          let dayCost = 0;
          let dayTravelTime = 0;

          for (let i = 0; i < placeNames.length; i++) {
            const name = placeNames[i];
            const found = topPlaces.find(p => p.name === name);
            if (!found) continue; // skip unknown names
            places.push(found);
            dayDistance += found.distanceKm || 0;
            dayCost += (found.travelCost || 0) + (found.entryFee || 0);
            dayTravelTime += (found.travelTime || 0);

            // add inter-place estimate to next place
            if (i < placeNames.length - 1) {
              const nextName = placeNames[i+1];
              const next = topPlaces.find(p => p.name === nextName);
              if (next) {
                const inter = calculateStraightLineDistance(found, next);
                dayDistance += inter;
                dayCost += Math.round(inter * 10); // ₹10/km inter-place
                dayTravelTime += (inter / 40) * 60;
              }
            }
          }

          // accommodation & food estimates
          if (dayNumber < days && places.length > 0) {
            const avgStay = places.reduce((s, p) => s + (p.avgStayCost || 1500), 0) / places.length;
            dayCost += avgStay / numPeople;
          }
          if (places.length > 0) {
            const avgFood = places.reduce((s, p) => s + (p.avgFoodCost || 600), 0) / places.length;
            dayCost += avgFood / numPeople;
          }

          const notes = d.notes || '';

          daySchedules.push({
            dayNumber,
            date,
            places,
            totalDistance: Math.round(dayDistance),
            totalCost: Math.round(dayCost),
            travelTime: Math.round(dayTravelTime),
            notes,
          });

          totalCostAcc += dayCost;
          totalDistanceAcc += dayDistance;
        }

        // build breakdown similarly to generateItinerary
        const travelCost = daySchedules.reduce((sum, d) => sum + d.places.reduce((s: number, p: any) => s + (p.travelCost || 0), 0), 0);
        const ticketsCost = daySchedules.reduce((sum, d) => sum + d.places.reduce((s: number, p: any) => s + (p.entryFee || 0), 0), 0);
        const stayCost = (days - 1) * 1500 * numPeople;
        const foodCost = days * 800 * numPeople;

        const correctTotalCost = Math.round(travelCost + stayCost + foodCost + ticketsCost + transportCost);

        itinerary = {
          title: `${days}-Day ${origin.district} Trip`,
          days: daySchedules,
          totalCost: correctTotalCost,
          costBreakdown: {
            travel: Math.round(travelCost),
            stay: Math.round(stayCost),
            food: Math.round(foodCost),
            tickets: Math.round(ticketsCost),
          },
          totalDistance: Math.round(totalDistanceAcc),
          averageScore: topPlaces.length > 0 ? Math.round(topPlaces.reduce((s, p) => s + p.score, 0) / topPlaces.length) : 0,
          planBAvailable: true,
        } as any;
      } catch (mapErr) {
        console.warn('Failed to map AI plan into itinerary, using algorithmic plan:', mapErr);
      }
    }
    
    // Calculate total budget including transport
    const totalBudgetNeeded = itinerary.totalCost + transportCost;
    const budgetSufficient = budget >= totalBudgetNeeded;
    const budgetShortfall = Math.max(0, totalBudgetNeeded - budget);
    
    // Save to database (non-fatal if it fails)
    let savedId: string | null = null;
    try {
      const saved = await prisma.itinerary.create({
        data: {
          title: `${originCity} Trip - ${days} Days`,
          originCity,
          budget,
          numDays: days,
          startDate: startDate ? new Date(startDate) : new Date(),
          numPeople,
          tripType: tripType as string,
          personality: (personalities || []).join(','),
          showHiddenGems,
          totalScore: itinerary.averageScore || 0,
          totalDistance: itinerary.totalDistance || 0,
          totalCost: itinerary.totalCost || 0,
          costBreakdown: JSON.stringify(itinerary.costBreakdown),
          weatherAlert: null,
          hasPlanB: false,
        },
      });
      savedId = saved.id;
    } catch (dbErr) {
      console.warn('Itinerary save failed (non-fatal):', dbErr);
    }

    return NextResponse.json({
      success: true,
      itinerary: {
        id: savedId,
        ...itinerary,
        origin: {
          name: origin.name,
          district: origin.district,
        },
        transport: transportInfo,
        tripMetadata: {
          tripType,
          adults,
          children,
          pickupPoint,
          dropoffPoint,
          budgetSufficient,
          budgetShortfall,
          budget,
          estimatedTotal: totalBudgetNeeded,
        },
      },
      // Include AI arrangement (if available). This is the AI-as-organizer output
      aiArrangement,
    });
  } catch (error: any) {
    console.error('Error generating itinerary:', error);
    return NextResponse.json(
      { error: 'Failed to generate itinerary', details: String(error?.message || error) },
      { status: 500 }
    );
  }
}

/**
 * Determine if place should be included based on distance and budget/days
 */
function shouldIncludePlace(
  distanceKm: number,
  budgetPerDay: number,
  days: number,
  isFamous: boolean
): boolean {
  // LOW budget or short trip (≤ 2 days): nearby only
  if (budgetPerDay < 2000 || days <= 2) {
    return distanceKm < 100;
  }
  
  // MEDIUM budget + 3-4 days: expand radius
  if (budgetPerDay < 5000 && days <= 4) {
    return distanceKm < 200;
  }
  
  // HIGH budget + many days: famous places anywhere
  if (isFamous) return true;
  return distanceKm < 300;
}

/**
 * Calculate straight-line distance (Haversine)
 */
function calculateStraightLineDistance(p1: any, p2: any): number {
  const R = 6371;
  const dLat = toRad(p2.lat - p1.lat);
  const dLon = toRad(p2.lon - p1.lon);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(p1.lat)) *
      Math.cos(toRad(p2.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}
