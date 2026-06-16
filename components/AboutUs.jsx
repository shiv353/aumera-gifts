"use client";

import { useEffect, useRef } from "react";
import { about, brand, LogoIcon } from "@/data/siteContent";

export default function AboutUs() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="section about-section reveal-section" ref={sectionRef}>
      <div className="about-shell">
        <div className="about-copy">
          <span className="about-logo" aria-hidden="true">
            <LogoIcon size={34} strokeWidth={1.6} />
          </span>
          <p className="eyebrow">{brand.tagline}</p>
          <h2>{about.heading}</h2>
          <p>{about.description}</p>
          <a className="button button--secondary" href="#products">
            {about.cta}
          </a>
        </div>

        <div className="feature-grid" aria-label="Company values">
          {about.features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article className="feature-card" key={feature.title}>
                <span className="feature-icon" aria-hidden="true">
                  <Icon size={24} strokeWidth={1.7} />
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
