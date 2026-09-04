
import { FEATURES } from "../../utils/data";
import { ArrowUpRight, Sparkles } from "lucide-react";

const Features = () => {
    return (
        <section
            id="features"
            className="relative overflow-hidden bg-white py-24 lg:py-32"
        >
            {/* =====================================================
                BACKGROUND
            ====================================================== */}

            {/* Soft gradient */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(124,58,237,0.08),transparent_25%),radial-gradient(circle_at_90%_70%,rgba(168,85,247,0.08),transparent_25%)]" />

            {/* Grid */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage:
                        "linear-gradient(#7c3aed 1px, transparent 1px), linear-gradient(90deg, #7c3aed 1px, transparent 1px)",
                    backgroundSize: "50px 50px",
                }}
            />

            {/* Floating blobs */}
            <div className="absolute -left-32 top-40 h-72 w-72 rounded-full bg-violet-200/30 blur-3xl" />
            <div className="absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-purple-200/30 blur-3xl" />

            {/* =====================================================
                CONTENT
            ====================================================== */}

            <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

                {/* =================================================
                    SECTION HEADER
                ================================================== */}

                <div className="mx-auto mb-16 max-w-3xl text-center lg:mb-20">

                    {/* Badge */}
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50/70 px-4 py-2 shadow-sm backdrop-blur-sm">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-500 opacity-60" />
                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-violet-600" />
                        </span>

                        <Sparkles className="h-4 w-4 text-violet-600" />

                        <span className="text-sm font-semibold text-violet-900">
                            Powerful Features
                        </span>
                    </div>

                    {/* Heading */}
                    <h2 className="text-4xl font-black tracking-[-0.035em] text-gray-950 sm:text-5xl lg:text-6xl">
                        Everything you need to

                        <span className="mt-2 block bg-gradient-to-r from-violet-700 via-purple-600 to-fuchsia-500 bg-clip-text text-transparent">
                            create something amazing.
                        </span>
                    </h2>

                    {/* Description */}
                    <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
                        From your first idea to a polished eBook, AI eBook
                        Creator gives you everything you need to write,
                        design, and publish without the complexity.
                    </p>
                </div>

                {/* =================================================
                    FEATURE GRID
                ================================================== */}

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {FEATURES.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={index}
                                className="feature-card group relative overflow-hidden rounded-3xl border border-gray-200/80 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-violet-200 hover:shadow-[0_25px_60px_-20px_rgba(124,58,237,0.25)]"
                                style={{
                                    animationDelay: `${index * 100} ms`,
                                }}
                            >
                                {/* Hover gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-violet-50/0 via-white to-purple-50/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                                {/* Decorative glow */}
                                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-violet-500/10 blur-2xl transition-all duration-500 group-hover:bg-violet-500/20" />

                                {/* Number */}
                                <div className="absolute right-6 top-6">
                                    <span className="text-xs font-bold tracking-widest text-gray-200 transition-colors duration-300 group-hover:text-violet-200">
                                        0{index + 1}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="relative">

                                    {/* Icon */}
                                    <div
                                        className={`relative mb - 7 flex h - 16 w - 16 items - center justify - center overflow - hidden rounded - 2xl bg - gradient - to - br ${feature.gradient} shadow - lg transition - all duration - 500 group - hover: scale - 110 group - hover: rotate - 3 group - hover: shadow - xl`}
                                    >
                                        {/* shine */}
                                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                                        <Icon className="relative h-7 w-7 text-white" />
                                    </div>

                                    {/* Title */}
                                    <h3 className="mb-3 text-xl font-extrabold tracking-tight text-gray-900 transition-colors duration-300 group-hover:text-violet-800">
                                        {feature.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm leading-6 text-gray-600">
                                        {feature.description}
                                    </p>

                                    {/* Bottom action */}
                                    <div className="mt-7 flex items-center">
                                        <span className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 transition-all duration-300 group-hover:text-violet-600">
                                            Explore feature

                                            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 transition-all duration-300 group-hover:border-violet-200 group-hover:bg-violet-600 group-hover:text-white">
                                                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-45" />
                                            </span>
                                        </span>
                                    </div>
                                </div>

                                {/* Bottom accent */}
                                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-violet-600 to-fuchsia-500 transition-all duration-500 group-hover:w-full" />
                            </div>
                        );
                    })}
                </div>

                {/* =================================================
                    BOTTOM CTA
                ================================================== */}

                <div className="mt-16 flex justify-center lg:mt-20">
                    <div className="group relative overflow-hidden rounded-3xl border border-violet-100 bg-gradient-to-r from-violet-50 via-white to-purple-50 px-6 py-5 shadow-sm sm:px-8">

                        {/* Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/0 via-violet-500/5 to-purple-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                        <div className="relative flex flex-col items-center gap-4 sm:flex-row">

                            <div className="text-center sm:text-left">
                                <p className="font-bold text-gray-900">
                                    Ready to bring your idea to life?
                                </p>

                                <p className="mt-1 text-sm text-gray-500">
                                    Create your first AI-powered eBook today.
                                </p>
                            </div>

                            <a
                                href="/login"
                                className="group/button inline-flex items-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-violet-500/20"
                            >
                                Start Creating

                                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/button:rotate-45" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* =====================================================
                ANIMATIONS
            ====================================================== */}

            <style>{`
@keyframes feature - fade - up {
                    from {
        opacity: 0;
        transform: translateY(25px);
    }

                    to {
        opacity: 1;
        transform: translateY(0);
    }
}

                .feature - card {
    opacity: 0;
    animation: feature - fade - up 0.7s ease - out forwards;
}

@media(prefers - reduced - motion: reduce) {
                    .feature - card {
        opacity: 1;
        animation: none;
    }

                    *,
                    *:: before,
                    *::after {
        animation - duration: 0.01ms!important;
        animation - iteration - count: 1!important;
        transition - duration: 0.01ms!important;
    }
}
`}</style>
        </section>
    );
};

export default Features;

