"use client";

import { useEffect, useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

type Settings = {
  unionName: string;
  address: string;
  phone: string;
  email: string;
};

export default function ContactPage() {
  // =========================
  // SETTINGS
  // =========================

  const [settings, setSettings] = useState<Settings>({
    unionName: "Prabhu Trade Union",
    address: "Kathmandu, Nepal",
    phone: "+977-9800000000",
    email: "info@prabhutradeunion.np",
  });

  // =========================
  // CONTACT FORM
  // =========================

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  // =========================
  // GET SETTINGS
  // =========================

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/settings", {
          cache: "no-store",
        });

        const data = await response.json();

        if (response.ok && data.settings) {
          setSettings({
            unionName:
              data.settings.unionName ||
              "Prabhu Trade Union",

            address:
              data.settings.address ||
              "Kathmandu, Nepal",

            phone:
              data.settings.phone ||
              "+977-9800000000",

            email:
              data.settings.email ||
              "info@prabhutradeunion.np",
          });
        }
      } catch (error) {
        console.error(
          "Failed to load settings:",
          error
        );
      }
    };

    fetchSettings();
  }, []);

  // =========================
  // SEND CONTACT MESSAGE
  // =========================

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (
      !name.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      alert(
        "Please fill in your name, email and message."
      );

      return;
    }

    try {
      setSending(true);

      const response = await fetch("/api/contact", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          message: message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to send message"
        );
      }

      // =========================
      // RESET FORM
      // =========================

      setName("");
      setEmail("");
      setPhone("");
      setMessage("");

      // Show professional success screen
      setSent(true);

    } catch (error) {
      console.error(
        "Contact form error:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again."
      );

    } finally {
      setSending(false);
    }
  };

  // =========================
  // WHATSAPP
  // =========================

  const whatsappNumber =
    settings.phone.replace(
      /[^0-9]/g,
      ""
    );

  // =========================
  // PAGE
  // =========================

  return (
    <main className="min-h-screen bg-[#f7f5f0]">

      {/* =========================
          HERO
      ========================= */}

      <section className="border-b border-black/5 bg-white/60">

        <div className="mx-auto max-w-6xl px-6 py-24 text-center">

          <p className="text-sm uppercase tracking-[0.28em] text-red-900 mb-4">
            Contact Us
          </p>

          <h1 className="font-serif text-5xl md:text-6xl text-[#171717]">
            We’d love to hear from you
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Reach out to {settings.unionName} for
            membership inquiries, notices, welfare
            support, and official communication.
          </p>

        </div>

      </section>

      {/* =========================
          CONTACT SECTION
      ========================= */}

      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="grid gap-10 lg:grid-cols-2">

          {/* =========================
              OFFICE INFORMATION
          ========================= */}

          <div className="
            rounded-3xl
            border
            border-black/5
            bg-white
            p-8
            shadow-sm
          ">

            <h2 className="
              font-serif
              text-3xl
              text-[#171717]
              mb-8
            ">
              Office Information
            </h2>

            <div className="space-y-6">

              {/* ADDRESS */}

              <div className="flex gap-4">

                <div className="
                  mt-1
                  rounded-xl
                  bg-red-50
                  p-3
                  text-red-900
                ">
                  <MapPin className="h-5 w-5" />
                </div>

                <div>

                  <h3 className="font-semibold text-[#171717]">
                    Address
                  </h3>

                  <p className="
                    mt-1
                    text-gray-600
                    leading-7
                  ">
                    {settings.unionName}
                    <br />
                    {settings.address}
                  </p>

                </div>

              </div>

              {/* PHONE */}

              <div className="flex gap-4">

                <div className="
                  mt-1
                  rounded-xl
                  bg-red-50
                  p-3
                  text-red-900
                ">
                  <Phone className="h-5 w-5" />
                </div>

                <div>

                  <h3 className="font-semibold text-[#171717]">
                    Phone
                  </h3>

                  <p className="mt-1 text-gray-600">
                    {settings.phone}
                  </p>

                </div>

              </div>

              {/* EMAIL */}

              <div className="flex gap-4">

                <div className="
                  mt-1
                  rounded-xl
                  bg-red-50
                  p-3
                  text-red-900
                ">
                  <Mail className="h-5 w-5" />
                </div>

                <div>

                  <h3 className="font-semibold text-[#171717]">
                    Email
                  </h3>

                  <p className="mt-1 text-gray-600">
                    {settings.email}
                  </p>

                </div>

              </div>

              {/* OFFICE HOURS */}

              <div className="flex gap-4">

                <div className="
                  mt-1
                  rounded-xl
                  bg-red-50
                  p-3
                  text-red-900
                ">
                  <Clock className="h-5 w-5" />
                </div>

                <div>

                  <h3 className="font-semibold text-[#171717]">
                    Office Hours
                  </h3>

                  <p className="
                    mt-1
                    text-gray-600
                    leading-7
                  ">
                    Sunday – Friday
                    <br />
                    10:00 AM – 5:00 PM
                  </p>

                </div>

              </div>

            </div>

            {/* =========================
                WHATSAPP
            ========================= */}

            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="
                mt-10
                inline-flex
                items-center
                justify-center
                rounded-full
                bg-green-600
                px-6
                py-3
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-green-500
                hover:-translate-y-0.5
              "
            >
              Chat on WhatsApp
            </a>

          </div>

          {/* =========================
              CONTACT FORM / SUCCESS
          ========================= */}

          <div className="
            rounded-3xl
            border
            border-black/5
            bg-white
            p-8
            shadow-sm
          ">

            {!sent ? (

              <>
                {/* FORM TITLE */}

                <h2 className="
                  font-serif
                  text-3xl
                  text-[#171717]
                  mb-8
                ">
                  Send a Message
                </h2>

                {/* FORM */}

                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >

                  {/* NAME */}

                  <div>

                    <label className="
                      mb-2
                      block
                      text-sm
                      font-medium
                      text-[#171717]
                    ">
                      Full Name
                    </label>

                    <input
                      type="text"
                      value={name}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                      placeholder="Enter your full name"
                      disabled={sending}
                      className="
                        w-full
                        rounded-xl
                        border
                        border-black/10
                        bg-white
                        px-4
                        py-3
                        outline-none
                        transition
                        focus:border-red-900
                        focus:ring-2
                        focus:ring-red-900/10
                        disabled:opacity-50
                      "
                    />

                  </div>

                  {/* EMAIL */}

                  <div>

                    <label className="
                      mb-2
                      block
                      text-sm
                      font-medium
                      text-[#171717]
                    ">
                      Email Address
                    </label>

                    <input
                      type="email"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      placeholder="Enter your email"
                      disabled={sending}
                      className="
                        w-full
                        rounded-xl
                        border
                        border-black/10
                        bg-white
                        px-4
                        py-3
                        outline-none
                        transition
                        focus:border-red-900
                        focus:ring-2
                        focus:ring-red-900/10
                        disabled:opacity-50
                      "
                    />

                  </div>

                  {/* PHONE */}

                  <div>

                    <label className="
                      mb-2
                      block
                      text-sm
                      font-medium
                      text-[#171717]
                    ">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value)
                      }
                      placeholder="Enter your phone number"
                      disabled={sending}
                      className="
                        w-full
                        rounded-xl
                        border
                        border-black/10
                        bg-white
                        px-4
                        py-3
                        outline-none
                        transition
                        focus:border-red-900
                        focus:ring-2
                        focus:ring-red-900/10
                        disabled:opacity-50
                      "
                    />

                  </div>

                  {/* MESSAGE */}

                  <div>

                    <label className="
                      mb-2
                      block
                      text-sm
                      font-medium
                      text-[#171717]
                    ">
                      Message
                    </label>

                    <textarea
                      rows={5}
                      value={message}
                      onChange={(e) =>
                        setMessage(e.target.value)
                      }
                      placeholder="Write your message here..."
                      disabled={sending}
                      className="
                        w-full
                        rounded-xl
                        border
                        border-black/10
                        bg-white
                        px-4
                        py-3
                        outline-none
                        transition
                        focus:border-red-900
                        focus:ring-2
                        focus:ring-red-900/10
                        disabled:opacity-50
                        resize-none
                      "
                    />

                  </div>

                  {/* SUBMIT BUTTON */}

                  <button
                    type="submit"
                    disabled={sending}
                    className="
                      w-full
                      rounded-full
                      bg-red-900
                      px-6
                      py-3
                      text-sm
                      font-semibold
                      text-white
                      transition-all
                      hover:bg-red-800
                      hover:-translate-y-0.5
                      hover:shadow-lg
                      active:scale-[0.98]
                      disabled:opacity-50
                      disabled:cursor-not-allowed
                    "
                  >
                    {sending
                      ? "Sending..."
                      : "Send Message"}
                  </button>

                </form>
              </>

            ) : (

              /* =========================
                 SUCCESS SCREEN
              ========================= */

              <div className="
                min-h-[500px]
                flex
                flex-col
                items-center
                justify-center
                text-center
                px-4
              ">

                {/* SUCCESS ICON */}

                <div className="
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-full
                  bg-green-50
                  text-green-600
                  mb-6
                ">

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-10 w-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>

                </div>

                {/* SMALL LABEL */}

                <p className="
                  text-xs
                  uppercase
                  tracking-[0.25em]
                  text-red-900
                  mb-4
                ">
                  Message Received
                </p>

                {/* HEADING */}

                <h2 className="
                  font-serif
                  text-4xl
                  text-[#171717]
                ">
                  Thank you for reaching out
                </h2>

                {/* DESCRIPTION */}

                <p className="
                  mt-5
                  max-w-md
                  text-gray-600
                  leading-7
                ">
                  Your message has been successfully
                  received by Prabhu Trade Union. Our
                  team will review your message and get
                  back to you as soon as possible.
                </p>

                {/* SEND ANOTHER */}

                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="
                    mt-8
                    rounded-full
                    bg-red-900
                    px-6
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    transition-all
                    hover:bg-red-800
                    hover:-translate-y-0.5
                    hover:shadow-lg
                    active:scale-[0.98]
                  "
                >
                  Send Another Message
                </button>

              </div>

            )}

          </div>

        </div>

        {/* =========================
            GOOGLE MAP
        ========================= */}

        <div className="
          mt-12
          overflow-hidden
          rounded-3xl
          border
          border-black/5
          shadow-sm
        ">

          <iframe
            src="https://www.google.com/maps?q=Kathmandu,Nepal&output=embed"
            width="100%"
            height="420"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Prabhu Trade Union Office Location"
          />

        </div>

      </section>

    </main>
  );
}