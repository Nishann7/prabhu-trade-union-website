"use client";

import {
  Users,
  ShieldCheck,
  Handshake,
  Award,
  Building2,
  Target,
  Eye,
  CalendarDays,
  FileCheck,
  MapPin,
  BriefcaseBusiness,
} from "lucide-react";

const stats = [
  {
    value: "500+",
    label: "Members",
    icon: Users,
  },
  {
    value: "15+",
    label: "Years of Service",
    icon: CalendarDays,
  },
  {
    value: "120+",
    label: "Programs Conducted",
    icon: BriefcaseBusiness,
  },
  {
    value: "12",
    label: "Committee Members",
    icon: Users,
  },
];

const values = [
  {
    icon: Users,
    title: "Unity",
    description:
      "We believe collective strength is the foundation of workers' welfare and progress.",
  },
  {
    icon: ShieldCheck,
    title: "Rights Protection",
    description:
      "We work to safeguard the professional and legal rights of our members.",
  },
  {
    icon: Handshake,
    title: "Welfare",
    description:
      "Member welfare, support, and solidarity remain at the center of our activities.",
  },
  {
    icon: Award,
    title: "Integrity",
    description:
      "Transparency, accountability, and ethical leadership guide our organization.",
  },
];

const highlights = [
  "General assembly meetings",
  "Executive committee meetings",
  "Welfare and support programs",
  "Training and awareness sessions",
  "Community outreach activities",
  "Member coordination programs",
];

