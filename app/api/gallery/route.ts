import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Gallery from "@/lib/models/Gallery";

const CLOUDINARY_CLOUD_NAME =
  process.env.CLOUDINARY_CLOUD_NAME;

const CLOUDINARY_UPLOAD_PRESET =
  "prabhu_gallery";

// =========================
// GET ALL GALLERY PHOTOS
// =========================

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

// =========================
// UPLOAD GALLERY PHOTO
// =========================

export async function POST(request: Request) {
  try {
    await connectDB();

    // Check Cloudinary configuration
    if (!CLOUDINARY_CLOUD_NAME) {
      return NextResponse.json(
        {
          success: false,
          error: "CLOUDINARY_CLOUD_NAME is missing",
        },
        { status: 500 }
      );
    }

    // Get form data
    const formData = await request.formData();

    const title = formData.get("title");
    const file = formData.get("file");

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

    // Validate file
    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          error: "Photo file is required",
        },
        { status: 400 }
      );
    }

    // Validate image
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        {
          success: false,
          error: "Only image files are allowed",
        },
        { status: 400 }
      );
    }

    // Convert file to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create Cloudinary upload URL
    const cloudinaryUrl =
      `https://api.cloudinary.com/v1_1/` +
      `${CLOUDINARY_CLOUD_NAME}/image/upload`;

    // Create multipart form
    const cloudinaryForm = new FormData();

    cloudinaryForm.append(
      "file",
      new Blob([buffer], {
        type: file.type,
      }),
      file.name
    );

    cloudinaryForm.append(
      "upload_preset",
      CLOUDINARY_UPLOAD_PRESET
    );

    // Upload to Cloudinary
    const cloudinaryResponse = await fetch(
      cloudinaryUrl,
      {
        method: "POST",
        body: cloudinaryForm,
      }
    );

    const cloudinaryData =
      await cloudinaryResponse.json();

    console.log(
      "Cloudinary response:",
      cloudinaryData
    );

    // Check Cloudinary response
    if (!cloudinaryResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          error:
            cloudinaryData?.error?.message ||
            "Cloudinary upload failed",
        },
        { status: 500 }
      );
    }

    // Save image URL in MongoDB
    const photo = await Gallery.create({
      title: title.trim(),
      imageUrl: cloudinaryData.secure_url,
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
          "Failed to upload gallery photo",
      },
      { status: 500 }
    );
  }
}

// =========================
// DELETE GALLERY PHOTO
// =========================

export async function DELETE(
  request: Request
) {
  try {
    await connectDB();

    const { id } = await request.json();

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