"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { brand, logoUrl, navLinks } from "@/data/siteContent";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", isOpen);
    return () => document.body.classList.remove("menu-open");
  }, [isOpen]);

  const handleNavigate = () => setIsOpen(false);

  const activeLink = pathname === "/products" ? "/products" : "/";

  return (
    <header className={`site-header ${isScrolled ? "site-header--scrolled" : ""}`}>
      <nav className="navbar" aria-label="Primary navigation">
        <Link className="brand-lockup" href="/" onClick={handleNavigate}>
          <span className="brand-mark" aria-hidden="true">
           <img src={logoUrl} alt="THE AUMERA GIFTS Logo" className="h-8 w-auto" />
          </span>
          <span className="brand-text">{brand.name}</span>
        </Link>

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
            <Link
              key={link.href}
              className={activeLink === link.href ? "nav-link nav-link--active" : "nav-link"}
              href={link.href}
              onClick={handleNavigate}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
