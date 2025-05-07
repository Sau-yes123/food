import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // In a real application, you would validate credentials against a database
    // For now, we'll just check for a demo account
    if (email === 'user@example.com' && password === 'password123') {
      return NextResponse.json({
        success: true,
        user: {
          id: '1',
          name: 'Demo User',
          email: 'user@example.com',
        },
        token: 'demo-token-12345',
      });
    }

    // Return error for invalid credentials
    return NextResponse.json(
      { success: false, message: 'Invalid email or password' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}