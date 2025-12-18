// SQLite-compatible scoring functions

export interface ScoringWeights {
  season: number;
  budget: number;
  days: number;
  personality: number;
  crowd: number;
}

export const DEFAULT_WEIGHTS: ScoringWeights = {
  season: 30,
  budget: 25,
  days: 20,
  personality: 15,
  crowd: 10,
};

export function getMonthEnum(date: Date): string {
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  return months[date.getMonth()];
}

export function calculateSeasonScore(place: any, travelMonth: string): number {
  try {
    const bestSeasons = place.bestSeasons ? place.bestSeasons.split(',').filter((s: string) => s) : [];
    const avoidSeasons = place.avoidSeasons ? place.avoidSeasons.split(',').filter((s: string) => s) : [];

    if (bestSeasons.includes(travelMonth)) return 100;
    if (avoidSeasons.includes(travelMonth)) return 0;

    if (place.seasonScore) {
      try {
        const scoreData = typeof place.seasonScore === 'string'
          ? JSON.parse(place.seasonScore)
          : place.seasonScore;
        return scoreData[travelMonth] ?? 50;
      } catch {
        return 50;
      }
    }

    return 50;
  } catch {
    return 50;
  }
}

export function calculateBudgetScore(place: any, budget: number, days: number): number {
  const budgetPerDay = budget / Math.max(days, 1);
  const tier = place.budgetTier || 'MEDIUM';

  if (tier === 'LOW' && budgetPerDay >= 3000) return 100;
  if (tier === 'MEDIUM' && budgetPerDay >= 5000 && budgetPerDay <= 15000) return 100;
  if (tier === 'HIGH' && budgetPerDay > 15000) return 100;

  if (tier === 'LOW' && budgetPerDay >= 2000) return 80;
  if (tier === 'MEDIUM' && budgetPerDay >= 3000) return 80;
  if (tier === 'HIGH' && budgetPerDay > 10000) return 80;

  return Math.max(20, Math.min(100, (budgetPerDay / 10000) * 100));
}

export function calculateDistanceScore(distanceKm: number, budget: number, days: number, place: any): number {
  const budgetPerDay = budget / Math.max(days, 1);

  if (budgetPerDay < 2000 || days <= 2) {
    if (distanceKm < 50) return 100;
    if (distanceKm < 100) return 70;
    if (distanceKm < 150) return 40;
    return 10;
  }

  if (budgetPerDay < 5000 && days <= 4) {
    if (distanceKm < 100) return 100;
    if (distanceKm < 200) return 80;
    if (distanceKm < 300) return 50;
    return place.isFamous ? 30 : 10;
  }

  if (place.isFamous) return 90;
  if (distanceKm < 300) return 80;
  return 50;
}

export function calculatePersonalityScore(place: any, personalities: string[]): number {
  if (!personalities || personalities.length === 0) return 60;

  const scores: number[] = [];
  for (const personality of personalities) {
    let score = 50;
    if (personality === 'ADVENTURE') score = place.adventureScore || 50;
    else if (personality === 'SPIRITUAL') score = place.spiritualScore || 50;
    else if (personality === 'INSTAGRAM') score = place.instagramScore || 50;
    else if (personality === 'FOODIE') score = place.foodieScore || 50;
    else if (personality === 'NATURE') score = place.natureScore || 50;
    scores.push(score);
  }

  return scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 60;
}

export function calculateTripTypeScore(place: any, tripType: string): number {
  if (tripType === 'FAMILY') return place.familyScore || 60;
  if (tripType === 'BOYS') return place.boysScore || 60;
  if (tripType === 'COUPLE') return place.coupleScore || 60;
  if (tripType === 'SOLO') return place.soloScore || 60;
  return 60;
}

export function calculateCrowdScore(place: any, travelDate: Date): number {
  try {
    const crowdData = typeof place.crowdCalendar === 'string'
      ? JSON.parse(place.crowdCalendar)
      : place.crowdCalendar || {};

    const dayOfWeek = travelDate.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    let crowdLevel = isWeekend ? crowdData.weekend : crowdData.weekday;
    crowdLevel = crowdLevel || 'medium';

    if (crowdLevel === 'low') return 100;
    if (crowdLevel === 'medium') return 70;
    if (crowdLevel === 'high') return 40;
    return 60;
  } catch {
    return 70;
  }
}

export function calculateFinalScore(
  place: any,
  distanceKm: number,
  travelMonth: string,
  travelDate: Date,
  budget: number,
  days: number,
  tripType: string,
  personalities: string[],
  weights: ScoringWeights = DEFAULT_WEIGHTS
): number {
  const seasonScore = calculateSeasonScore(place, travelMonth);
  const budgetScore = calculateBudgetScore(place, budget, days);
  const distanceScore = calculateDistanceScore(distanceKm, budget, days, place);
  const personalityScore = calculatePersonalityScore(place, personalities);
  const tripTypeScore = calculateTripTypeScore(place, tripType);
  const crowdScore = calculateCrowdScore(place, travelDate);

  const combinedPersonalityScore = (personalityScore + tripTypeScore) / 2;

  const totalWeight = weights.season + weights.budget + weights.days + weights.personality + weights.crowd;
  const finalScore =
    (weights.season * seasonScore +
      weights.budget * budgetScore +
      weights.days * distanceScore +
      weights.personality * combinedPersonalityScore +
      weights.crowd * crowdScore) /
    totalWeight;

  return Math.round(Math.max(0, Math.min(100, finalScore)));
}
