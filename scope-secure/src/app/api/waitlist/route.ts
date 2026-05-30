import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
          const { firstName, lastName, email, phone } = await req.json();

          if (!email) {
                  return NextResponse.json({ error: 'Email is required' }, { status: 400 });
                }

          const apiKey = process.env.GHL_API_KEY;
          const locationId = process.env.GHL_LOCATION_ID;

          if (!apiKey || !locationId) {
                  console.error('Missing GHL env vars');
                  return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
                }

          const payload = {
                  firstName: firstName || '',
                  lastName: lastName || '',
                  email,
                  phone: phone || '',
                  locationId,
                  tags: ['waitlist'],
                  source: 'scopesecure.com',
                };

          const response = await fetch('https://services.leadconnectorhq.com/contacts/', {
                  method: 'POST',
                  headers: {
                            'Authorization': `Bearer ${apiKey}`,
                            'Content-Type': 'application/json',
                            'Version': '2021-07-28',
                          },
                  body: JSON.stringify(payload),
                });

          const data = await response.json();

          if (!response.ok) {
                  console.error('GHL API error:', data);
                  return NextResponse.json({ error: 'Failed to save to CRM' }, { status: 500 });
                }

          return NextResponse.json({ success: true, contactId: data.contact?.id });
        } catch (err) {
          console.error('Waitlist API error:', err);
          return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
        }
  }
