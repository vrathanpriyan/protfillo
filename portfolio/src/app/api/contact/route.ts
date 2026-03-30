import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import type { ContactMessage, Database } from "@/lib/supabase/types";

export async function POST(request: Request) {
  try {
    const body = await request.json() as ContactMessage;
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabase = await createClient();
    const { error } = await supabase
      .from("contact_messages")
      .insert({ 
        name, 
        email, 
        subject: subject || null, 
        message 
      } as Database["public"]["Tables"]["contact_messages"]["Insert"]);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
