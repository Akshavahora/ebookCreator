
import {
    ArrowRight,
    Sparkles,
    BookOpen,
    Zap,
    Wand2,
    Play,
    Star,
    PenLine,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import HERO_IMG from "../../assets/hero-img.png";

const Hero = () => {
    const { isAuthenticated } = useAuth();
    const heroRef = useRef(null);

    // Subtle mouse movement effect
    useEffect(() => {
        const hero = heroRef.current;

        if (!hero) return;

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;

            const x = (clientX / window.innerWidth - 0.5) * 2;
            const y = (clientY / window.innerHeight - 0.5) * 2;

            hero.style.setProperty("--mouse-x", `${x}`);
            hero.style.setProperty("--mouse-y", `${y}`);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#faf9ff]"
        >
            {/* ================= BACKGROUND ================= */}

            {/* Main gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(124,58,237,0.12),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,0.10),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(99,102,241,0.08),transparent_35%)]" />

            {/* Grid */}
            <div
                className="absolute inset-0 opacity-[0.035]"
                style={{
                    backgroundImage:
                        "linear-gradient(#7c3aed 1px, transparent 1px), linear-gradient(90deg, #7c3aed 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Floating orbs */}
            <div
                className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-violet-400/20 blur-3xl animate-float"
                style={{
                    transform:
                        "translate(calc(var(--mouse-x) * -12px), calc(var(--mouse-y) * -12px))",
                }}
            />

            <div
                className="absolute -right-32 top-40 h-96 w-96 rounded-full bg-purple-400/20 blur-3xl animate-float-delayed"
                style={{
                    transform:
                        "translate(calc(var(--mouse-x) * 15px), calc(var(--mouse-y) * 15px))",
                }}
            />

            <div className="absolute left-1/2 bottom-[-150px] h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-300/10 blur-3xl" />

            {/* ================= CONTENT ================= */}

            <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                <div className="grid min-h-[calc(100vh-80px)] grid-cols-1 items-center gap-14 py-16 lg:grid-cols-2 lg:gap-20 lg:py-20">

                    {/* ================= LEFT ================= */}

                    <div className="max-w-2xl">

                        {/* Badge */}
                        <div className="hero-fade-up mb-7 inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-white/70 px-4 py-2 shadow-sm shadow-violet-100 backdrop-blur-xl">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-500 opacity-75" />
                                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-violet-600" />
                            </span>

                            <Sparkles className="h-4 w-4 text-violet-600" />

                            <span className="text-sm font-semibold text-violet-900">
                                AI-Powered Publishing
                            </span>

                            <span className="hidden h-4 w-px bg-violet-200 sm:block" />

                            <span className="hidden text-xs text-gray-500 sm:block">
                                Create smarter
                            </span>
                        </div>

                        {/* Heading */}
                        <h1 className="hero-fade-up text-5xl font-black leading-[1.02] tracking-[-0.04em] text-gray-950 sm:text-6xl lg:text-[70px]">
                            Your Ideas.
                            <br />

                            <span className="relative inline-block">
                                <span className="bg-gradient-to-r from-violet-700 via-purple-600 to-fuchsia-500 bg-clip-text text-transparent">
                                    Beautiful Books.
                                </span>

                                {/* underline */}
                                <svg
                                    className="absolute -bottom-3 left-0 w-full"
                                    viewBox="0 0 500 25"
                                    fill="none"
                                    preserveAspectRatio="none"
                                >
                                    <path
                                        d="M5 17C120 5 300 25 495 8"
                                        stroke="url(#gradient)"
                                        strokeWidth="5"
                                        strokeLinecap="round"
                                    />

                                    <defs>
                                        <linearGradient
                                            id="gradient"
                                            x1="0"
                                            y1="0"
                                            x2="1"
                                            y2="0"
                                        >
                                            <stop stopColor="#7c3aed" />
                                            <stop offset="1" stopColor="#d946ef" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </span>

                            <br />

                            <span className="text-gray-900">
                                Powered by AI.
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="hero-fade-up mt-8 max-w-xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
                            Turn your ideas into professionally designed eBooks
                            with the power of AI. Write, design, refine, and
                            publish — all from one beautiful workspace.
                        </p>

                        {/* CTA */}
                        <div className="hero-fade-up mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">

                            <Link
                                to={isAuthenticated ? "/dashboard" : "/login"}
                                className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gray-950 px-7 py-4 font-semibold text-white shadow-xl shadow-violet-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-500/30"
                            >
                                {/* animated shine */}
                                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                                <Wand2 className="relative h-5 w-5 text-violet-300" />

                                <span className="relative">
                                    {isAuthenticated
                                        ? "Go to Dashboard"
                                        : "Create Your eBook"}
                                </span>

                                <ArrowRight className="relative h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>

                            <a
                                href="#demo"
                                className="group inline-flex items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white/70 px-6 py-4 font-semibold text-gray-700 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:bg-white hover:text-violet-700"
                            >
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 transition-colors group-hover:bg-violet-600">
                                    <Play className="ml-0.5 h-3.5 w-3.5 fill-violet-600 text-violet-600 group-hover:fill-white group-hover:text-white" />
                                </span>

                                Watch Demo
                            </a>
                        </div>

                        {/* Trust */}
                        <div className="hero-fade-up mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">

                            <div className="flex items-center gap-2">
                                <div className="flex -space-x-2">
                                    <div className="h-8 w-8 rounded-full border-2 border-white bg-violet-300" />
                                    <div className="h-8 w-8 rounded-full border-2 border-white bg-purple-300" />
                                    <div className="h-8 w-8 rounded-full border-2 border-white bg-fuchsia-300" />
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-900 text-[10px] font-bold text-white">
                                        +
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center gap-1">
                                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                                        <span className="text-sm font-bold text-gray-900">
                                            4.9/5
                                        </span>
                                    </div>

                                    <p className="text-xs text-gray-500">
                                        Loved by creators
                                    </p>
                                </div>
                            </div>

                            <div className="hidden h-10 w-px bg-gray-200 sm:block" />

                            <div>
                                <div className="text-xl font-black text-gray-900">
                                    50K+
                                </div>
                                <div className="text-xs text-gray-500">
                                    eBooks created
                                </div>
                            </div>

                            <div className="hidden h-10 w-px bg-gray-200 sm:block" />

                            <div>
                                <div className="text-xl font-black text-gray-900">
                                    10 min
                                </div>
                                <div className="text-xs text-gray-500">
                                    Average creation
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ================= RIGHT ================= */}

                    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">

                        {/* Glow */}
                        <div className="absolute -inset-10 rounded-[4rem] bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-fuchsia-500/10 blur-3xl animate-pulse" />

                        {/* Decorative rings */}
                        <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full border border-violet-300/40 animate-spin-slow" />

                        <div className="absolute -bottom-10 -left-10 h-24 w-24 rounded-3xl border border-purple-300/40 rotate-12 animate-float" />

                        {/* Main card */}
                        <div className="hero-image relative z-10 rounded-[2rem] border border-white/80 bg-white/60 p-2 shadow-[0_30px_100px_-25px_rgba(76,29,149,0.35)] backdrop-blur-xl">

                            <div className="relative overflow-hidden rounded-[1.5rem] bg-gray-100">

                                {/* Browser header */}
                                <div className="absolute left-0 right-0 top-0 z-20 flex h-10 items-center gap-2 border-b border-white/20 bg-gray-950/90 px-4 backdrop-blur-md">
                                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-green-400" />

                                    <div className="mx-auto hidden h-5 w-48 rounded-md bg-white/10 sm:block" />
                                </div>

                                <img
                                    src={HERO_IMG}
                                    alt="AI Ebook Creator Dashboard"
                                    className="mt-10 block h-auto w-full object-cover"
                                />

                                {/* Image overlay */}
                                <div className="absolute inset-0 mt-10 bg-gradient-to-t from-violet-950/10 via-transparent to-transparent pointer-events-none" />
                            </div>
                        </div>

                        {/* ================= FLOATING CARD 1 ================= */}

                        <div className="absolute -right-3 top-10 z-30 animate-float sm:-right-8 sm:top-16">
                            <div className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/90 p-3 shadow-2xl shadow-violet-500/10 backdrop-blur-xl sm:p-4">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 shadow-lg shadow-violet-500/30">
                                    <Zap className="h-5 w-5 text-white" />
                                </div>

                                <div>
                                    <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                                        Processing
                                    </p>

                                    <p className="text-sm font-bold text-gray-900">
                                        AI Generation
                                    </p>

                                    <div className="mt-1 h-1 w-20 overflow-hidden rounded-full bg-gray-100">
                                        <div className="h-full w-3/4 animate-progress rounded-full bg-gradient-to-r from-violet-500 to-purple-500" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ================= FLOATING CARD 2 ================= */}

                        <div className="absolute -bottom-5 -left-3 z-30 animate-float-delayed sm:-bottom-8 sm:-left-8">
                            <div className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/95 p-3 shadow-2xl backdrop-blur-xl sm:p-4">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg shadow-green-500/20">
                                    <BookOpen className="h-5 w-5 text-white" />
                                </div>

                                <div>
                                    <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                                        Completed
                                    </p>

                                    <p className="text-sm font-bold text-gray-900">
                                        247 Pages
                                    </p>
                                </div>

                                <div className="ml-1 flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                                    <span className="text-xs text-green-600">
                                        ✓
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* ================= MINI FLOATING BADGE ================= */}

                        <div className="absolute -bottom-20 right-4 hidden animate-bounce-soft md:block">
                            <div className="flex items-center gap-2 rounded-full border border-violet-100 bg-white/90 px-4 py-2 shadow-lg backdrop-blur-md">
                                <PenLine className="h-4 w-4 text-violet-600" />

                                <span className="text-xs font-semibold text-gray-700">
                                    Writing made effortless
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />

            {/* ================= CUSTOM ANIMATIONS ================= */}

            <style>{`
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-12px);
                    }
                }

                @keyframes float-delayed {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(12px);
                    }
                }

                @keyframes bounce-soft {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-6px);
                    }
                }

                @keyframes spin-slow {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }

                @keyframes progress {
                    0% {
                        width: 20%;
                    }
                    50% {
                        width: 85%;
                    }
                    100% {
                        width: 60%;
                    }
                }

                @keyframes fade-up {
                    from {
                        opacity: 0;
                        transform: translateY(25px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-float {
                    animation: float 5s ease-in-out infinite;
                }

                .animate-float-delayed {
                    animation: float-delayed 6s ease-in-out infinite;
                }

                .animate-bounce-soft {
                    animation: bounce-soft 3s ease-in-out infinite;
                }

                .animate-spin-slow {
                    animation: spin-slow 18s linear infinite;
                }

                .animate-progress {
                    animation: progress 2.5s ease-in-out infinite;
                }

                .hero-fade-up {
                    opacity: 0;
                    animation: fade-up 0.8s ease-out forwards;
                }

                .hero-fade-up:nth-child(1) {
                    animation-delay: 0.1s;
                }

                .hero-fade-up:nth-child(2) {
                    animation-delay: 0.2s;
                }

                .hero-fade-up:nth-child(3) {
                    animation-delay: 0.3s;
                }

                .hero-fade-up:nth-child(4) {
                    animation-delay: 0.4s;
                }

                .hero-fade-up:nth-child(5) {
                    animation-delay: 0.5s;
                }

                .hero-image {
                    opacity: 0;
                    animation: fade-up 1s ease-out 0.3s forwards;
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
        </section>
    );
};

export default Hero;

