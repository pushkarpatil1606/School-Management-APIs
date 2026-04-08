import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { corsHeaders } from '@/lib/cors';
import { validateCoordinates } from '@/lib/validation';

export const runtime = 'nodejs';

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const validation = validateCoordinates(
      searchParams.get('latitude'),
      searchParams.get('longitude')
    );

    if (!validation.ok) {
      return NextResponse.json(
        { success: false, message: validation.message },
        { status: 400, headers: corsHeaders }
      );
    }

    const { latitude, longitude } = validation.data;

    const [rows] = await pool.execute(
      `
      SELECT
        id,
        name,
        address,
        latitude,
        longitude,
        ROUND(
          (
            6371 * ACOS(
              LEAST(
                1,
                GREATEST(
                  -1,
                  COS(RADIANS(?)) * COS(RADIANS(latitude)) * COS(RADIANS(longitude) - RADIANS(?)) +
                  SIN(RADIANS(?)) * SIN(RADIANS(latitude))
                )
              )
            )
          ),
          3
        ) AS distance_km
      FROM schools
      ORDER BY distance_km ASC, id ASC
      `,
      [latitude, longitude, latitude]
    );

    return NextResponse.json(
      {
        success: true,
        count: rows.length,
        data: rows
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error('listSchools error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch schools.' },
      { status: 500, headers: corsHeaders }
    );
  }
}
