import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import Notice from "@/lib/models/Notice";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

// =========================
// UPDATE NOTICE
// ADMIN ONLY
// =========================

export async function PUT(
  request: Request,
  context: RouteContext
) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      {
        success: false,
        error: "Unauthorized",
      },
      { status: 401 }
    );
  }

  try {
    await connectDB();

    const { id } = await context.params;

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
          error:
            "Title, description and date are required",
        },
        { status: 400 }
      );
    }

    const updatedNotice =
      await Notice.findByIdAndUpdate(
        id,
        {
          title,
          description,
          date,
          category: category || "Union Update",
          important: important || false,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedNotice) {
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
      message: "Notice updated successfully",
      notice: updatedNotice,
    });
  } catch (error) {
    console.error(
      "PUT notice error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update notice",
      },
      { status: 500 }
    );
  }
}

// =========================
// DELETE NOTICE BY ID
// ADMIN ONLY
// =========================

export async function DELETE(
  request: Request,
  context: RouteContext
) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      {
        success: false,
        error: "Unauthorized",
      },
      { status: 401 }
    );
  }

  try {
    await connectDB();

    const { id } = await context.params;

    const deletedNotice =
      await Notice.findByIdAndDelete(id);

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
    console.error(
      "DELETE notice error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete notice",
      },
      { status: 500 }
    );
  }
}