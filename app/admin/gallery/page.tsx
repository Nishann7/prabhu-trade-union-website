"use client";

import { useEffect, useState } from "react";
import Toast from "../components/Toast";
import AdminHeader from "../components/AdminHeader";
import {
  Upload,
  Trash2,
  Image as ImageIcon,
  X,
  AlertTriangle,
} from "lucide-react";

type GalleryPhoto = {
  _id: string;
  title: string;
  imageUrl: string;
  createdAt: string;
};

type ToastState = {
  type: "success" | "error";
  message: string;
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

  // =========================
  // SHOW TOAST
  // =========================

  const showToast = (
    type: "success" | "error",
    message: string
  ) => {
    setToast({
      type,
      message,
    });

    window.setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // =========================
  // FETCH GALLERY
  // =========================

  const fetchPhotos = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/gallery", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to load gallery."
        );
      }

      setPhotos(data.photos || []);
    } catch (error) {
      console.error("Gallery fetch error:", error);

      setPhotos([]);

      showToast(
        "error",
        error instanceof Error
          ? error.message
          : "Failed to load gallery."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {
    fetchPhotos();
  }, []);

  // =========================
  // SELECT IMAGE
  // =========================

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      setFile(null);
      setPreview("");
      return;
    }

    // Check image type
    if (!selectedFile.type.startsWith("image/")) {
      showToast(
        "error",
        "Please select a valid image file."
      );

      e.target.value = "";
      setFile(null);
      setPreview("");

      return;
    }

    // Maximum 10MB
    if (selectedFile.size > 10 * 1024 * 1024) {
      showToast(
        "error",
        "Image must be smaller than 10MB."
      );

      e.target.value = "";
      setFile(null);
      setPreview("");

      return;
    }

    // Remove old preview
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    const previewUrl =
      URL.createObjectURL(selectedFile);

    setFile(selectedFile);
    setPreview(previewUrl);
  };

  // =========================
  // UPLOAD PHOTO
  // =========================

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (saving) {
      return;
    }

    if (!title.trim()) {
      showToast(
        "error",
        "Please enter a photo title."
      );

      return;
    }

    if (!file) {
      showToast(
        "error",
        "Please select a photo."
      );

      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append(
        "title",
        title.trim()
      );

      formData.append(
        "file",
        file
      );

      const response = await fetch(
        "/api/gallery",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to upload photo."
        );
      }

      // Reset form
      setTitle("");
      setFile(null);

      if (preview) {
        URL.revokeObjectURL(preview);
      }

      setPreview("");

      // Reset file input
      const fileInput =
        document.getElementById(
          "gallery-file"
        ) as HTMLInputElement | null;

      if (fileInput) {
        fileInput.value = "";
      }

      // Refresh gallery
      await fetchPhotos();

      showToast(
        "success",
        "Photo uploaded successfully."
      );
    } catch (error) {
      console.error(
        "Upload photo error:",
        error
      );

      showToast(
        "error",
        error instanceof Error
          ? error.message
          : "Failed to upload photo."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // OPEN DELETE MODAL
  // =========================

  const openDeleteModal = (
    id: string,
    photoTitle: string
  ) => {
    if (saving) {
      return;
    }

    setDeleteId(id);
    setDeleteTitle(photoTitle);
  };

  // =========================
  // CLOSE DELETE MODAL
  // =========================

  const closeDeleteModal = () => {
    if (saving) {
      return;
    }

    setDeleteId(null);
    setDeleteTitle("");
  };

  // =========================
  // DELETE PHOTO
  // =========================

  const handleDelete = async () => {
    if (!deleteId || saving) {
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        "/api/gallery",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: deleteId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to delete photo."
        );
      }

      // Close modal
      setDeleteId(null);
      setDeleteTitle("");

      // Refresh gallery
      await fetchPhotos();

      showToast(
        "success",
        "Photo deleted successfully."
      );
    } catch (error) {
      console.error(
        "Delete photo error:",
        error
      );

      showToast(
        "error",
        error instanceof Error
          ? error.message
          : "Failed to delete photo."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // PAGE
  // =========================

  return (
    <main className="min-h-screen bg-[#f7f5f0] px-6 py-12 md:px-8">

      {/* =========================
          TOAST
      ========================= */}

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      <div className="mx-auto max-w-6xl">

        {/* =========================
            ADMIN NAVIGATION
        ========================= */}

        <AdminHeader />

        {/* =========================
            PAGE HEADER
        ========================= */}

        <div className="mb-14">

          <p className="mb-4 text-sm uppercase tracking-[0.28em] text-red-900">
            Prabhu Trade Union
          </p>

          <h1 className="font-serif text-4xl font-medium text-[#171717] md:text-5xl">
            Gallery Management
          </h1>

          <p className="mt-4 max-w-xl text-gray-500">
            Add and manage photos from union
            meetings, programs, events, and
            activities.
          </p>

        </div>

        {/* =========================
            UPLOAD CARD
        ========================= */}

        <div
          className="
            relative
            mb-16
            overflow-hidden
            rounded-[2rem]
            border
            border-white/80
            bg-white/60
            p-8
            shadow-[0_20px_60px_rgba(0,0,0,0.06)]
            backdrop-blur-2xl
            md:p-10
          "
        >

          {/* GLASS LIGHT */}

          <div
            className="
              pointer-events-none
              absolute
              -right-24
              -top-24
              h-64
              w-64
              rounded-full
              bg-red-100/50
              blur-3xl
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-24
              -left-24
              h-56
              w-56
              rounded-full
              bg-white/70
              blur-3xl
            "
          />

          <div className="relative">

            {/* CARD HEADER */}

            <div className="mb-8">

              <div className="mb-4 flex items-center gap-3">

                <div
                  className="
                    rounded-2xl
                    bg-red-900
                    p-3
                    text-white
                    shadow-lg
                  "
                >
                  <Upload className="h-5 w-5" />
                </div>

                <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
                  Gallery
                </p>

              </div>

              <h2 className="font-serif text-3xl text-[#171717]">
                Add New Photo
              </h2>

              <p className="mt-2 text-gray-500">
                Upload a new moment to the
                union gallery.
              </p>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* TITLE */}

              <div>

                <label
                  htmlFor="gallery-title"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-gray-700
                  "
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
                  placeholder="Executive Committee Meeting"
                  disabled={saving}
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-black/10
                    bg-white/70
                    px-4
                    py-3
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-red-900
                    focus:bg-white
                    focus:ring-4
                    focus:ring-red-900/10
                    disabled:opacity-50
                  "
                />

              </div>

              {/* FILE */}

              <div>

                <label
                  htmlFor="gallery-file"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-gray-700
                  "
                >
                  Upload Photo
                </label>

                <input
                  id="gallery-file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={saving}
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-black/10
                    bg-white/70
                    px-4
                    py-3
                    outline-none
                    file:mr-4
                    file:rounded-full
                    file:border-0
                    file:bg-red-900
                    file:px-4
                    file:py-2
                    file:text-sm
                    file:font-medium
                    file:text-white
                    file:cursor-pointer
                  "
                />

                <p className="mt-2 text-xs text-gray-500">
                  JPG, PNG, WEBP or other image
                  files. Maximum 10MB.
                </p>

              </div>

              {/* PREVIEW */}

              {preview && (
                <div>

                  <p className="mb-3 text-sm font-medium text-gray-700">
                    Preview
                  </p>

                  <div
                    className="
                      max-w-md
                      overflow-hidden
                      rounded-3xl
                      border
                      border-white
                      bg-white/50
                      p-2
                      shadow-lg
                    "
                  >

                    <img
                      src={preview}
                      alt="Selected preview"
                      className="
                        h-64
                        w-full
                        rounded-2xl
                        object-cover
                      "
                    />

                  </div>

                </div>
              )}

              {/* SELECTED FILE */}

              {file && (
                <div
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-black/5
                    bg-white/50
                    px-4
                    py-3
                  "
                >

                  <ImageIcon className="h-5 w-5 text-red-900" />

                  <p className="truncate text-sm text-gray-600">
                    {file.name}
                  </p>

                </div>
              )}

              {/* UPLOAD BUTTON */}

              <button
                type="submit"
                disabled={saving}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-red-900
                  px-7
                  py-3
                  font-medium
                  text-white
                  shadow-lg
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-red-800
                  hover:shadow-xl
                  active:scale-95
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >

                <Upload className="h-4 w-4" />

                {saving
                  ? "Uploading..."
                  : "Upload Photo"}

              </button>

            </form>

          </div>

        </div>

        {/* =========================
            EXISTING PHOTOS
        ========================= */}

        <div className="mb-8">

          <p className="text-xs uppercase tracking-[0.28em] text-gray-500">
            Gallery
          </p>

          <h2 className="mt-2 font-serif text-3xl text-[#171717]">
            Existing Photos
          </h2>

        </div>

        {/* =========================
            LOADING
        ========================= */}

        {loading && (
          <div
            className="
              rounded-3xl
              border
              border-white
              bg-white/60
              p-14
              text-center
              shadow-sm
              backdrop-blur-xl
            "
          >

            <div
              className="
                mx-auto
                mb-4
                h-8
                w-8
                animate-spin
                rounded-full
                border-2
                border-gray-200
                border-t-red-900
              "
            />

            <p className="text-gray-500">
              Loading gallery...
            </p>

          </div>
        )}

        {/* =========================
            EMPTY STATE
        ========================= */}

        {!loading && photos.length === 0 && (
          <div
            className="
              rounded-3xl
              border
              border-white
              bg-white/60
              p-14
              text-center
              shadow-sm
              backdrop-blur-xl
            "
          >

            <div
              className="
                mx-auto
                mb-5
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-gray-100
              "
            >
              <ImageIcon className="h-6 w-6 text-gray-400" />
            </div>

            <h3 className="font-serif text-2xl text-[#171717]">
              No photos yet
            </h3>

            <p className="mt-2 text-gray-500">
              Upload your first union photo
              above.
            </p>

          </div>
        )}

        {/* =========================
            PHOTO GRID
        ========================= */}

        {!loading && photos.length > 0 && (
          <div
            className="
              grid
              gap-6
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >

            {photos.map((photo) => (
              <article
                key={photo._id}
                className="
                  group
                  overflow-hidden
                  rounded-[1.5rem]
                  border
                  border-white/80
                  bg-white/65
                  shadow-[0_15px_40px_rgba(0,0,0,0.06)]
                  backdrop-blur-xl
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)]
                "
              >

                {/* IMAGE */}

                <div
                  className="
                    aspect-[4/3]
                    overflow-hidden
                    bg-gray-100
                  "
                >

                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="
                      h-full
                      w-full
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-110
                    "
                  />

                </div>

                {/* DETAILS */}

                <div className="p-5">

                  <h3
                    className="
                      font-serif
                      text-xl
                      text-[#171717]
                      transition-colors
                      duration-300
                      group-hover:text-red-900
                    "
                  >
                    {photo.title}
                  </h3>

                  <p className="mt-2 text-xs text-gray-400">
                    Added{" "}
                    {new Date(
                      photo.createdAt
                    ).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </p>

                  {/* DELETE */}

                  <button
                    type="button"
                    onClick={() =>
                      openDeleteModal(
                        photo._id,
                        photo.title
                      )
                    }
                    disabled={saving}
                    className="
                      mt-5
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-full
                      border
                      border-gray-200
                      bg-white/50
                      px-4
                      py-2.5
                      text-sm
                      text-gray-600
                      transition-all
                      duration-300
                      hover:border-red-200
                      hover:bg-red-50
                      hover:text-red-700
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >

                    <Trash2 className="h-4 w-4" />

                    Delete Photo

                  </button>

                </div>

              </article>
            ))}

          </div>
        )}

      </div>

      {/* =========================
          DELETE CONFIRMATION MODAL
      ========================= */}

      {deleteId && (
        <div
          className="
            fixed
            inset-0
            z-[90]
            flex
            items-center
            justify-center
            bg-black/40
            p-6
            backdrop-blur-md
          "
          onClick={closeDeleteModal}
        >

          <div
            className="
              relative
              w-full
              max-w-md
              rounded-[2rem]
              border
              border-white/80
              bg-white/80
              p-7
              shadow-[0_30px_100px_rgba(0,0,0,0.2)]
              backdrop-blur-2xl
            "
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* CLOSE */}

            <button
              type="button"
              disabled={saving}
              onClick={closeDeleteModal}
              className="
                absolute
                right-5
                top-5
                rounded-full
                p-2
                text-gray-400
                transition
                hover:bg-black/5
                hover:text-gray-700
                disabled:opacity-50
              "
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            {/* WARNING ICON */}

            <div
              className="
                mb-5
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-red-100
                text-red-700
              "
            >
              <AlertTriangle className="h-6 w-6" />
            </div>

            {/* TITLE */}

            <h2 className="font-serif text-2xl text-[#171717]">
              Delete Photo?
            </h2>

            {/* MESSAGE */}

            <p
              className="
                mt-3
                text-sm
                leading-6
                text-gray-600
              "
            >
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-800">
                "{deleteTitle}"
              </span>
              ?
              <br />
              This action cannot be undone.
            </p>

            {/* ACTIONS */}

            <div className="mt-7 flex gap-3">

              <button
                type="button"
                disabled={saving}
                onClick={closeDeleteModal}
                className="
                  flex-1
                  rounded-full
                  border
                  border-gray-200
                  bg-white/70
                  px-5
                  py-3
                  text-sm
                  font-medium
                  text-gray-700
                  transition
                  hover:bg-gray-100
                  disabled:opacity-50
                "
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={saving}
                onClick={handleDelete}
                className="
                  flex-1
                  rounded-full
                  bg-red-900
                  px-5
                  py-3
                  text-sm
                  font-medium
                  text-white
                  shadow-lg
                  transition-all
                  duration-300
                  hover:bg-red-800
                  hover:shadow-xl
                  active:scale-95
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {saving
                  ? "Deleting..."
                  : "Delete Photo"}
              </button>

            </div>

          </div>

        </div>
      )}

    </main>
  );
}