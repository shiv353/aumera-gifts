import { brand, footerLinks, LogoIcon, socialLinks } from "@/data/siteContent";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <a className="brand-lockup footer-brand" href="#home">
          <span className="brand-mark" aria-hidden="true">
            <LogoIcon size={22} strokeWidth={1.8} />
          </span>
          <span className="brand-text">{brand.name}</span>
        </a>

        <nav className="footer-links" aria-label="Footer navigation">
          {footerLinks.map((link) => (
            <a href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="social-links" aria-label="Social media links">
          {socialLinks.map((link) => {
            const Icon = link.icon;

            return (
              <a
                href={link.href}
                key={link.label}
                aria-label={link.label}
                target="_blank"
                rel="noreferrer"
              >
                <Icon size={19} strokeWidth={1.8} />
              </a>
            );
          })}
        </div>

        <p className="copyright">
          © {year} {brand.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
