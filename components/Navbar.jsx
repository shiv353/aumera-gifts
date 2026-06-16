"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { brand, LogoIcon, navLinks } from "@/data/siteContent";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveLink(`#${visible.target.id}`);
        }
      },
      {
        rootMargin: "-35% 0px -50% 0px",
        threshold: [0.15, 0.35, 0.6]
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", isOpen);
    return () => document.body.classList.remove("menu-open");
  }, [isOpen]);

  const handleNavigate = () => setIsOpen(false);

  return (
    <header className={`site-header ${isScrolled ? "site-header--scrolled" : ""}`}>
      <nav className="navbar" aria-label="Primary navigation">
        <a className="brand-lockup" href="#home" onClick={handleNavigate}>
          <span className="brand-mark" aria-hidden="true">
            <LogoIcon size={22} strokeWidth={1.8} />
          </span>
          <span className="brand-text">{brand.name}</span>
        </a>

        <button
          className="nav-toggle"
          type="button"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="primary-menu"
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div id="primary-menu" className={`nav-links ${isOpen ? "nav-links--open" : ""}`}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              className={activeLink === link.href ? "nav-link nav-link--active" : "nav-link"}
              href={link.href}
              onClick={handleNavigate}
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
