
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import ProfileDropdown from "./ProfileDropdown";
import {
  Menu,
  X,
  BookOpen,
  LogOut,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Testimonials", href: "#testimonials" },
  ];

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when clicking a link
  const handleNavClick = () => {
    setIsOpen(false);
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (profileDropdownOpen) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [profileDropdownOpen]);

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* ================= NAVBAR ================= */}

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/85 shadow-lg shadow-violet-500/5 backdrop-blur-xl"
            : "bg-white/60 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div
            className={`flex h-[72px] items-center justify-between transition-all duration-300 ${
              scrolled ? "h-16" : "h-[72px]"
            }`}
          >
            {/* ================= LOGO ================= */}

            <a
              href="/"
              className="group flex items-center gap-3"
              onClick={handleNavClick}
            >
              {/* Logo icon */}
              <div className="relative">
                {/* Glow */}
                <div className="absolute inset-0 rounded-xl bg-violet-500/30 blur-md transition-all duration-300 group-hover:bg-violet-500/50" />

                {/* Icon */}
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-500 shadow-lg shadow-violet-500/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-3deg] group-hover:shadow-violet-500/40">
                  <BookOpen className="h-5 w-5 text-white" />

                  {/* Small sparkle */}
                  <Sparkles className="absolute -right-1 -top-1 h-3.5 w-3.5 text-yellow-300 animate-pulse" />
                </div>
              </div>

              {/* Brand */}
              <div className="flex flex-col">
                <span className="text-[17px] font-extrabold tracking-[-0.02em] text-gray-950 sm:text-lg">
                  AI eBook Creator
                </span>

                <span className="hidden text-[9px] font-medium uppercase tracking-[0.18em] text-violet-500 sm:block">
                  Create • Write • Publish
                </span>
              </div>
            </a>

            {/* ================= DESKTOP NAVIGATION ================= */}

            <nav className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="group relative rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-600 transition-all duration-200 hover:bg-violet-50/70 hover:text-violet-700"
                >
                  {link.name}

                  {/* Hover underline */}
                  <span className="absolute bottom-1.5 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 transition-all duration-300 group-hover:w-5" />
                </a>
              ))}
            </nav>

            {/* ================= DESKTOP ACTIONS ================= */}

            <div className="hidden items-center gap-3 lg:flex">
              {isAuthenticated ? (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="relative"
                >
                  <ProfileDropdown
                    isOpen={profileDropdownOpen}
                    onToggle={() =>
                      setProfileDropdownOpen(!profileDropdownOpen)
                    }
                    avatar={user?.avatar || ""}
                    companyName={user?.name || ""}
                    email={user?.email || ""}
                    userRole={user?.role || ""}
                    onLogout={() => logout()}
                  />
                </div>
              ) : (
                <>
                  {/* Login */}
                  <a
                    href="/login"
                    className="rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-600 transition-all duration-200 hover:bg-gray-100 hover:text-gray-950"
                  >
                    Login
                  </a>

                  {/* Get Started */}
                  <a
                    href="/signup"
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gray-950 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/20"
                  >
                    {/* Shine */}
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                    <Sparkles className="relative h-4 w-4 text-violet-300" />

                    <span className="relative">Get Started</span>

                    <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </>
              )}
            </div>

            {/* ================= MOBILE BUTTON ================= */}

            <button
              type="button"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white/70 text-gray-700 shadow-sm transition-all duration-200 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600 lg:hidden"
            >
              <span className="transition-transform duration-300">
                {isOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </span>
            </button>
          </div>
        </div>

        {/* ================= MOBILE MENU ================= */}

        <div
          className={`overflow-hidden border-t border-gray-100/80 bg-white/95 backdrop-blur-xl transition-all duration-300 lg:hidden ${
            isOpen
              ? "max-h-[600px] opacity-100"
              : "max-h-0 border-transparent opacity-0"
          }`}
        >
          <div className="mx-auto max-w-7xl px-5 pb-6 pt-4 sm:px-6">

            {/* Navigation */}
            <nav className="space-y-1">
              {navLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={handleNavClick}
                  className="mobile-nav-item flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-violet-50 hover:text-violet-700"
                  style={{
                    animationDelay: `${index * 70}ms`,
                  }}
                >
                  <span>{link.name}</span>

                  <ArrowRight className="h-4 w-4 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100" />
                </a>
              ))}
            </nav>

            {/* Divider */}
            <div className="my-4 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            {/* ================= MOBILE AUTH ================= */}

            {isAuthenticated ? (
              <div className="space-y-4">

                {/* User */}
                <div className="rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-purple-50 p-4">
                  <div className="flex items-center gap-3">

                    {/* Avatar */}
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user?.name || "User"}
                        className="h-11 w-11 rounded-xl object-cover shadow-sm"
                      />
                    ) : (
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 shadow-lg shadow-violet-500/20">
                        <span className="text-sm font-bold text-white">
                          {user?.name?.charAt(0)?.toUpperCase() || "U"}
                        </span>
                      </div>
                    )}

                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-gray-900">
                        {user?.name || "User"}
                      </p>

                      <p className="truncate text-xs text-gray-500">
                        {user?.email || ""}
                      </p>

                      {user?.role && (
                        <span className="mt-1 inline-block text-[10px] font-semibold uppercase tracking-wider text-violet-600">
                          {user.role}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Logout */}
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition-all duration-200 hover:bg-red-100"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="space-y-2">

                {/* Login */}
                <a
                  href="/login"
                  onClick={handleNavClick}
                  className="block rounded-xl border border-gray-200 px-4 py-3 text-center text-sm font-semibold text-gray-700 transition-all duration-200 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
                >
                  Login
                </a>

                {/* Get Started */}
                <a
                  href="/signup"
                  onClick={handleNavClick}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/10 transition-all duration-200 hover:bg-violet-700"
                >
                  <Sparkles className="h-4 w-4 text-violet-300" />
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ================= NAVBAR SPACER ================= */}

      <div className="h-[72px] lg:h-[72px]" />

      {/* ================= ANIMATIONS ================= */}

      <style>{`
        @keyframes mobile-menu-item {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .mobile-nav-item {
          animation: mobile-menu-item 0.35s ease-out forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;

