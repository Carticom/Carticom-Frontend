// ============================================================
// CARTICOM — API Route: Logout (Proxy to Backend)
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL || 'https://localhost:8080';
const BACKEND_API_PREFIX = process.env.BACKEND_API_PREFIX || '/api/v1';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await axios.post(
      `${BACKEND_URL}${BACKEND_API_PREFIX}/auth/logout`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          success: false,
          message: error.response?.data?.message || 'Logout failed',
          data: error.response?.data?.data || {},
          errorCode: error.response?.data?.errorCode || 'UNKNOWN_ERROR',
          timestamp: Date.now(),
        },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected error occurred',
        data: {},
        errorCode: 'INTERNAL_SERVER_ERROR',
        timestamp: Date.now(),
      },
      { status: 500 }
    );
  }
}