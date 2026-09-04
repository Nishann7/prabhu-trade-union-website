import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import Gallery from "@/lib/models/Gallery";

// =====================================================
// GET - Fetch all gallery photos
// =====================================================

export async function GET() {
  try {
    await connectDB();

    const photos = await Gallery.find().sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      photos,
    });
  } catch (error) {
    console.error("GET gallery error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch gallery photos",
      },
      { status: 500 }
    );
  }
}

// =====================================================
// POST - Save Cloudinary image URL
// =====================================================

export async function POST(request: Request) {
  // Admin authentication
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

    // The image is already uploaded directly to Cloudinary.
    // We only receive the title and Cloudinary URL here.
    const body = await request.json();

    const { title, imageUrl } = body;

    // Validate title
    if (
      !title ||
      typeof title !== "string" ||
      !title.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Photo title is required",
        },
        { status: 400 }
      );
    }

    // Validate image URL
    if (
      !imageUrl ||
      typeof imageUrl !== "string" ||
      !imageUrl.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Image URL is required",
        },
        { status: 400 }
      );
    }

    // Optional basic Cloudinary URL validation
    if (!imageUrl.includes("res.cloudinary.com")) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid Cloudinary image URL",
        },
        { status: 400 }
      );
    }

    // Save to MongoDB
    const photo = await Gallery.create({
      title: title.trim(),
      imageUrl: imageUrl.trim(),
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Gallery photo uploaded successfully",
        photo,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(
      "POST gallery error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error?.message ||
          "Failed to save gallery photo",
      },
      { status: 500 }
    );
  }
}

// =====================================================
// DELETE - Delete gallery photo
// =====================================================

export async function DELETE(
  request: Request
) {
  // Admin authentication
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

    const body = await request.json();

    const { id } = body;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Gallery photo ID is required",
        },
        { status: 400 }
      );
    }

    const photo =
      await Gallery.findById(id);

    if (!photo) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Gallery photo not found",
        },
        { status: 404 }
      );
    }

    await Gallery.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message:
        "Gallery photo deleted successfully",
    });
  } catch (error: any) {
    console.error(
      "DELETE gallery error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error?.message ||
          "Failed to delete gallery photo",
      },
      { status: 500 }
    );
  }
}