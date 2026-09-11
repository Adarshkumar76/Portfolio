import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Please provide your name, email, and message." },
        { status: 400 }
      );
    }

    // 1. If Supabase is connected, record the message in 'contact_messages'
    if (supabase) {
      try {
        await supabase.from("contact_messages").insert([
          {
            name,
            email,
            subject: subject || "Portfolio Inquiry",
            message,
            created_at: new Date().toISOString(),
          },
        ]);
      } catch (dbErr) {
        console.warn("Could not save to Supabase contact_messages table:", dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Message received successfully!",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to process message." },
      { status: 500 }
    );
  }
}
