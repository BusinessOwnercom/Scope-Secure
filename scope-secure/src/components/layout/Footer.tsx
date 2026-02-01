import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/icons/Logo";
import { Facebook, Instagram, Mail } from "lucide-react";
import { CONTACT_URL } from "@/lib/constants";

const footerLinks = {
  company: [
    { label: "About", href: "#" },
    { label: "Patent Info", href: "#" },
    { label: "Contact", href: CONTACT_URL },
  ],
  products: [
    { label: "ScopeSecure Guard", href: "/#configurator" },
    { label: "Ammo Subscription", href: "/products/bullet-subscription" },
    { label: "Heavy Duty Case", href: "/products/heavy-duty-case" },
  ],
  support: [
    { label: "FAQ", href: "#faq" },
    { label: "Shipping", href: "#" },
    { label: "Returns", href: "#" },
    { label: "Warranty", href: "#warranty" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/ScopeSecure/", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/scope_secure/", label: "Instagram" },
  { icon: Mail, href: CONTACT_URL, label: "Contact" },
];

export function Footer() {
  return (
    <footer className="bg-charcoal-deep pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-warm-gray-dark">
              The only patented scope guard that protects your investment AND
              your zero. Made in the USA.
            </p>
          </div>

          {/* Company links */}
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-accent">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-warm-gray-dark transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products links */}
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-accent">
              Products
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-warm-gray-dark transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-accent">
              Support
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-warm-gray-dark transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-accent">
              Connect
            </h3>
            <div className="mt-4 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-warm-gray-dark transition-colors hover:text-accent"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-warm-gray-dark">
              &copy; {new Date().getFullYear()} ScopeSecure. All rights
              reserved. Patented technology.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-xs text-warm-gray-dark transition-colors hover:text-accent"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-xs text-warm-gray-dark transition-colors hover:text-accent"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-xs text-warm-gray-dark transition-colors hover:text-accent"
              >
                Return Policy
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
