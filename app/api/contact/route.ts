import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import ContactMessage from "@/lib/models/ContactMessage";

// =========================
// CREATE MESSAGE (POST)
// PUBLIC
// =========================

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      name,
      email,
      phone,
      message,
    } = body;

    if (
      !name?.trim() ||
      !email?.trim() ||
      !message?.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Name, email and message are required",
        },
        { status: 400 }
      );
    }

    const contactMessage =
      await ContactMessage.create({
        name: name.trim(),
        email: email.trim(),
        phone: phone?.trim() || "",
        message: message.trim(),
      });

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully",
        contactMessage,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "POST contact message error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Failed to send message",
      },
      { status: 500 }
    );
  }
}

// =========================
// ADMIN AUTHENTICATION
// =========================

async function requireAdmin() {
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

  return null;
}

// =========================
// GET MESSAGES (GET)
// ADMIN ONLY
// =========================

export async function GET() {
  try {
    const unauthorized = await requireAdmin();

    if (unauthorized) {
      return unauthorized;
    }

    await connectDB();

    const messages =
      await ContactMessage.find()
        .sort({
          createdAt: -1,
        })
        .lean();

    return NextResponse.json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error(
      "GET contact messages error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch messages",
      },
      { status: 500 }
    );
  }
}

// =========================
// DELETE MESSAGE (DELETE)
// ADMIN ONLY
// =========================

export async function DELETE(request: Request) {
  try {
    const unauthorized = await requireAdmin();

    if (unauthorized) {
      return unauthorized;
    }

    await connectDB();

    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Message ID is required",
        },
        { status: 400 }
      );
    }

    const deletedMessage =
      await ContactMessage.findByIdAndDelete(id);

    if (!deletedMessage) {
      return NextResponse.json(
        {
          success: false,
          error: "Message not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.error(
      "DELETE contact message error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete message",
      },
      { status: 500 }
    );
  }
}

// =========================
// UPDATE MESSAGE
// PUT
// ADMIN ONLY
// =========================

export async function PUT(request: Request) {
  try {
    const unauthorized = await requireAdmin();

    if (unauthorized) {
      return unauthorized;
    }

    await connectDB();

    const {
      id,
      status,
      read,
    } = await request.json();

    // -------------------------
    // ID VALIDATION
    // -------------------------

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Message ID is required",
        },
        { status: 400 }
      );
    }

    // -------------------------
    // STATUS VALIDATION
    // -------------------------

    if (
      status !== undefined &&
      status !== "pending" &&
      status !== "resolved"
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid status value. Use 'pending' or 'resolved'.",
        },
        { status: 400 }
      );
    }

    // -------------------------
    // READ VALIDATION
    // -------------------------

    if (
      read !== undefined &&
      typeof read !== "boolean"
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid read value.",
        },
        { status: 400 }
      );
    }

    // -------------------------
    // BUILD UPDATE
    // -------------------------

    const update: {
      status?: "pending" | "resolved";
      read?: boolean;
    } = {};

    if (status !== undefined) {
      update.status = status;
    }

    if (read !== undefined) {
      update.read = read;
    }

    // -------------------------
    // NOTHING TO UPDATE
    // -------------------------

    if (Object.keys(update).length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Nothing to update",
        },
        { status: 400 }
      );
    }

    // -------------------------
    // UPDATE MESSAGE
    // -------------------------

    const updatedMessage =
      await ContactMessage.findByIdAndUpdate(
        id,
        update,
        {
          new: true,
        }
      );

    if (!updatedMessage) {
      return NextResponse.json(
        {
          success: false,
          error: "Message not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message updated successfully",
      contactMessage: updatedMessage,
    });
  } catch (error) {
    console.error(
      "PUT contact message error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to update message",
      },
      { status: 500 }
    );
  }
}