export default function AboutPage() {
  return (
    <main className="about-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="about-hero">
        <div className="about-container about-hero-inner">

          <div className="about-hero-content">
            <p className="about-eyebrow">
              ABOUT Prabhu Union
            </p>

            <h1>
              Working together for
              <span> dignity, rights & welfare.</span>
            </h1>

            <p className="about-hero-description">
              Prabhu Union is committed to protecting workers&apos;
              rights, promoting welfare, and building a stronger professional
              community through unity and collective action.
            </p>
          </div>

          <div className="about-hero-mark">
            <div className="about-hero-icon">
              <Building2 size={42} strokeWidth={1.5} />
            </div>

            <span>UNITY</span>
            <span>RIGHTS</span>
            <span>WELFARE</span>
          </div>

        </div>
      </section>


      {/* =====================================================
          HISTORY
      ===================================================== */}

      <section className="about-history">
        <div className="about-container history-grid">

          <div className="history-content">

            <p className="about-section-label">
              OUR HISTORY
            </p>

            <h2>
              A trusted voice for
              <span> workers and members.</span>
            </h2>

            <div className="history-text">

              <p>
                Established with the goal of representing and supporting its
                members, Prabhu Union has steadily grown into a
                respected organization that advocates for fair treatment,
                professional dignity, and collective welfare.
              </p>

              <p>
                Over the years, the union has organized meetings, awareness
                programs, welfare initiatives, training sessions, and
                community activities that strengthen solidarity among members.
              </p>

              <p>
                Today, we continue to work closely with members, stakeholders,
                and the wider community to create opportunities for growth,
                security, and social well-being.
              </p>

            </div>

          </div>


          {/* Organization Information */}

          <div className="about-info-card">

            <div className="about-info-card-header">
              <span>ORGANIZATION</span>

              <div className="about-info-icon">
                <Building2 size={20} />
              </div>
            </div>


            <div className="about-info-item">
              <div className="about-info-item-icon">
                <CalendarDays size={18} />
              </div>

              <div>
                <span>Established</span>
                <strong>Add official establishment year</strong>
              </div>
            </div>


            <div className="about-info-item">
              <div className="about-info-item-icon">
                <FileCheck size={18} />
              </div>

              <div>
                <span>Registration</span>
                <strong>Add official registration number</strong>
              </div>
            </div>


            <div className="about-info-item">
              <div className="about-info-item-icon">
                <MapPin size={18} />
              </div>

              <div>
                <span>Head Office</span>
                <strong>Kathmandu, Nepal</strong>
              </div>
            </div>


            <div className="about-info-item">
              <div className="about-info-item-icon">
                <Users size={18} />
              </div>

              <div>
                <span>Service Area</span>
                <strong>Union members and affiliated workers</strong>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          MISSION & VISION
      ===================================================== */}

      <section className="mission-section">

        <div className="about-container">

          <div className="mission-heading">
            <p className="about-section-label">
              OUR PURPOSE
            </p>

            <h2>
              What drives
              <span> our work.</span>
            </h2>
          </div>


          <div className="mission-grid">

            {/* Mission */}

            <div className="mission-card">

              <div className="mission-icon">
                <Target size={28} />
              </div>

              <div>
                <p className="mission-label">
                  OUR MISSION
                </p>

                <h3>
                  Protect. Support. Empower.
                </h3>

                <p>
                  To protect the rights and interests of members, promote
                  welfare and professional development, and foster unity
                  through democratic and transparent representation.
                </p>
              </div>

            </div>


            {/* Vision */}

            <div className="mission-card">

              <div className="mission-icon">
                <Eye size={28} />
              </div>

              <div>
                <p className="mission-label">
                  OUR VISION
                </p>

                <h3>
                  A stronger future for everyone.
                </h3>

                <p>
                  To build a strong, respected, and inclusive union that
                  contributes to social justice, economic security, and
                  sustainable welfare for all members and their families.
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          STATS
      ===================================================== */}

      <section className="about-stats">

        <div className="about-container">

          <div className="stats-grid">

            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div className="about-stat-card" key={stat.label}>

                  <div className="stat-icon">
                    <Icon size={22} />
                  </div>

                  <div>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>

                </div>
              );
            })}

          </div>

        </div>

      </section>


      {/* =====================================================
          CORE VALUES
      ===================================================== */}

      <section className="about-values">

        <div className="about-container">

          <div className="values-heading">

            <div>
              <p className="about-section-label">
                CORE VALUES
              </p>

              <h2>
                Principles that
                <span> guide us.</span>
              </h2>
            </div>

            <p>
              Our work is built around principles that put people,
              fairness, and collective strength first.
            </p>

          </div>


          <div className="about-values-grid">

            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  className="about-value-card"
                  key={value.title}
                >

                  <div className="about-value-top">

                    <div className="about-value-icon">
                      <Icon size={25} strokeWidth={1.8} />
                    </div>

                    <span>0{values.indexOf(value) + 1}</span>

                  </div>

                  <h3>
                    {value.title}
                  </h3>

                  <p>
                    {value.description}
                  </p>

                </div>
              );
            })}

          </div>

        </div>

      </section>


      {/* =====================================================
          HIGHLIGHTS
      ===================================================== */}

      <section className="about-highlights">

        <div className="about-container">

          <div className="highlight-box">

            <div className="highlight-content">

              <p className="about-section-label">
                OFFICE HIGHLIGHTS
              </p>

              <h2>
                What we regularly
                <span> organize.</span>
              </h2>

              <div className="highlight-list">

                {highlights.map((item, index) => (
                  <div
                    className="highlight-item"
                    key={item}
                  >

                    <span>
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p>{item}</p>

                  </div>
                ))}

              </div>

            </div>


            <div className="commitment-box">

              <div className="commitment-icon">
                <Handshake size={30} />
              </div>

              <p className="about-section-label">
                OUR COMMITMENT
              </p>

              <blockquote>
                “Our strength comes from the unity of our members and our
                shared commitment to dignity, fairness, and welfare.”
              </blockquote>

              <div className="commitment-line" />

              <span>
                Prabhu Union
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="about-final">

        <div className="about-final-content">

          <p className="about-section-label">
            TOGETHER WE ARE STRONGER
          </p>

          <h2>
            Building a better future,
            <span> together.</span>
          </h2>

          <p>
            Learn more about our work, become a member, or get in touch
            with Prabhu Union.
          </p>

        </div>

      </section>

    </main>
  );
}
