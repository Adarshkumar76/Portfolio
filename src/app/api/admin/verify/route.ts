import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { pin } = await request.json();
    const serverPin = process.env.ADMIN_SECRET_PIN || process.env.NEXT_PUBLIC_ADMIN_PIN;

    if (!serverPin) {
      return NextResponse.json(
        { valid: false, error: "Admin PIN is not configured on server." },
        { status: 500 }
      );
    }

    if (pin && pin.trim() === serverPin.trim()) {
      return NextResponse.json({ valid: true });
    }

    return NextResponse.json({ valid: false, error: "Incorrect Admin PIN." }, { status: 401 });
  } catch {
    return NextResponse.json({ valid: false, error: "Server verification failed." }, { status: 500 });
  }
}
