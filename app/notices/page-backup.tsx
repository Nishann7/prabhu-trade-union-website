"use client";

import { useEffect, useRef, useState } from "react";
import Toast from "../components/Toast";

type Notice = {
  _id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  important: boolean;
};

type ToastState = {
  type: "success" | "error";
  message: string;
} | null;

export default function AdminNoticesPage() {
  const [showForm, setShowForm] = useState(false);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [editingNotice, setEditingNotice] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Union Update");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [important, setImportant] = useState(false);

  const [toast, setToast] = useState<ToastState>(null);

  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // =========================
  // SHOW TOAST
  // =========================

  const showToast = (
    type: "success" | "error",
    message: string
  ) => {
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }

    setToast({
      type,
      message,
    });

    toastTimer.current = setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // =========================
  // CLEANUP TOAST TIMER
  // =========================

  useEffect(() => {
    return () => {
      if (toastTimer.current) {
        clearTimeout(toastTimer.current);
      }
    };
  }, []);

  // =========================
  // GET NOTICES
  // =========================

  const fetchNotices = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/notices", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to fetch notices."
        );
      }

      setNotices(data.notices || []);
    } catch (error) {
      console.error("Error fetching notices:", error);

      setNotices([]);

      showToast(
        "error",
        error instanceof Error
          ? error.message
          : "Failed to load notices."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {
    fetchNotices();
  }, []);

  // =========================
  // RESET FORM
  // =========================

  const resetForm = () => {
    setTitle("");
    setCategory("Union Update");
    setDate("");
    setDescription("");
    setImportant(false);
    setEditingNotice(null);
  };

  // =========================
  // EDIT NOTICE
  // =========================

  const handleEdit = (notice: Notice) => {
    setEditingNotice(notice._id);

    setTitle(notice.title);
    setDescription(notice.description);
    setCategory(notice.category);
    setImportant(notice.important);

    const formattedDate = new Date(notice.date)
      .toISOString()
      .split("T")[0];

    setDate(formattedDate);

    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // CREATE / UPDATE
  // =========================

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (saving) {
      return;
    }

    // VALIDATION

    if (!title.trim()) {
      showToast(
        "error",
        "Please enter a notice title."
      );
      return;
    }

    if (!date) {
      showToast(
        "error",
        "Please select a notice date."
      );
      return;
    }

    if (!description.trim()) {
      showToast(
        "error",
        "Please enter the notice description."
      );
      return;
    }

    try {
      setSaving(true);

      // =========================
      // UPDATE
      // =========================

      if (editingNotice) {
        const response = await fetch(
          `/api/notices/${editingNotice}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: title.trim(),
              description: description.trim(),
              date,
              category,
              important,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || "Failed to update notice."
          );
        }

        resetForm();
        setShowForm(false);

        await fetchNotices();

        showToast(
          "success",
          "Notice updated successfully."
        );

        return;
      }

      // =========================
      // CREATE
      // =========================

      const response = await fetch("/api/notices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          date,
          category,
          important,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to create notice."
        );
      }

      resetForm();
      setShowForm(false);

      await fetchNotices();

      showToast(
        "success",
        "Notice created successfully."
      );
    } catch (error) {
      console.error("Error saving notice:", error);

      showToast(
        "error",
        error instanceof Error
          ? error.message
          : "Failed to save notice."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = async (id: string) => {
    if (saving) {
      return;
    }

    // We are intentionally NOT using alert().
    // Confirm is kept only for deletion protection.

    const confirmed = window.confirm(
      "Are you sure you want to delete this notice?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setSaving(true);

      const response = await fetch("/api/notices", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to delete notice."
        );
      }

      await fetchNotices();

      showToast(
        "success",
        "Notice deleted successfully."
      );
    } catch (error) {
      console.error("Error deleting notice:", error);

      showToast(
        "error",
        error instanceof Error
          ? error.message
          : "Failed to delete notice."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // CANCEL
  // =========================

  const handleCancel = () => {
    resetForm();
    setShowForm(false);
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
          onClose={() => {
            if (toastTimer.current) {
              clearTimeout(toastTimer.current);
            }

            setToast(null);
          }}
        />
      )}

      <div className="mx-auto max-w-6xl">

        {/* =========================
            HEADER
        ========================= */}

        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

          <div>

            <p className="mb-4 text-sm uppercase tracking-[0.28em] text-red-900">
              Prabhu Trade Union
            </p>

            <h1 className="font-serif text-4xl font-medium leading-tight text-[#171717] md:text-5xl">
              Notices
            </h1>

            <p className="mt-4 max-w-xl text-base text-gray-500 md:text-lg">
              Union announcements, meeting schedules,
              and important updates for all members.
            </p>

          </div>

          <button
            type="button"
            disabled={saving}
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="
              rounded-full
              bg-red-900
              px-6
              py-3
              font-medium
              text-white
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-red-800
              hover:shadow-lg
              active:scale-[0.98]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            + Add Notice
          </button>

        </div>

        {/* =========================
            FORM
        ========================= */}

        {showForm && (
          <div className="
            mb-16
            rounded-3xl
            border
            border-gray-200
            bg-white
            p-8
            shadow-sm
          ">

            <div className="mb-8">

              <p className="
                mb-4
                text-sm
                uppercase
                tracking-[0.28em]
                text-gray-500
              ">
                {editingNotice
                  ? "Edit Notice"
                  : "New Notice"}
              </p>

              <h2 className="
                font-serif
                text-3xl
                text-[#171717]
              ">
                {editingNotice
                  ? "Update Notice"
                  : "Create Notice"}
              </h2>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* TITLE */}

              <div>

                <label
                  htmlFor="notice-title"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-gray-700
                  "
                >
                  Notice Title
                </label>

                <input
                  id="notice-title"
                  type="text"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  placeholder="Enter notice title"
                  disabled={saving}
                  className="
                    w-full
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50
                    px-4
                    py-3
                    outline-none
                    focus:border-red-800
                    focus:ring-2
                    focus:ring-red-100
                    disabled:opacity-50
                  "
                />

              </div>

              {/* CATEGORY + DATE */}

              <div className="grid gap-6 md:grid-cols-2">

                <div>

                  <label
                    htmlFor="notice-category"
                    className="
                      mb-2
                      block
                      text-sm
                      font-medium
                      text-gray-700
                    "
                  >
                    Category
                  </label>

                  <select
                    id="notice-category"
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value)
                    }
                    disabled={saving}
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50
                      px-4
                      py-3
                      outline-none
                      focus:border-red-800
                      disabled:opacity-50
                    "
                  >
                    <option>Union Update</option>
                    <option>Meeting</option>
                    <option>Announcement</option>
                    <option>Welfare</option>
                    <option>Important</option>
                  </select>

                </div>

                <div>

                  <label
                    htmlFor="notice-date"
                    className="
                      mb-2
                      block
                      text-sm
                      font-medium
                      text-gray-700
                    "
                  >
                    Date
                  </label>

                  <input
                    id="notice-date"
                    type="date"
                    value={date}
                    onChange={(e) =>
                      setDate(e.target.value)
                    }
                    disabled={saving}
                    className="
                      w-full
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50
                      px-4
                      py-3
                      outline-none
                      focus:border-red-800
                      disabled:opacity-50
                    "
                  />

                </div>

              </div>

              {/* DESCRIPTION */}

              <div>

                <label
                  htmlFor="notice-description"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-gray-700
                  "
                >
                  Description
                </label>

                <textarea
                  id="notice-description"
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  rows={6}
                  placeholder="Write the notice details..."
                  disabled={saving}
                  className="
                    w-full
                    resize-none
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50
                    px-4
                    py-3
                    outline-none
                    focus:border-red-800
                    focus:ring-2
                    focus:ring-red-100
                    disabled:opacity-50
                  "
                />

              </div>

              {/* IMPORTANT */}

              <label className="
                flex
                cursor-pointer
                items-center
                gap-3
              ">

                <input
                  type="checkbox"
                  checked={important}
                  onChange={(e) =>
                    setImportant(e.target.checked)
                  }
                  disabled={saving}
                  className="h-4 w-4 accent-red-900"
                />

                <span className="text-sm text-gray-700">
                  Mark this notice as important
                </span>

              </label>

              {/* BUTTONS */}

              <div className="
                flex
                flex-wrap
                gap-4
                pt-2
              ">

                <button
                  type="submit"
                  disabled={saving}
                  className="
                    rounded-full
                    bg-red-900
                    px-6
                    py-3
                    font-medium
                    text-white
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-red-800
                    hover:shadow-lg
                    active:scale-95
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  {saving
                    ? editingNotice
                      ? "Updating..."
                      : "Saving..."
                    : editingNotice
                      ? "Update Notice"
                      : "Save Notice"}
                </button>

                <button
                  type="button"
                  disabled={saving}
                  onClick={handleCancel}
                  className="
                    rounded-full
                    border
                    border-gray-300
                    px-6
                    py-3
                    font-medium
                    text-gray-700
                    transition-all
                    duration-300
                    hover:bg-gray-100
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  {editingNotice
                    ? "Cancel Edit"
                    : "Close Form"}
                </button>

              </div>

            </form>

          </div>
        )}

        {/* =========================
            RECENT NOTICES
        ========================= */}

        <div className="mb-8">

          <p className="
            text-xs
            uppercase
            tracking-[0.28em]
            text-gray-500
          ">
            Latest
          </p>

          <h2 className="
            mt-2
            font-serif
            text-2xl
            text-[#171717]
          ">
            Recent Notices
          </h2>

        </div>

        {/* LOADING */}

        {loading && (
          <div className="
            py-12
            text-center
            text-gray-500
          ">
            Loading notices...
          </div>
        )}

        {/* EMPTY */}

        {!loading && notices.length === 0 && (
          <div className="
            rounded-2xl
            bg-white
            p-10
            text-center
            shadow-sm
          ">

            <p className="text-gray-500">
              No notices have been created yet.
            </p>

            <button
              type="button"
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="
                mt-4
                font-medium
                text-red-900
                hover:underline
              "
            >
              Create your first notice →
            </button>

          </div>
        )}

        {/* NOTICE LIST */}

        {!loading && notices.length > 0 && (
          <div>

            {notices.map((notice) => (
              <article
                key={notice._id}
                className="
                  group
                  rounded-2xl
                  border-t
                  border-gray-300
                  py-8
                  transition-all
                  duration-500
                  ease-out
                  hover:bg-white/70
                  hover:px-6
                  hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)]
                "
              >

                <div className="
                  flex
                  flex-col
                  gap-8
                  md:flex-row
                  md:justify-between
                ">

                  <div className="max-w-3xl">

                    <div className="
                      mb-4
                      flex
                      flex-wrap
                      items-center
                      gap-3
                    ">

                      <p className="
                        text-xs
                        uppercase
                        tracking-[0.2em]
                        text-gray-500
                      ">
                        {new Date(
                          notice.date
                        ).toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </p>

                      <span className="
                        rounded-full
                        bg-gray-100
                        px-3
                        py-1
                        text-xs
                        text-gray-600
                      ">
                        {notice.category}
                      </span>

                      {notice.important && (
                        <span className="
                          rounded-full
                          bg-red-100
                          px-3
                          py-1
                          text-xs
                          text-red-900
                        ">
                          Important
                        </span>
                      )}

                    </div>

                    <h3 className="
                      font-serif
                      text-2xl
                      text-red-900
                      transition-all
                      duration-300
                      group-hover:translate-x-1
                      group-hover:text-red-800
                    ">
                      {notice.title}
                    </h3>

                    <p className="
                      mt-4
                      text-base
                      leading-7
                      text-gray-600
                    ">
                      {notice.description}
                    </p>

                  </div>

                  <div className="
                    flex
                    items-start
                    gap-2
                    md:gap-3
                  ">

                    <button
                      type="button"
                      disabled={saving}
                      onClick={() =>
                        handleEdit(notice)
                      }
                      className="
                        rounded-full
                        border
                        border-gray-200
                        px-4
                        py-2
                        text-sm
                        text-gray-700
                        transition-all
                        hover:border-red-200
                        hover:bg-red-50
                        hover:text-red-900
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      disabled={saving}
                      onClick={() =>
                        handleDelete(notice._id)
                      }
                      className="
                        rounded-full
                        border
                        border-gray-200
                        px-4
                        py-2
                        text-sm
                        text-gray-500
                        transition-all
                        hover:border-red-200
                        hover:bg-red-50
                        hover:text-red-700
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </article>
            ))}

            <div className="
              mt-2
              border-t
              border-gray-300
            " />

          </div>
        )}

      </div>

    </main>
  );
}