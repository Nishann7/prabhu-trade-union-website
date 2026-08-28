import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Settings from "@/lib/models/Settings";

// =========================
// GET SETTINGS
// =========================

export async function GET() {
  try {
    await connectDB();

    let settings = await Settings.findOne();

    // Create default settings if none exist
    if (!settings) {
      settings = await Settings.create({
        unionName: "Prabhu Trade Union",
        address: "",
        phone: "",
        email: "",
      });
    }

    return NextResponse.json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error("GET settings error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch settings",
      },
      { status: 500 }
    );
  }
}

// =========================
// UPDATE SETTINGS
// =========================

export async function PUT(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      unionName,
      address,
      phone,
      email,
    } = body;

    if (!unionName?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Union name is required",
        },
        { status: 400 }
      );
    }

    const settings = await Settings.findOneAndUpdate(
      {},
      {
        unionName: unionName.trim(),
        address: address?.trim() || "",
        phone: phone?.trim() || "",
        email: email?.trim() || "",
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    return NextResponse.json({
      success: true,
      message: "Settings updated successfully",
      settings,
    });
  } catch (error) {
    console.error("PUT settings error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update settings",
      },
      { status: 500 }
    );
  }
}