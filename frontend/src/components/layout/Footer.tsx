import { Link } from "react-router-dom";
import { Activity, Twitter, Github, Instagram } from "lucide-react";

const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "FAQ", href: "#faq" },
  ],
  Account: [
    { label: "Log in", href: "/login" },
    { label: "Sign up", href: "/signup" },
  ],
  Company: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 py-14">
      <div className="container">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
                <Activity className="h-4 w-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-display text-base font-bold">vfitdiary</span>
            </Link>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 max-w-xs">
              Track. Transform. Become.
            </p>
            <div className="flex gap-3 mt-5">
              {[Twitter, Github, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-primary transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <p className="text-sm font-semibold mb-3.5">{heading}</p>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} vfitdiary. All rights reserved.
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-mono">
            v1.0.0
          </p>
        </div>
      </div>
    </footer>
  );
}
