import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Notice from "@/lib/models/Notice";

// =========================
// GET ALL NOTICES
// =========================

export async function GET() {
  try {
    await connectDB();

   const notices = await Notice.find().sort({
  date: -1,
  createdAt: -1,
});
    return NextResponse.json({
      success: true,
      notices,
    });
  } catch (error) {
    console.error("GET notices error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch notices",
      },
      { status: 500 }
    );
  }
}

// =========================
// CREATE NOTICE
// =========================

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      title,
      description,
      date,
      category,
      important,
    } = body;

    if (!title || !description || !date) {
      return NextResponse.json(
        {
          success: false,
          error: "Title, description and date are required",
        },
        { status: 400 }
      );
    }

    const notice = await Notice.create({
      title,
      description,
      date,
      category: category || "Union Update",
      important: important || false,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Notice created successfully",
        notice,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST notices error:", error);

    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 }
    );
  }
}

// =========================
// DELETE NOTICE
// =========================

export async function DELETE(request: Request) {
  try {
    await connectDB();

    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Notice ID is required",
        },
        { status: 400 }
      );
    }

    const deletedNotice = await Notice.findByIdAndDelete(id);

    if (!deletedNotice) {
      return NextResponse.json(
        {
          success: false,
          error: "Notice not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Notice deleted successfully",
    });
  } catch (error) {
    console.error("DELETE notice error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete notice",
      },
      { status: 500 }
    );
  }
}