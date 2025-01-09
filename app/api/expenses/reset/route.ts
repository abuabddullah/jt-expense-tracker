import clientPromise from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const client = await clientPromise;
    const db = client.db("expense-tracker");

    // Delete all documents from the expenses collection
    await db.collection("expenses").deleteMany({});

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to reset expenses" },
      { status: 500 }
    );
  }
}
