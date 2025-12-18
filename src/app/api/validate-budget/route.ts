import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface BudgetSuggestion {
  action: string;
  description: string;
  estimatedCost: number;
  savings: number;
}

interface BudgetValidationResponse {
  budgetSufficient: boolean;
  estimatedCost: number;
  budget: number;
  shortfall: number;
  suggestions: BudgetSuggestion[];
  breakdown: {
    travelCost: number;
    stayCost: number;
    foodCost: number;
    ticketsCost: number;
    transportCost: number;
  };
}

export async function POST(req: NextRequest) {
  try {
    const {
      budget,
      days,
      numPeople,
      adults,
      children,
      tripType,
      originCity,
      pickupPoint,
      dropoffPoint,
    } = await req.json();

    // Validate input
    if (!budget || !days || !numPeople) {
      return NextResponse.json(
        { error: 'Missing required fields: budget, days, numPeople' },
        { status: 400 }
      );
    }

    // Get estimated transport cost (inter-city)
    let transportCost = 0;
    const pickupNormalized = pickupPoint?.toLowerCase() || originCity?.toLowerCase();
    const dropoffNormalized = dropoffPoint?.toLowerCase() || originCity?.toLowerCase();

    if (
      pickupNormalized !== dropoffNormalized &&
      pickupNormalized &&
      dropoffNormalized
    ) {
      // Estimate flight cost per person (₹3000-8000) or train (₹800-2000)
      // Use flight for long distances
      const isFlightNeeded = true; // You can add logic to determine this
      const transportCostPerPerson = isFlightNeeded ? 5000 : 1500;
      transportCost = transportCostPerPerson * numPeople;
    }

    // Cost breakdown calculations
    const stayCost = (days - 1) * 1500 * numPeople;
    const foodCost = days * 800 * numPeople;

    // Estimate travel cost within destination (rough estimate)
    const travelCost = days * 500 * numPeople;

    // Estimate average tickets cost
    const ticketsCost = days * 300 * numPeople;

    const totalEstimatedCost =
      travelCost + stayCost + foodCost + ticketsCost + transportCost;

    const breakdown = {
      travelCost,
      stayCost,
      foodCost,
      ticketsCost,
      transportCost,
    };

    const suggestions: BudgetSuggestion[] = [];

    if (budget < totalEstimatedCost) {
      const shortfall = totalEstimatedCost - budget;

      // Suggestion 1: Reduce days
      const daysReduced = Math.max(1, days - 1);
      const costReducedDays =
        travelCost * (daysReduced / days) +
        (daysReduced - 1) * 1500 * numPeople +
        daysReduced * 800 * numPeople +
        daysReduced * 300 * numPeople +
        transportCost;

      if (daysReduced < days) {
        suggestions.push({
          action: 'Reduce Days',
          description: `Try ${daysReduced} day trip instead of ${days}`,
          estimatedCost: costReducedDays,
          savings: totalEstimatedCost - costReducedDays,
        });
      }

      // Suggestion 2: Reduce people
      const peopleReduced = Math.max(1, numPeople - 1);
      const costReducedPeople =
        travelCost * (peopleReduced / numPeople) +
        (days - 1) * 1500 * peopleReduced +
        days * 800 * peopleReduced +
        days * 300 * peopleReduced +
        transportCost * (peopleReduced / numPeople);

      if (peopleReduced < numPeople) {
        suggestions.push({
          action: 'Reduce Travelers',
          description: `Travel with ${peopleReduced} instead of ${numPeople} people`,
          estimatedCost: costReducedPeople,
          savings: totalEstimatedCost - costReducedPeople,
        });
      }

      // Suggestion 3: Reduce both
      if (daysReduced < days && peopleReduced < numPeople) {
        const costReducedBoth =
          travelCost * (daysReduced / days) * (peopleReduced / numPeople) +
          (daysReduced - 1) * 1500 * peopleReduced +
          daysReduced * 800 * peopleReduced +
          daysReduced * 300 * peopleReduced +
          transportCost * (peopleReduced / numPeople);

        suggestions.push({
          action: 'Reduce Days & Travelers',
          description: `Try ${daysReduced} days with ${peopleReduced} people`,
          estimatedCost: costReducedBoth,
          savings: totalEstimatedCost - costReducedBoth,
        });
      }

      // Suggestion 4: Skip inter-city transport (use local flights)
      if (transportCost > 0) {
        const costWithoutTransport =
          travelCost + stayCost + foodCost + ticketsCost;
        suggestions.push({
          action: 'Local Trip Only',
          description: `Skip inter-city transport and explore local areas`,
          estimatedCost: costWithoutTransport,
          savings: totalEstimatedCost - costWithoutTransport,
        });
      }
    }

    return NextResponse.json({
      budgetSufficient: budget >= totalEstimatedCost,
      estimatedCost: totalEstimatedCost,
      budget,
      shortfall: Math.max(0, totalEstimatedCost - budget),
      suggestions: suggestions.sort((a, b) => b.savings - a.savings),
      breakdown,
    } as BudgetValidationResponse);
  } catch (error) {
    console.error('Budget validation error:', error);
    return NextResponse.json(
      { error: 'Failed to validate budget' },
      { status: 500 }
    );
  }
}
