"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { heroSlides } from "@/data/siteContent";

const AUTOPLAY_MS = 5000;

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeSlide = heroSlides[activeIndex];

  const controls = useMemo(
    () => ({
      previous: () =>
        setActiveIndex((current) =>
          current === 0 ? heroSlides.length - 1 : current - 1
        ),
      next: () =>
        setActiveIndex((current) =>
          current === heroSlides.length - 1 ? 0 : current + 1
        )
    }),
    []
  );

  useEffect(() => {
    if (isPaused) return undefined;

    const interval = window.setInterval(controls.next, AUTOPLAY_MS);
    return () => window.clearInterval(interval);
  }, [controls.next, isPaused]);

  return (
    <section
      id="home"
      className="hero"
      aria-label="Featured gifting highlights"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="hero-slides" aria-live="polite">
        {heroSlides.map((slide, index) => (
          <div
            className={`hero-slide ${index === activeIndex ? "hero-slide--active" : ""}`}
            aria-hidden={index !== activeIndex}
            key={slide.heading}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="hero-image"
            />
          </div>
        ))}
      </div>

      <div className="hero-overlay" />

      <div className="hero-content" key={activeSlide.heading}>
        <p className="eyebrow">{activeSlide.eyebrow}</p>
        <h1>{activeSlide.heading}</h1>
        <p className="hero-description">{activeSlide.description}</p>
        <a className="button button--primary" href={activeSlide.href}>
          {activeSlide.cta}
        </a>
      </div>

      <button
        className="hero-arrow hero-arrow--left"
        type="button"
        aria-label="Show previous hero slide"
        onClick={controls.previous}
      >
        <ChevronLeft size={26} />
      </button>
      <button
        className="hero-arrow hero-arrow--right"
        type="button"
        aria-label="Show next hero slide"
        onClick={controls.next}
      >
        <ChevronRight size={26} />
      </button>

      <div className="hero-dots" aria-label="Hero slide controls">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.heading}
            className={`hero-dot ${index === activeIndex ? "hero-dot--active" : ""}`}
            type="button"
            aria-label={`Show slide ${index + 1}`}
            aria-current={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </section>
  );
}
