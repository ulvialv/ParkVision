// Claude AI integration with graceful fallback
import { MOCK_ZONES } from './data.js';

const FALLBACK_RECOMMENDATION = {
  recommendedZoneId: 'P10742',
  recommendedSlotId: 'P10742-S031',
  slotNumber: 31,
  zoneName: 'Atatürk pr. - Mərkəzi xətt',
  reason:
    'Sizə ən yaxın boş slot P10742-dədir – 540m məsafədə, A sektorunda, Slot 31 boşdur.',
  distanceMeters: 540,
  walkingTimeMinutes: 7,
};

export async function fetchAIRecommendation() {
  const apiKey =
    (typeof window !== 'undefined' &&
      window.localStorage &&
      window.localStorage.getItem('ANTHROPIC_API_KEY')) ||
    '';

  // Animate at least 900ms so the AI feels real
  const minDelay = new Promise((r) => setTimeout(r, 900));

  if (!apiKey) {
    await minDelay;
    return { ...FALLBACK_RECOMMENDATION, source: 'fallback' };
  }

  try {
    const reqPromise = fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 300,
        system: `Sən AzParking Smart sisteminin AI köməkçisisən.
İstifadəçinin yaxınlığındakı boş park slotlarına baxaraq ən optimal seçimi tövsiyə edirsən.
Cavabını YALNIZ bu JSON formatında ver, başqa heç nə yazma:
{
  "recommendedZoneId": "P10742",
  "recommendedSlotId": "P10742-S031",
  "slotNumber": 31,
  "zoneName": "Atatürk pr. - Mərkəzi xətt",
  "reason": "Sizə ən yaxın boş slot P10742-dədir – 540m məsafədə, A sektorunda, Slot 31 boşdur.",
  "distanceMeters": 540,
  "walkingTimeMinutes": 7
}`,
        messages: [
          {
            role: 'user',
            content: `İstifadəçi Bakıda, Neftçilər Prospekti yaxınlığında yerləşir (lat=40.37700, lng=49.85200).
Mövcud boş slotlar olan zonalar:
${JSON.stringify(
  MOCK_ZONES.filter((z) => z.availableSlots > 0).map((z) => ({
    id: z.id,
    name: z.name,
    distance: z.distance,
    availableSlots: z.availableSlots,
  })),
  null,
  2
)}
Ən yaxın və əlverişli slotu tövsiyə et.`,
          },
        ],
      }),
    }).then((r) => r.json());

    const [data] = await Promise.all([reqPromise, minDelay]);
    const text = data?.content?.[0]?.text ?? '';
    const json = JSON.parse(text.replace(/```json|```/g, '').trim());
    return { ...json, source: 'claude' };
  } catch (e) {
    console.warn(
      '[Claude API] fallback used (CORS / missing key):',
      e?.message || e
    );
    return { ...FALLBACK_RECOMMENDATION, source: 'fallback' };
  }
}
