
import React from "react";
import { TESTIMONIALS } from "../../utils/data";
import {
    Star,
    Quote,
    Sparkles,
    ArrowUpRight,
} from "lucide-react";

const Testimonials = () => {
    return (
        <section
            id="testimonials"
            className="relative overflow-hidden bg-[#faf9ff] py-24 lg:py-32"
        >
            {/* =====================================================
                BACKGROUND
            ====================================================== */}

            {/* Radial gradients */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(124,58,237,0.10),transparent_28%),radial-gradient(circle_at_85%_70%,rgba(168,85,247,0.10),transparent_30%)]" />

            {/* Grid */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage:
                        "linear-gradient(#7c3aed 1px, transparent 1px), linear-gradient(90deg, #7c3aed 1px, transparent 1px)",
                    backgroundSize: "55px 55px",
                }}
            />

            {/* Floating blobs */}
            <div className="absolute -left-40 top-40 h-80 w-80 rounded-full bg-violet-300/20 blur-3xl" />
            <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-purple-300/20 blur-3xl" />

            {/* =====================================================
                CONTENT
            ====================================================== */}

            <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                {/* =================================================
                    HEADER
                ================================================== */}

                <div className="mx-auto mb-16 max-w-3xl text-center lg:mb-20">

                    {/* Badge */}
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-xl">
                        <Star className="h-4 w-4 fill-violet-600 text-violet-600" />

                        <span className="text-sm font-semibold text-violet-900">
                            Creator Stories
                        </span>

                        <Sparkles className="h-3.5 w-3.5 text-violet-400" />
                    </div>

                    {/* Heading */}
                    <h2 className="text-4xl font-black tracking-[-0.035em] text-gray-950 sm:text-5xl lg:text-6xl">
                        Loved by creators

                        <span className="mt-2 block bg-gradient-to-r from-violet-700 via-purple-600 to-fuchsia-500 bg-clip-text text-transparent">
                            everywhere.
                        </span>
                    </h2>

                    {/* Description */}
                    <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
                        Thousands of writers, entrepreneurs, and creators use
                        AI eBook Creator to turn their ideas into books they
                        are proud to share.
                    </p>
                </div>

                {/* =================================================
                    TESTIMONIAL GRID
                ================================================== */}

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {TESTIMONIALS.map((testimonial, index) => (
                        <div
                            key={index}
                            className={`testimonial-card group relative ${index === 1
                                    ? "md:-translate-y-4 lg:-translate-y-5"
                                    : ""
                                }`}
                            style={{
                                animationDelay: `${index * 120}ms`,
                            }}
                        >
                            {/* Glow behind card */}
                            <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-violet-500/0 via-purple-500/0 to-fuchsia-500/0 opacity-0 blur-xl transition-all duration-500 group-hover:from-violet-500/20 group-hover:via-purple-500/10 group-hover:to-fuchsia-500/20 group-hover:opacity-100" />

                            {/* Card */}
                            <div className="relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-gray-200/80 bg-white/85 p-7 shadow-sm backdrop-blur-xl transition-all duration-500 group-hover:-translate-y-2 group-hover:border-violet-200 group-hover:shadow-[0_30px_70px_-25px_rgba(124,58,237,0.30)] sm:p-8">

                                {/* Top gradient line */}
                                <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                {/* Decorative quote */}
                                <div className="absolute -right-5 -top-5 opacity-[0.04] transition-all duration-500 group-hover:scale-110 group-hover:opacity-[0.07]">
                                    <Quote className="h-32 w-32 text-violet-700" />
                                </div>

                                {/* Quote icon */}
                                <div className="relative mb-6 flex items-center justify-between">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 shadow-lg shadow-violet-500/20 transition-transform duration-500 group-hover:rotate-6">
                                        <Quote className="h-5 w-5 text-white" />
                                    </div>

                                    <span className="text-xs font-bold tracking-widest text-gray-200 transition-colors group-hover:text-violet-200">
                                        0{index + 1}
                                    </span>
                                </div>

                                {/* Rating */}
                                <div className="mb-5 flex items-center gap-1">
                                    {[...Array(testimonial.rating)].map(
                                        (_, i) => (
                                            <Star
                                                key={i}
                                                className="h-4 w-4 fill-violet-500 text-violet-500 transition-transform duration-300 group-hover:scale-110"
                                                style={{
                                                    transitionDelay: `${i * 40}ms`,
                                                }}
                                            />
                                        )
                                    )}

                                    <span className="ml-2 text-xs font-semibold text-gray-400">
                                        {testimonial.rating}.0
                                    </span>
                                </div>

                                {/* Quote */}
                                <p className="relative flex-1 text-[15px] leading-7 text-gray-600">
                                    “{testimonial.quote}”
                                </p>

                                {/* Divider */}
                                <div className="my-7 h-px bg-gradient-to-r from-gray-100 via-gray-200 to-transparent" />

                                {/* Author */}
                                <div className="flex items-center gap-4">

                                    {/* Avatar */}
                                    <div className="relative shrink-0">
                                        <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 opacity-20 blur-md transition-opacity duration-300 group-hover:opacity-50" />

                                        <img
                                            src={testimonial.avatar}
                                            alt={testimonial.author}
                                            className="relative h-12 w-12 rounded-full object-cover ring-2 ring-white shadow-md"
                                        />

                                        {/* Verified */}
                                        <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-violet-600">
                                            <span className="text-[9px] font-bold text-white">
                                                ✓
                                            </span>
                                        </div>
                                    </div>

                                    {/* Name */}
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-bold text-gray-900">
                                            {testimonial.author}
                                        </p>

                                        <p className="truncate text-xs text-gray-500">
                                            {testimonial.title}
                                        </p>
                                    </div>

                                    {/* Arrow */}
                                    <div className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-300 transition-all duration-300 group-hover:border-violet-200 group-hover:bg-violet-600 group-hover:text-white">
                                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                                    </div>
                                </div>

                                {/* Bottom gradient */}
                                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-violet-600 to-fuchsia-500 transition-all duration-500 group-hover:w-full" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* =================================================
                    SOCIAL PROOF
                ================================================== */}

                <div className="relative mx-auto mt-20 max-w-5xl lg:mt-24">

                    {/* Glow */}
                    <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-r from-violet-500/10 via-purple-500/5 to-fuchsia-500/10 blur-2xl" />

                    <div className="relative overflow-hidden rounded-[2.5rem] border border-violet-100 bg-white/75 p-7 shadow-sm backdrop-blur-xl sm:p-10">

                        {/* Background decoration */}
                        <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-violet-100/60 blur-3xl" />
                        <div className="absolute -bottom-20 -left-20 h-52 w-52 rounded-full bg-purple-100/60 blur-3xl" />

                        <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-3 sm:divide-x sm:divide-gray-100">

                            {/* Stat 1 */}
                            <div className="text-center">
                                <div className="bg-gradient-to-r from-violet-700 to-purple-600 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl">
                                    50K+
                                </div>

                                <p className="mt-2 text-sm font-medium text-gray-500">
                                    Happy Creators
                                </p>
                            </div>

                            {/* Stat 2 */}
                            <div className="text-center">
                                <div className="flex items-center justify-center gap-2">
                                    <span className="bg-gradient-to-r from-violet-700 to-purple-600 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl">
                                        4.9
                                    </span>

                                    <div className="flex flex-col items-start">
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400"
                                                />
                                            ))}
                                        </div>

                                        <span className="text-[10px] text-gray-400">
                                            average rating
                                        </span>
                                    </div>
                                </div>

                                <p className="mt-2 text-sm font-medium text-gray-500">
                                    Creator Satisfaction
                                </p>
                            </div>

                            {/* Stat 3 */}
                            <div className="text-center">
                                <div className="bg-gradient-to-r from-violet-700 to-purple-600 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl">
                                    100K+
                                </div>

                                <p className="mt-2 text-sm font-medium text-gray-500">
                                    eBooks Created
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* =================================================
                    FINAL MESSAGE
                ================================================== */}

                <div className="mt-14 text-center">
                    <p className="text-sm text-gray-500">
                        Join thousands of creators turning ideas into
                        <span className="font-semibold text-violet-600">
                            {" "}beautiful books.
                        </span>
                    </p>
                </div>
            </div>

            {/* =====================================================
                ANIMATIONS
            ====================================================== */}

            <style>{`
                @keyframes testimonial-fade-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .testimonial-card {
                    opacity: 0;
                    animation: testimonial-fade-up 0.75s ease-out forwards;
                }

                @media (prefers-reduced-motion: reduce) {
                    .testimonial-card {
                        opacity: 1;
                        animation: none;
                    }

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

export default Testimonials;

