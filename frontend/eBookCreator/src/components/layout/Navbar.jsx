import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import ProfileDropdown from "./ProfileDropdown";
import { Menu, X, BookOpen, LogOut } from "lucide-react";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Testimonials", href: "#testimonials" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (profileDropdownOpen) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [profileDropdownOpen]);
  return <header>
    <div className="">
      <div className="">
        { /* Logo */}
        <a href="/" className="">
          <div className="">
            <BookOpen className="" />
          </div>
          <span className="">
            AI eBook Creator
          </span>
        </a>

        { /* Desktop Navigation */ }
        <nav className="">
          {navLinks.map((link) => { 
            <a
              key={link.name}
              href={link.href}
              className=""
            >
              {link.name}
            </a>
          })}
        </nav>

        { /* */}
      </div>
    </div>
  </header>
}

export default Navbar