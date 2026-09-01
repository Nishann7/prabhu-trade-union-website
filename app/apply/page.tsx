"use client";

import { FormEvent, useState } from "react";

export default function ApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          message: `Membership Application\n\nOccupation: ${formData.get(
            "occupation"
          )}\nWorkplace: ${formData.get(
            "workplace"
          )}\n\n${formData.get("message")}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      setSubmitted(true);
      form.reset();
    } catch (error) {
      console.error(error);
      alert("Unable to submit your application. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="apply-page">
      <section className="apply-hero">
        <div>
          <p className="section-label">MEMBERSHIP</p>

          <h1>
            Stand together.
            <br />
            <span>Make a difference.</span>
          </h1>

          <p>
            Become part of Prabhu Union and join a collective effort
            dedicated to workers&apos; rights, dignity, and welfare.
          </p>
        </div>
      </section>

      <section className="apply-section">
        <div className="apply-container">
          <div className="apply-intro">
            <p className="section-label">JOIN Prabhu Union</p>

            <h2>Membership application</h2>

            <p>
              Fill out the form below and our team will review your
              application and get in touch with you.
            </p>

            <div className="apply-points">
              <div>
                <strong>01</strong>
                <span>Collective representation</span>
              </div>

              <div>
                <strong>02</strong>
                <span>Protection of workers&apos; rights</span>
              </div>

              <div>
                <strong>03</strong>
                <span>Member welfare and support</span>
              </div>
            </div>
          </div>

          <div className="apply-card">
            {submitted ? (
              <div className="apply-success">
                <div className="success-icon">✓</div>

                <p className="section-label">APPLICATION RECEIVED</p>

                <h2>Thank you for applying.</h2>

                <p>
                  Your membership application has been submitted successfully.
                  Our team will contact you after reviewing your information.
                </p>

                <button
                  type="button"
                  className="apply-submit"
                  onClick={() => setSubmitted(false)}
                >
                  Submit another application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="name">Full name *</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="phone">Phone number *</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="98XXXXXXXX"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="email">Email address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                  />
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="occupation">Occupation *</label>
                    <input
                      id="occupation"
                      name="occupation"
                      type="text"
                      required
                      placeholder="Your occupation"
                    />
                  </div>

                  <div className="form-field">
                    <label htmlFor="workplace">Workplace</label>
                    <input
                      id="workplace"
                      name="workplace"
                      type="text"
                      placeholder="Your workplace"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="message">Additional information</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell us anything we should know..."
                  />
                </div>

                <button
                  type="submit"
                  className="apply-submit"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Application →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
