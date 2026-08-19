// ============================================================
// CARTICOM — API Route: Get Current User (Proxy to Backend)
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL || 'https://localhost:8080';
const BACKEND_API_PREFIX = process.env.BACKEND_API_PREFIX || '/api/v1';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');

    const response = await axios.get(
      `${BACKEND_URL}${BACKEND_API_PREFIX}/auth/me`,
      {
        headers: {
          'Content-Type': 'application/json',
          ...(authHeader && { Authorization: authHeader })}}
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          success: false,
          message: error.response?.data?.message || 'Failed to fetch user',
          data: error.response?.data?.data || {},
          errorCode: error.response?.data?.errorCode || 'UNKNOWN_ERROR',
          timestamp: Date.now()},
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: 'An unexpected error occurred',
        data: {},
        errorCode: 'INTERNAL_SERVER_ERROR',
        timestamp: Date.now()},
      { status: 500 }
    );
  }
}