import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { z } from 'zod';

// ---------------------------------------------------------------------------
// Validation schema (Zod)
// ---------------------------------------------------------------------------
const schema = z.object({
  email: z.string().email(),
  teamA: z.number().int().min(0).max(20),
  teamB: z.number().int().min(0).max(20),
  firstGoalMinute: z.number().int().min(0).max(120).optional(),
  campaignId: z.string().optional(),
  website: z.string().optional(), // honeypot — must remain empty
});

// ---------------------------------------------------------------------------
// Google Sheets client
// ---------------------------------------------------------------------------
function getSheetsClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  if (!email || !key || !spreadsheetId) {
    throw new Error('Missing Google Sheets env vars.');
  }

  const auth = new google.auth.JWT({
    email,
    key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return { auth, spreadsheetId };
}

// ---------------------------------------------------------------------------
// POST /api/submit
// ---------------------------------------------------------------------------
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Honeypot: bots fill in the hidden "website" field — silently discard
    if (typeof body.website === 'string' && body.website.trim() !== '') {
      return NextResponse.json({ ok: true });
    }

    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const { email, teamA, teamB, firstGoalMinute, campaignId } = parsed.data;
    const ua = req.headers.get('user-agent') ?? '';

    const { auth, spreadsheetId } = getSheetsClient();
    const sheets = google.sheets({ version: 'v4', auth });

    // Columns: timestamp | email | teamA | teamB | firstGoalMinute | campaignId | userAgent
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:G',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            new Date().toISOString(),
            email,
            teamA,
            teamB,
            firstGoalMinute ?? '',
            campaignId ?? '',
            ua,
          ],
        ],
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[/api/submit]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
