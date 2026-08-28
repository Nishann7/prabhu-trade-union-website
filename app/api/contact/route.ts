import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ContactMessage from "@/lib/models/ContactMessage";

// =========================
// CREATE MESSAGE (POST)
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

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Name, email and message are required",
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
// GET MESSAGES (GET)
// =========================

export async function GET() {
  try {
    await connectDB();

    const messages =
      await ContactMessage.find().sort({
        createdAt: -1,
      });

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
// =========================

export async function DELETE(request: Request) {
  try {
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

    const deletedMessage = await ContactMessage.findByIdAndDelete(id);

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
    console.error("DELETE contact message error:", error);

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
// UPDATE MESSAGE STATUS (PUT)
// =========================

export async function PUT(request: Request) {
  try {
    await connectDB();

    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        {
          success: false,
          error: "Message ID and status are required",
        },
        { status: 400 }
      );
    }

    if (status !== "pending" && status !== "resolved") {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid status value. Use 'pending' or 'resolved'.",
        },
        { status: 400 }
      );
    }

    const updatedMessage = await ContactMessage.findByIdAndUpdate(
      id,
      { status },
      { new: true }
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
      message: "Status updated successfully",
      contactMessage: updatedMessage,
    });
  } catch (error) {
    console.error("PUT contact message error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update message status",
      },
      { status: 500 }
    );
  }
}