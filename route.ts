import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName } = body;

    // In a real application, you would save this data to a database
    // For now, we'll just return a success response
    
    // Check if email is already taken (simulating a database check)
    if (email === 'user@example.com') {
      return NextResponse.json(
        { success: false, message: 'Email is already registered' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Registration successful',
      user: {
        id: Math.random().toString(36).substring(2, 15),
        name: `${firstName} ${lastName}`,
        email,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}