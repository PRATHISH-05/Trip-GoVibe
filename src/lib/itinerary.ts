import { Place } from '@prisma/client';

export interface PlaceWithRoute extends Place {
  distanceKm: number;
  travelCost: number;
  travelTime: number;
  score: number;
}

export interface DaySchedule {
  dayNumber: number;
  date: Date | null;
  places: PlaceWithRoute[];
  totalDistance: number;
  totalCost: number;
  travelTime: number;
  notes: string;
}

export interface ItineraryResult {
  title: string;
  days: DaySchedule[];
  totalCost: number;
  costBreakdown: {
    travel: number;
    stay: number;
    food: number;
    tickets: number;
  };
  totalDistance: number;
  averageScore: number;
  weatherAlert?: string;
  planBAvailable: boolean;
}

/**
 * Generate optimized itinerary from scored places
 * Groups places by proximity, balances daily load, and suggests food/rest
 */
export function generateItinerary(
  scoredPlaces: PlaceWithRoute[],
  days: number,
  budget: number,
  numPeople: number,
  startDate: Date | null,
  transportCost: number = 0
): ItineraryResult {
  // Sort places by score (highest first)
  const sortedPlaces = [...scoredPlaces].sort((a, b) => b.score - a.score);
  
  if (sortedPlaces.length === 0) {
    return {
      title: `${days}-Day Trip`,
      days: Array.from({ length: days }, (_, i) => ({
        dayNumber: i + 1,
        date: startDate ? new Date(startDate.getTime() + i * 86400000) : null,
        places: [],
        totalDistance: 0,
        totalCost: 0,
        travelTime: 0,
        notes: 'No places found matching criteria',
      })),
      totalCost: budget,
      costBreakdown: { travel: 0, stay: 0, food: 0, tickets: 0 },
      totalDistance: 0,
      averageScore: 0,
      planBAvailable: false,
    };
  }
  
  // Use greedy algorithm to distribute places across days
  // Aim for balance in travel time and variety
  const daySchedules: DaySchedule[] = [];
  let remainingPlaces = [...sortedPlaces];
  let totalCost = 0;
  let totalDistance = 0;
  
  for (let day = 1; day <= days; day++) {
    const dayDate = startDate ? new Date(startDate.getTime() + (day - 1) * 86400000) : null;
    const dayPlaces: PlaceWithRoute[] = [];
    let dayDistance = 0;
    let dayCost = 0;
    let dayTravelTime = 0;
    
    // Determine places per day - prioritize showing tourist attractions
    const maxPlacesPerDay = 6; // Increased from 4 to show more places
    const minPlacesPerDay = 3; // Increased from 2 to ensure more attractions
    const avgPlacesPerDay = Math.max(
      minPlacesPerDay,
      Math.min(maxPlacesPerDay, Math.ceil(remainingPlaces.length / (days - day + 1)))
    );
    
    // Pick places for this day
    for (let i = 0; i < avgPlacesPerDay && remainingPlaces.length > 0; i++) {
      if (dayPlaces.length === 0) {
        // First place of the day - pick highest scored available
        const place = remainingPlaces.shift()!;
        dayPlaces.push(place);
        dayDistance += place.distanceKm;
        dayCost += place.travelCost + (place.entryFee || 0);
        dayTravelTime += place.travelTime;
      } else {
        // Pick nearest unvisited place for route efficiency
        const lastPlace = dayPlaces[dayPlaces.length - 1];
        const nearestIndex = findNearestPlace(lastPlace, remainingPlaces);
        
        if (nearestIndex !== -1) {
          // Check if adding this place keeps travel time reasonable (<8 hours for more places)
          const place = remainingPlaces[nearestIndex];
          const interDistance = estimateDistance(lastPlace, place);
          const interTime = (interDistance / 40) * 60; // 40 km/h average
          
          if (dayTravelTime + interTime < 480) { // 8 hours max (increased from 6)
            remainingPlaces.splice(nearestIndex, 1);
            dayPlaces.push(place);
            dayDistance += interDistance;
            dayCost += (place.entryFee || 0) + interDistance * 10; // ₹10/km inter-place
            dayTravelTime += interTime;
          } else {
            // Travel time limit reached, break out
            break;
          }
        } else {
          break;
        }
      }
    }
    
    // Add accommodation costs (except last day)
    if (day < days && dayPlaces.length > 0) {
      const avgStay = dayPlaces.reduce((sum, p) => sum + (p.avgStayCost || 1500), 0) / dayPlaces.length;
      dayCost += avgStay / numPeople;
    }
    
    // Add food costs
    if (dayPlaces.length > 0) {
      const avgFood = dayPlaces.reduce((sum, p) => sum + (p.avgFoodCost || 600), 0) / dayPlaces.length;
      dayCost += avgFood / numPeople;
    }
    
    // Generate notes with meal/rest suggestions
    let notes = '';
    if (dayPlaces.length > 0) {
      const typeCount: Record<string, number> = {};
      dayPlaces.forEach(p => {
        typeCount[p.type] = (typeCount[p.type] || 0) + 1;
      });
      const types = Object.keys(typeCount).join(', ');
      notes = `🏛️ Visit ${dayPlaces.length} attractions (${types})`;
      
      if (dayTravelTime > 240) {
        notes += ' | 🍽️ Plan lunch break | 💪 Rest recommended';
      } else {
        notes += ' | 🍽️ Breakfast & lunch included';
      }
    } else {
      notes = 'Flexible day - explore local area or rest';
    }
    
    daySchedules.push({
      dayNumber: day,
      date: dayDate,
      places: dayPlaces,
      totalDistance: dayDistance,
      totalCost: dayCost,
      travelTime: dayTravelTime,
      notes,
    });
    
    totalCost += dayCost;
    totalDistance += dayDistance;
  }
  
  // Calculate cost breakdown FIRST
  const travelCost = daySchedules.reduce((sum, d) => 
    sum + d.places.reduce((s, p) => s + p.travelCost, 0), 0);
  const ticketsCost = daySchedules.reduce((sum, d) => 
    sum + d.places.reduce((s, p) => s + (p.entryFee || 0), 0), 0);
  const stayCost = (days - 1) * 1500 * numPeople; // Avg 1500/person/night
  const foodCost = days * 800 * numPeople; // Avg 800/person/day
  
  // Calculate correct total as sum of all components
  const correctTotalCost = Math.round(travelCost + stayCost + foodCost + ticketsCost + transportCost);
  
  const costBreakdown = {
    travel: Math.round(travelCost),
    stay: Math.round(stayCost),
    food: Math.round(foodCost),
    tickets: Math.round(ticketsCost),
  };
  
  const averageScore = sortedPlaces.length > 0 
    ? Math.round(sortedPlaces.reduce((sum, p) => sum + p.score, 0) / sortedPlaces.length)
    : 0;
  
  return {
    title: `${days}-Day India Trip`,
    days: daySchedules,
    totalCost: correctTotalCost,
    costBreakdown,
    totalDistance: Math.round(totalDistance),
    averageScore,
    planBAvailable: true,
  };
}

/**
 * Find nearest place to current place (simplified)
 */
function findNearestPlace(current: PlaceWithRoute, places: PlaceWithRoute[]): number {
  let minDistance = Infinity;
  let minIndex = -1;
  
  for (let i = 0; i < places.length; i++) {
    const distance = estimateDistance(current, places[i]);
    // enforce max inter-place distance of 100km
    if (distance <= 100 && distance < minDistance) {
      minDistance = distance;
      minIndex = i;
    }
  }
  
  return minIndex;
}

/**
 * Estimate distance between two places (Haversine formula)
 */
function estimateDistance(p1: Place, p2: Place): number {
  const R = 6371; // Earth radius in km
  const dLat = toRad(p2.lat - p1.lat);
  const dLon = toRad(p2.lon - p1.lon);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(p1.lat)) * Math.cos(toRad(p2.lat)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}
