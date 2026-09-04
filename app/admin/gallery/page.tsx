"use client";

import { useEffect, useState } from "react";
import {
  Upload,
  Trash2,
  Image as ImageIcon,
  X,
} from "lucide-react";

import AdminHeader from "@/app/admin/components/AdminHeader";

type GalleryPhoto = {
  _id: string;
  title: string;
  imageUrl: string;
  createdAt: string;
};

type ToastState = {
  message: string;
  type: "success" | "error";
} | null;

export default function AdminGalleryPage() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const [toast, setToast] = useState<ToastState>(null);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteTitle, setDeleteTitle] = useState("");

  const showToast = (
    message: string,
    type: "success" | "error"
  ) => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const fetchPhotos = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/gallery");

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Failed to fetch gallery"
        );
      }

      setPhotos(data.photos || []);
    } catch (error) {
      console.error("Failed to load gallery:", error);

      showToast(
        "Failed to load gallery photos.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      showToast(
        "Please select a valid image file.",
        "error"
      );
      return;
    }

    setFile(selectedFile);

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    const objectUrl = URL.createObjectURL(selectedFile);

    setPreview(objectUrl);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!title.trim()) {
      showToast(
        "Please enter a photo title.",
        "error"
      );
      return;
    }

    if (!file) {
      showToast(
        "Please select an image.",
        "error"
      );
      return;
    }

    try {
      setSaving(true);

      // =====================================================
      // STEP 1: Upload image directly to Cloudinary
      // =====================================================

      const cloudinaryForm = new FormData();

      cloudinaryForm.append("file", file);
      cloudinaryForm.append(
        "upload_preset",
        "prabhu_gallery"
      );

      const cloudinaryResponse = await fetch(
        "https://api.cloudinary.com/v1_1/xsthhe4y/image/upload",
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

      if (!cloudinaryResponse.ok) {
        throw new Error(
          cloudinaryData?.error?.message ||
            "Cloudinary upload failed."
        );
      }

      if (!cloudinaryData.secure_url) {
        throw new Error(
          "Cloudinary did not return an image URL."
        );
      }

      // =====================================================
      // STEP 2: Send only title + URL to our API
      // =====================================================

      const response = await fetch("/api/gallery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          imageUrl: cloudinaryData.secure_url,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Failed to save gallery photo."
        );
      }

      // =====================================================
      // SUCCESS
      // =====================================================

      showToast(
        "Gallery photo uploaded successfully!",
        "success"
      );

      setTitle("");
      setFile(null);

      if (preview) {
        URL.revokeObjectURL(preview);
      }

      setPreview("");

      // Reset file input
      const fileInput = document.getElementById(
        "gallery-file"
      ) as HTMLInputElement | null;

      if (fileInput) {
        fileInput.value = "";
      }

      await fetchPhotos();
    } catch (error: any) {
      console.error(
        "Gallery upload error:",
        error
      );

      showToast(
        error?.message ||
          "Failed to upload gallery photo.",
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) {
      return;
    }

    try {
      const response = await fetch("/api/gallery", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: deleteId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Failed to delete photo."
        );
      }

      showToast(
        "Gallery photo deleted successfully.",
        "success"
      );

      setDeleteId(null);
      setDeleteTitle("");

      await fetchPhotos();
    } catch (error: any) {
      console.error(
        "Delete gallery error:",
        error
      );

      showToast(
        error?.message ||
          "Failed to delete photo.",
        "error"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg">
              <ImageIcon size={24} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Gallery
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage Prabhu Union gallery photos
              </p>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-900">
              Upload New Photo
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Add a new photo to the gallery.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Title */}
            <div>
              <label
                htmlFor="gallery-title"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Photo Title
              </label>

              <input
                id="gallery-title"
                type="text"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                placeholder="Enter photo title"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* File */}
            <div>
              <label
                htmlFor="gallery-file"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Image
              </label>

              <input
                id="gallery-file"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full cursor-pointer rounded-xl border border-slate-300 bg-white text-sm text-slate-600 file:mr-4 file:border-0 file:bg-blue-50 file:px-4 file:py-3 file:font-medium file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            {/* Preview */}
            {preview && (
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-96 w-full object-contain"
                />
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Upload size={18} />

              {saving
                ? "Uploading..."
                : "Upload Photo"}
            </button>
          </form>
        </section>

        {/* Gallery */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Gallery Photos
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {photos.length} photo
                {photos.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {loading ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
              <p className="text-sm text-slate-500">
                Loading gallery...
              </p>
            </div>
          ) : photos.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <ImageIcon
                size={40}
                className="mx-auto mb-3 text-slate-400"
              />

              <p className="font-medium text-slate-700">
                No gallery photos yet
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Upload your first photo above.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {photos.map((photo) => (
                <div
                  key={photo._id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <div className="aspect-video overflow-hidden bg-slate-100">
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="h-full w-full object-cover transition duration-300 hover:scale-105"
                    />
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="truncate font-semibold text-slate-900">
                          {photo.title}
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          {new Date(
                            photo.createdAt
                          ).toLocaleDateString()}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setDeleteId(photo._id);
                          setDeleteTitle(
                            photo.title
                          );
                        }}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-red-500 transition hover:bg-red-50 hover:text-red-600"
                        title="Delete photo"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Toast */}
      {toast && (
        <div
          className={`fixed right-5 top-5 z-50 rounded-xl px-5 py-3 text-sm font-medium text-white shadow-lg ${
            toast.type === "success"
              ? "bg-green-600"
              : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Delete Photo
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Are you sure you want to delete this
                  photo?
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setDeleteId(null);
                  setDeleteTitle("");
                }}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-6 rounded-xl bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-900">
                {deleteTitle}
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setDeleteId(null);
                  setDeleteTitle("");
                }}
                className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="rounded-xl bg-red-600 px-5 py-3 text-sm font-medium text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}