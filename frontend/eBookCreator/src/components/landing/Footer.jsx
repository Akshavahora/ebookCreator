
import {
    ArrowUpRight,
    BookOpen,
    Mail,
    Sparkles,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
    const productLinks = [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "Templates", href: "#templates" },
    ];

    const companyLinks = [
        { label: "About", href: "/about" },
        { label: "Contact", href: "#contact" },
        { label: "Blog", href: "#blog" },
    ];

    const legalLinks = [
        { label: "Privacy", href: "#privacy" },
        { label: "Terms", href: "#terms" },
    ];

    const socials = [
        {
            icon: FaTwitter,
            href: "https://twitter.com",
            label: "Twitter",
        },
        {
            icon: FaLinkedin,
            href: "https://linkedin.com",
            label: "LinkedIn",
        },
        {
            icon: FaGithub,
            href: "https://github.com",
            label: "GitHub",
        },
    ];

    return (
        <footer className="relative overflow-hidden bg-[#08070d] text-white">
            {/* Background Glow */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[130px]" />

                <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-fuchsia-600/10 blur-[120px]" />

                <div className="absolute right-0 top-1/3 h-[350px] w-[350px] rounded-full bg-indigo-600/10 blur-[120px]" />

                {/* Grid */}
                <div
                    className="absolute inset-0 opacity-[0.035]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
                        backgroundSize: "50px 50px",
                    }}
                />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
                {/* Top CTA */}
                <div className="border-b border-white/[0.08] py-16 sm:py-20">
                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] px-6 py-10 backdrop-blur-xl sm:px-10 lg:px-14">
                        {/* CTA Glow */}
                        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-600/20 blur-3xl" />
                        <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-fuchsia-600/10 blur-3xl" />

                        <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                            <div className="max-w-2xl">
                                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1.5 text-xs font-medium text-violet-300">
                                    <Sparkles className="h-3.5 w-3.5" />
                                    Create something remarkable
                                </div>

                                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                    Your next great book
                                    <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-300 bg-clip-text text-transparent">
                                        starts with an idea.
                                    </span>
                                </h2>

                                <p className="mt-4 max-w-xl text-sm leading-6 text-gray-400 sm:text-base">
                                    Turn your ideas into beautiful, professionally designed
                                    eBooks with the power of AI.
                                </p>
                            </div>

                            <a
                                href="#"
                                className="group inline-flex shrink-0 items-center gap-3 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-gray-950 shadow-xl shadow-violet-950/20 transition-all duration-300 hover:-translate-y-1 hover:bg-violet-50 hover:shadow-violet-500/20"
                            >
                                Start Creating
                                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Main Footer */}
                <div className="py-14 sm:py-16">
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
                        {/* Brand */}
                        <div className="md:col-span-5 lg:col-span-6">
                            <a href="/" className="group inline-flex items-center gap-3">
                                <div className="relative">
                                    <div className="absolute inset-0 rounded-xl bg-violet-600/40 blur-lg transition-all duration-300 group-hover:bg-violet-500/60" />

                                    <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-lg shadow-violet-900/30 transition-transform duration-300 group-hover:scale-105">
                                        <BookOpen className="h-5 w-5 text-white" />

                                        <Sparkles className="absolute -right-1 -top-1 h-3.5 w-3.5 text-violet-200" />
                                    </div>
                                </div>

                                <span className="text-xl font-bold tracking-tight">
                                    eBook Creator
                                </span>
                            </a>

                            <p className="mt-6 max-w-md text-sm leading-7 text-gray-400 sm:text-base">
                                Create, design, and publish stunning eBooks with the power of
                                AI. Bring your ideas to life without the complexity.
                            </p>

                            {/* Social Links */}
                            <div className="mt-7 flex items-center gap-3">
                                {socials.map((social) => {
                                    const Icon = social.icon;

                                    return (
                                        <a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={social.label}
                                            className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-violet-300"
                                        >
                                            <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                                        </a>
                                    );
                                })}
                            </div>

                            {/* Mini Trust */}
                            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-gray-500">
                                <span className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                    AI-powered
                                </span>

                                <span className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                                    Creator focused
                                </span>

                                <span className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
                                    Easy to use
                                </span>
                            </div>
                        </div>

                        {/* Links */}
                        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7 lg:col-span-6">
                            {/* Product */}
                            <div>
                                <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                                    Product
                                </h3>

                                <ul className="space-y-3.5">
                                    {productLinks.map((link) => (
                                        <li key={link.label}>
                                            <a
                                                href={link.href}
                                                className="group inline-flex items-center gap-1 text-sm text-gray-500 transition-colors duration-200 hover:text-violet-300"
                                            >
                                                {link.label}

                                                <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Company */}
                            <div>
                                <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                                    Company
                                </h3>

                                <ul className="space-y-3.5">
                                    {companyLinks.map((link) => (
                                        <li key={link.label}>
                                            <a
                                                href={link.href}
                                                className="group inline-flex items-center gap-1 text-sm text-gray-500 transition-colors duration-200 hover:text-violet-300"
                                            >
                                                {link.label}

                                                <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Legal */}
                            <div>
                                <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                                    Legal
                                </h3>

                                <ul className="space-y-3.5">
                                    {legalLinks.map((link) => (
                                        <li key={link.label}>
                                            <a
                                                href={link.href}
                                                className="group inline-flex items-center gap-1 text-sm text-gray-500 transition-colors duration-200 hover:text-violet-300"
                                            >
                                                {link.label}

                                                <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                                            </a>
                                        </li>
                                    ))}
                                </ul>

                                {/* Contact */}
                                <a
                                    href="mailto:hello@ebookcreator.com"
                                    className="mt-6 inline-flex items-center gap-2 text-xs text-gray-500 transition-colors hover:text-violet-300"
                                >
                                    <Mail className="h-3.5 w-3.5" />
                                    Get in touch
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/[0.08] py-7">
                    <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
                        <p className="text-xs text-gray-500 sm:text-sm">
                            © {new Date().getFullYear()} eBook Creator. All rights reserved.
                        </p>

                        <div className="flex items-center gap-2 text-xs text-gray-500 sm:text-sm">
                            Made with
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-violet-500/10 text-violet-400">
                                ♥
                            </span>
                            for creators
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

