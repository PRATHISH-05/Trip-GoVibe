import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const budgetLevel = searchParams.get('budget'); // 'low', 'medium', 'high'
    const season = searchParams.get('season'); // 'summer', 'monsoon', 'winter', 'all'
    const tripType = searchParams.get('tripType'); // 'family', 'couple', 'friends', 'solo'
    const maxDays = searchParams.get('days') ? parseInt(searchParams.get('days')!) : 7;
    const state = searchParams.get('state'); // Optional: filter by state
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 20;

    // Build WHERE clause dynamically
    const where: any = {};

    // Budget filter
    if (budgetLevel) {
      where.placeTags = {
        some: {
          budgetLevel,
        },
      };
    }

    // Trip type filter
    if (tripType) {
      where.placeTags = {
        ...where.placeTags,
        some: {
          ...where.placeTags?.some,
          tripType: {
            contains: tripType,
          },
        },
      };
    }

    // Season filter
    if (season) {
      where.placeTags = {
        ...where.placeTags,
        some: {
          ...where.placeTags?.some,
          season: {
            contains: season,
          },
        },
      };
    }

    // Days filter - check if place can be visited in given days
    if (maxDays) {
      where.placeTags = {
        ...where.placeTags,
        some: {
          ...where.placeTags?.some,
          idealDays: {
            contains: maxDays.toString(), // Simple substring match
          },
        },
      };
    }

    // State filter
    if (state) {
      where.state = state;
    }

    // Query places with tags, ordered by popularity
    const places = await prisma.place.findMany({
      where,
      include: {
        placeTags: true,
      } as any,
      orderBy: [
        {
          placeTags: {
            _count: 'desc',
          },
        },
      ] as any,
      take: limit,
    });

    // Sort by popularity score
    const sortedPlaces = (places as any[]).sort((a, b) => {
      const popA = (a as any).placeTags[0]?.popularity || 0;
      const popB = (b as any).placeTags[0]?.popularity || 0;
      return popB - popA;
    });

    // Return filtered and ranked places
    return NextResponse.json({
      success: true,
      count: sortedPlaces.length,
      filters: {
        budget: budgetLevel,
        season,
        tripType,
        days: maxDays,
        state,
      },
      places: sortedPlaces.map((place: any) => ({
        id: place.id,
        name: place.name,
        district: place.district,
        state: place.state,
        type: place.type,
        lat: place.lat,
        lon: place.lon,
        description: place.description,
        imageUrl: place.imageUrl,
        entryFee: place.entryFee,
        tags: place.placeTags[0] ? {
          season: place.placeTags[0].season,
          budgetLevel: place.placeTags[0].budgetLevel,
          idealDays: place.placeTags[0].idealDays,
          tripType: place.placeTags[0].tripType,
          popularity: place.placeTags[0].popularity,
          minHoursNeeded: place.placeTags[0].minHoursNeeded,
        } : null,
      })),
    });
  } catch (error) {
    console.error('Filter places error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to filter places',
      },
      { status: 500 }
    );
  }
}
