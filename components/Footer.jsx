import { brand, footerLinks, LogoIcon, socialLinks,footerPolicies } from "@/data/siteContent";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-branding">
          <a className="brand-lockup footer-brand" href="#home">
            <span className="brand-mark" aria-hidden="true">
              <LogoIcon size={22} strokeWidth={1.8} />
            </span>
            <span className="brand-text">{brand.name}</span>
          </a>

          <p className="footer-description">{brand.tagline}</p>

          <div className="footer-contact">
            <a href="tel:+918976449556">+91-89764-49556</a>
            <a href="mailto:contact@thegiftstudio.com">contact@thegiftstudio.com</a>
          </div>
        </div>

        <div className="footer-right">
          <div className="footer-column">
            <h3>Policies</h3>
            <div className="footer-links">
              {footerPolicies.map((link) => (
                <a href={link.href} key={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-column footer-social-column">
            <h3>Follow us</h3>
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
                    <Icon size={18} strokeWidth={1.8} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="copyright">
          © {year} {brand.name}. All rights reserved.
        </p>
      </div>
      {/* </div> */}
    </footer>
  );
}
