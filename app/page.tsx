"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Notice = {
  _id: string;
  title: string;
  description: string;
  date: string;
  category?: string;
  important?: boolean;
};

export default function HomePage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNotices = async () => {
      try {
        setLoading(true);

        const response = await fetch("/api/notices", {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch notices");
        }

        const data = await response.json();

        console.log("HOME NOTICES API:", data);

        // Your API returns:
        // {
        //   success: true,
        //   notices: [...]
        // }

        if (data.success && Array.isArray(data.notices)) {
          setNotices(data.notices.slice(0, 3));
        } else {
          setNotices([]);
        }
      } catch (error) {
        console.error("Failed to load home notices:", error);
        setNotices([]);
      } finally {
        setLoading(false);
      }
    };

    loadNotices();
  }, []);

  return (
    <main className="home-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="hero-section">

        <div className="hero-overlay" />

        <div className="hero-content">

          <div className="hero-badge">
            Prabhu Union
          </div>

          <h1>
            Unity, Rights
            <br />
            <span>& Welfare</span>
          </h1>

          <p>
            Working together to protect workers&apos; rights,
            promote dignity, and build a stronger future for
            every member.
          </p>

          <div className="hero-buttons">

            <Link
              href="/about"
              className="primary-button"
            >
              About Our Union
            </Link>

            <Link
              href="/contact"
              className="secondary-button"
            >
              Contact Us
            </Link>

          </div>

        </div>


        {/* HERO BOTTOM */}

        <div className="hero-bottom">

          <div>
            <span className="hero-bottom-icon">
              🛡️
            </span>

            <span>
              Workers&apos; Rights
            </span>
          </div>

          <div>
            <span className="hero-bottom-icon">
              🤝
            </span>

            <span>
              Member Welfare
            </span>
          </div>

          <div>
            <span className="hero-bottom-icon">
              ✊
            </span>

            <span>
              Collective Strength
            </span>
          </div>

        </div>

      </section>


      {/* =====================================================
          INTRODUCTION
      ===================================================== */}

      <section className="intro-section">

        <div className="section-container intro-grid">

          <div>

            <p className="section-label">
              WHO WE ARE
            </p>

            <h2>
              Standing together for
              <br />
              <span>
                better workplaces.
              </span>
            </h2>

          </div>


          <div className="intro-text">

            <p>
              Prabhu Union is committed to
              representing and supporting workers through
              unity, fairness, and collective action.
            </p>

            <p>
              We believe every worker deserves respect,
              a safe working environment, fair treatment,
              and the opportunity to build a better future.
            </p>

            <Link
              href="/about"
              className="text-link"
            >
              Discover our mission →
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          VALUES
      ===================================================== */}

      <section className="values-section">

        <div className="section-container">

          <div className="section-heading">

            <p className="section-label">
              OUR VALUES
            </p>

            <h2>
              What we stand for
            </h2>

          </div>


          <div className="values-grid">

            {/* UNITY */}

            <div className="value-card">

              <div className="value-icon">
                🤝
              </div>

              <h3>
                Unity
              </h3>

              <p>
                Bringing workers together with a shared
                voice and common purpose.
              </p>

              <span className="value-arrow">
                →
              </span>

            </div>


            {/* RIGHTS */}

            <div className="value-card">

              <div className="value-icon">
                ⚖️
              </div>

              <h3>
                Rights
              </h3>

              <p>
                Protecting the rights, dignity, and
                interests of every worker.
              </p>

              <span className="value-arrow">
                →
              </span>

            </div>


            {/* WELFARE */}

            <div className="value-card">

              <div className="value-icon">
                ❤️
              </div>

              <h3>
                Welfare
              </h3>

              <p>
                Supporting the wellbeing and long-term
                welfare of our members.
              </p>

              <span className="value-arrow">
                →
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          NOTICES
      ===================================================== */}

      <section className="notices-section">

        <div className="section-container">


          {/* NOTICE HEADER */}

          <div className="section-heading notices-heading">

            <div>

              <p className="section-label">
                LATEST UPDATES
              </p>

              <h2>
                Union notices
              </h2>

            </div>

            <Link
              href="/notices"
              className="outline-button"
            >
              View all notices
            </Link>

          </div>


          {/* =================================================
              LOADING
          ================================================= */}

          {loading && (

            <div className="notice-loading">

              <div className="notice-spinner" />

              <span>
                Loading latest notices...
              </span>

            </div>

          )}


          {/* =================================================
              EMPTY
          ================================================= */}

          {!loading &&
            notices.length === 0 && (

              <div className="notice-empty">

                <div className="notice-empty-icon">
                  📢
                </div>

                <h3>
                  No notices have been published yet.
                </h3>

                <p>
                  New union announcements and important
                  updates will appear here.
                </p>

                <Link
                  href="/notices"
                  className="notice-empty-link"
                >
                  Visit Notices →
                </Link>

              </div>

            )}


          {/* =================================================
              NOTICE CARDS
          ================================================= */}

          {!loading &&
            notices.length > 0 && (

              <div className="notice-grid">

                {notices.map((notice) => (

                  <article
                    className={`notice-card ${
                      notice.important
                        ? "notice-important"
                        : ""
                    }`}
                    key={notice._id}
                  >

                    {/* TOP */}

                    <div className="notice-top">

                      <div className="notice-date">

                        {new Date(
                          notice.date
                        ).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}

                      </div>


                      {notice.category && (

                        <span className="notice-category">
                          {notice.category}
                        </span>

                      )}

                    </div>


                    {/* TITLE */}

                    <h3>
                      {notice.title}
                    </h3>


                    {/* DESCRIPTION */}

                    <p>
                      {notice.description}
                    </p>


                    {/* LINK */}

                    <Link
                      href="/notices"
                      className="notice-link"
                    >
                      Read notice →
                    </Link>

                  </article>

                ))}

              </div>

            )}

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="cta-section">

        <div className="cta-content">

          <p className="section-label">
            GET INVOLVED
          </p>

          <h2>
            Your voice is
            <br />
            <span>
              stronger together.
            </span>
          </h2>

          <p>
            Connect with Prabhu Union, learn about
            our work, or reach out to us for support.
          </p>

          <div className="hero-buttons">

            <Link
              href="/apply"
              className="primary-button"
            >
              Join the Union
            </Link>

            <Link
              href="/contact"
              className="secondary-button"
            >
              Get in Touch
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}
