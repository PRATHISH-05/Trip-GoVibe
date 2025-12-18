export interface AiPlaceInput {
  name: string;
  distanceKm?: number | null;
  district?: string | null;
}

export interface AiDayPlan {
  day: number;
  morning: string[];
  afternoon: string[];
  evening: string[];
  notes?: string;
}

export interface AiItineraryResult {
  days: AiDayPlan[];
  explanation?: string;
}

function buildPrompt(places: AiPlaceInput[], tripType: string, days: number, startDate: string | null, personalities: string[] = []) {
  const placesList = places.map((p, i) => `${i + 1}. ${p.name} – ${p.distanceKm ?? 'unknown'} km`).join('\n');

  return `You are a travel itinerary organizer.\n\nRULES (STRICT):\n- Use ONLY the places given.\n- Do NOT add new places.\n- Try to use ALL or MOST places provided.\n- Do NOT change city or district.\n- Respect total days = ${days}.\n- Aim for 4-5 tourist attractions per day.\n- Distribute places evenly across all days.\n- Group nearby places together.\n- PRIORITY: Show maximum tourist places, not just food/stay.\n\nTrip type: ${tripType}\nTotal days: ${days}\nStart date: ${startDate ?? 'unknown'}\nPersonalities: ${personalities.join(', ') || 'none'}\n\nINPUT PLACES:\n${placesList}\n\nOUTPUT INSTRUCTIONS (STRICT):\nReturn a JSON object ONLY, with the shape: {"days": [{"day": 1, "morning": ["Place A", "Place B"], "afternoon": ["Place C", "Place D"], "evening": ["Place E"], "notes": "short note"}], "explanation": "one-paragraph explanation"} \n- Place names must match exactly the input names.\n- Try to include 4-5 places per day.\n- Distribute all places across the available days.\n- Each time slot (morning/afternoon/evening) can have multiple places.\n- Group nearby places on same day where possible.\n\nBe concise and return valid JSON only.`;
}

export async function aiArrangeItinerary(params: {
  places: AiPlaceInput[];
  tripType: string;
  days: number;
  startDate?: string | null;
  personalities?: string[];
}): Promise<AiItineraryResult> {
  const { places, tripType, days, startDate, personalities } = params;

  const prompt = buildPrompt(places, tripType, days, startDate ?? null, personalities ?? []);

  const key = process.env.OPENAI_API_KEY;
  const model = process.env.AI_MODEL || 'gpt-3.5-turbo';

  if (!key) throw new Error('OPENAI_API_KEY not set');

  // Use OpenAI Chat Completions API
  const body = {
    model,
    messages: [
      { role: 'system', content: 'You are a helpful assistant that strictly follows instructions.' },
      { role: 'user', content: prompt },
    ],
    max_tokens: 800,
    temperature: 0.2,
  };

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenAI error: ${res.status} ${text}`);
  }

  const json = await res.json();
  const content = json?.choices?.[0]?.message?.content;

  if (!content) throw new Error('No content from AI');

  // Try to extract JSON from the model output
  const firstBrace = content.indexOf('{');
  const lastBrace = content.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1) {
    const possible = content.slice(firstBrace, lastBrace + 1);
    try {
      const parsed = JSON.parse(possible);
      return parsed as AiItineraryResult;
    } catch (err) {
      // fallthrough
    }
  }

  // If parsing failed, try to parse full content
  try {
    return JSON.parse(content) as AiItineraryResult;
  } catch (err) {
    throw new Error('Failed to parse AI response as JSON');
  }
}
