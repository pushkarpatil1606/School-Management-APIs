import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { corsHeaders } from '@/lib/cors';
import { validateSchoolPayload } from '@/lib/validation';

export const runtime = 'nodejs';

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function POST(request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, message: 'Invalid JSON body.' },
        { status: 400, headers: corsHeaders }
      );
    }

    const validation = validateSchoolPayload(body);
    if (!validation.ok) {
      return NextResponse.json(
        { success: false, message: validation.message },
        { status: 400, headers: corsHeaders }
      );
    }

    const { name, address, latitude, longitude } = validation.data;

    const [result] = await pool.execute(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name, address, latitude, longitude]
    );

    return NextResponse.json(
      {
        success: true,
        message: 'School added successfully.',
        data: {
          id: result.insertId,
          name,
          address,
          latitude,
          longitude
        }
      },
      { status: 201, headers: corsHeaders }
    );
  } catch (error) {
    console.error('addSchool error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to add school.' },
      { status: 500, headers: corsHeaders }
    );
  }
}
