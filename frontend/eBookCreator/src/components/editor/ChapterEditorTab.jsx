import { useMemo, useState } from "react";
import {
    Sparkles,
    Type,
    Eye,
    Maximize2,
    Minimize2,
    FileText,
    Clock3,
    WandSparkles,
    PanelLeft,
} from "lucide-react";

import Button from "../ui/Button";
import InputField from "../ui/InputField";
import SimpleMDEditor from "./SimpleMDEditor";

const ChapterEditorTab = ({
    book = {
        title: "Untitled",
        chapters: [
            {
                title: "Chapter 1",
                content: "",
            },
        ],
    },
    selectedChapterIndex = 0,
    onChapterChange = () => { },
    onGenerateChapterContent = () => { },
    isGenerating,
}) => {
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const currentChapter =
        book?.chapters?.[selectedChapterIndex] || null;

    // ==========================================================
    // MARKDOWN PREVIEW
    // ==========================================================

    const formatMarkdown = (content = "") => {
        if (!content.trim()) {
            return `
        <p class="text-gray-500 italic">
          No content yet. Start writing to see the preview.
        </p>
      `;
        }

        let html = content
            // Escape HTML first
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")

            // Headings
            .replace(
                /^### (.*)$/gm,
                '<h3 class="text-xl font-bold mb-4 mt-7 text-white">$1</h3>'
            )
            .replace(
                /^## (.*)$/gm,
                '<h2 class="text-2xl font-bold mb-5 mt-8 text-white">$1</h2>'
            )
            .replace(
                /^# (.*)$/gm,
                '<h1 class="text-3xl font-bold mb-6 mt-9 text-white">$1</h1>'
            )

            // Bold
            .replace(
                /\*\*(.*?)\*\*/g,
                '<strong class="font-semibold text-white">$1</strong>'
            )

            // Italic
            .replace(
                /(?<!\*)\*(?!\*)(.*?)\*(?!\*)/g,
                '<em class="text-gray-300">$1</em>'
            )

            // Blockquote
            .replace(
                /^> (.*)$/gm,
                '<blockquote class="my-5 border-l-2 border-violet-400 bg-violet-500/[0.05] px-5 py-3 italic text-gray-300 rounded-r-xl">$1</blockquote>'
            )

            // Unordered list
            .replace(
                /^[-*] (.*)$/gm,
                '<li class="ml-5 mb-2 list-disc text-gray-300">$1</li>'
            )

            // Ordered list
            .replace(
                /^\d+\. (.*)$/gm,
                '<li class="ml-5 mb-2 list-decimal text-gray-300">$1</li>'
            );

        // Paragraphs
        html = html
            .split(/\n\s*\n/)
            .map((paragraph) => {
                const trimmed = paragraph.trim();

                if (!trimmed) return "";

                if (
                    trimmed.startsWith("<h1") ||
                    trimmed.startsWith("<h2") ||
                    trimmed.startsWith("<h3") ||
                    trimmed.startsWith("<blockquote") ||
                    trimmed.startsWith("<li")
                ) {
                    return trimmed;
                }

                return `<p class="mb-5 text-gray-300 leading-8">${trimmed.replace(
                    /\n/g,
                    "<br />"
                )}</p>`;
            })
            .join("");

        return html;
    };

    // ==========================================================
    // MDE OPTIONS
    // ==========================================================

    const mdeOptions = useMemo(
        () => ({
            autofocus: true,
            spellChecker: false,
            status: false,
            toolbar: [
                "bold",
                "italic",
                "heading",
                "|",
                "quote",
                "unordered-list",
                "ordered-list",
                "|",
                "link",
                "image",
                "|",
                "preview",
                "side-by-side",
                "fullscreen",
            ],
        }),
        []
    );

    // ==========================================================
    // EMPTY STATE
    // ==========================================================

    if (!currentChapter) {
        return (
            <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[#08070d] px-6 text-white">
                <div className="text-center">
                    <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center">
                        <div className="absolute inset-0 rounded-3xl bg-violet-500/10 blur-xl" />

                        <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.04]">
                            <Type className="h-8 w-8 text-violet-400" />
                        </div>
                    </div>

                    <h2 className="text-xl font-semibold text-white">
                        Select a chapter
                    </h2>

                    <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
                        Choose a chapter from the sidebar to start writing and
                        editing your book.
                    </p>
                </div>
            </div>
        );
    }

    const content = currentChapter.content || "";

    const wordCount = content
        ? content.split(/\s+/).filter((word) => word.length > 0).length
        : 0;

    const characterCount = content.length;

    const estimatedMinutes =
        wordCount > 0 ? Math.max(1, Math.ceil(wordCount / 200)) : 0;

    // ==========================================================
    // MAIN
    // ==========================================================

    return (
        <div
            className={`${isFullScreen
                    ? "fixed inset-0 z-[200] bg-[#08070d]"
                    : "relative min-h-[calc(100vh-80px)] bg-[#08070d]"
                } flex flex-col overflow-hidden text-white`}
        >
            {/* ================================================== */}
            {/* BACKGROUND */}
            {/* ================================================== */}

            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute left-[20%] top-0 h-[300px] w-[300px] rounded-full bg-violet-600/[0.04] blur-[110px]" />

                <div className="absolute right-[10%] top-[30%] h-[350px] w-[350px] rounded-full bg-fuchsia-600/[0.025] blur-[120px]" />

                <div className="absolute bottom-0 left-[40%] h-[300px] w-[300px] rounded-full bg-indigo-600/[0.025] blur-[110px]" />
            </div>

            {/* Grid */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.018]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                }}
            />

            {/* ================================================== */}
            {/* EDITOR HEADER */}
            {/* ================================================== */}

            <header className="relative z-20 flex-shrink-0 border-b border-white/[0.07] bg-[#08070d]/85 backdrop-blur-2xl">
                <div className="px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        {/* Title */}
                        <div className="flex min-w-0 items-center gap-3">
                            <div className="hidden h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/15 to-fuchsia-500/10 sm:flex">
                                <FileText className="h-5 w-5 text-violet-300" />
                            </div>

                            <div className="min-w-0">
                                <div className="mb-1 flex items-center gap-2">
                                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-400">
                                        Writing Studio
                                    </span>

                                    <span className="h-1 w-1 rounded-full bg-gray-700" />

                                    <span className="text-[10px] text-gray-600">
                                        Chapter {selectedChapterIndex + 1}
                                    </span>
                                </div>

                                <h1 className="truncate text-lg font-bold tracking-tight text-white sm:text-xl">
                                    {currentChapter.title ||
                                        `Chapter ${selectedChapterIndex + 1}`}
                                </h1>

                                <p className="mt-0.5 truncate text-xs text-gray-600">
                                    {book.title || "Untitled Book"}
                                </p>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-2">
                            {/* Edit / Preview */}
                            <div className="flex items-center rounded-xl border border-white/10 bg-white/[0.035] p-1">
                                <button
                                    type="button"
                                    onClick={() => setIsPreviewMode(false)}
                                    className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-all sm:px-4 sm:text-sm ${!isPreviewMode
                                            ? "bg-white/[0.09] text-white shadow-sm"
                                            : "text-gray-500 hover:text-gray-300"
                                        }`}
                                >
                                    <Type className="h-3.5 w-3.5" />
                                    Edit
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setIsPreviewMode(true)}
                                    className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-all sm:px-4 sm:text-sm ${isPreviewMode
                                            ? "bg-white/[0.09] text-white shadow-sm"
                                            : "text-gray-500 hover:text-gray-300"
                                        }`}
                                >
                                    <Eye className="h-3.5 w-3.5" />
                                    Preview
                                </button>
                            </div>

                            {/* Fullscreen */}
                            <button
                                type="button"
                                onClick={() => setIsFullScreen((prev) => !prev)}
                                title={isFullScreen ? "Exit fullscreen" : "Fullscreen"}
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.035] text-gray-500 transition-all hover:border-white/15 hover:bg-white/[0.07] hover:text-white"
                            >
                                {isFullScreen ? (
                                    <Minimize2 className="h-4 w-4" />
                                ) : (
                                    <Maximize2 className="h-4 w-4" />
                                )}
                            </button>

                            {/* AI */}
                            <button
                                type="button"
                                onClick={() =>
                                    onGenerateChapterContent(selectedChapterIndex)
                                }
                                disabled={isGenerating === selectedChapterIndex}
                                className="group relative flex h-10 items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-3 text-xs font-semibold text-white shadow-lg shadow-violet-950/30 transition-all hover:shadow-xl hover:shadow-violet-900/30 disabled:cursor-not-allowed disabled:opacity-60 sm:px-4 sm:text-sm"
                            >
                                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                                {isGenerating === selectedChapterIndex ? (
                                    <>
                                        <Sparkles className="relative h-4 w-4 animate-pulse" />
                                        <span className="relative hidden sm:inline">
                                            Generating...
                                        </span>
                                        <span className="relative sm:hidden">
                                            AI...
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <WandSparkles className="relative h-4 w-4" />
                                        <span className="relative hidden sm:inline">
                                            Generate with AI
                                        </span>
                                        <span className="relative sm:hidden">AI</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* ================================================== */}
            {/* EDITOR BODY */}
            {/* ================================================== */}

            <div className="relative z-10 min-h-0 flex-1 overflow-hidden">
                <div className="flex h-full flex-col px-3 py-3 sm:px-5 sm:py-5 lg:px-8">
                    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025] shadow-2xl shadow-black/20 backdrop-blur-xl">
                        {/* ================================================== */}
                        {/* TITLE AREA */}
                        {/* ================================================== */}

                        <div className="flex-shrink-0 border-b border-white/[0.07] px-4 py-4 sm:px-6 sm:py-5">
                            <div className="flex items-start gap-3">
                                <div className="mt-1 hidden h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-violet-500/10 sm:flex">
                                    <Type className="h-4 w-4 text-violet-400" />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <InputField
                                        label="Chapter Title"
                                        name="title"
                                        value={currentChapter.title || ""}
                                        onChange={onChapterChange}
                                        placeholder="Give your chapter a title..."
                                        className="!border-white/10 !bg-white/[0.035] !text-lg !font-semibold !text-white placeholder:!text-gray-600"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* ================================================== */}
                        {/* CONTENT */}
                        {/* ================================================== */}

                        <div className="min-h-0 flex-1 overflow-hidden">
                            {isPreviewMode ? (
                                <PreviewContent
                                    title={currentChapter.title}
                                    content={content}
                                    formatMarkdown={formatMarkdown}
                                />
                            ) : (
                                <div className="h-full overflow-hidden bg-[#0b0911]">
                                    <SimpleMDEditor
                                        value={content}
                                        onChange={(value) =>
                                            onChapterChange({
                                                target: {
                                                    name: "content",
                                                    value,
                                                },
                                            })
                                        }
                                        options={mdeOptions}
                                    />
                                </div>
                            )}
                        </div>

                        {/* ================================================== */}
                        {/* STATUS BAR */}
                        {/* ================================================== */}

                        <div className="flex flex-shrink-0 flex-col gap-3 border-t border-white/[0.07] bg-white/[0.015] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                            {/* Stats */}
                            <div className="flex items-center gap-4 overflow-x-auto">
                                <StatusItem
                                    icon={Type}
                                    label="Words"
                                    value={wordCount}
                                />

                                <StatusItem
                                    icon={FileText}
                                    label="Characters"
                                    value={characterCount}
                                />

                                {estimatedMinutes > 0 && (
                                    <StatusItem
                                        icon={Clock3}
                                        label="Read time"
                                        value={`${estimatedMinutes} min`}
                                    />
                                )}
                            </div>

                            {/* Saved */}
                            <div className="flex flex-shrink-0 items-center gap-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                                </span>

                                <span className="text-[11px] font-medium text-gray-500">
                                    Changes saved locally
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ================================================== */}
            {/* FULLSCREEN EXIT HINT */}
            {/* ================================================== */}

            {isFullScreen && (
                <div className="pointer-events-none fixed bottom-5 left-1/2 z-[250] -translate-x-1/2 rounded-full border border-white/10 bg-black/60 px-4 py-2 text-[11px] text-gray-500 shadow-xl backdrop-blur-xl">
                    <div className="flex items-center gap-2">
                        <Maximize2 className="h-3 w-3" />
                        Fullscreen writing mode
                    </div>
                </div>
            )}
        </div>
    );
};

// ============================================================
// PREVIEW
// ============================================================

const PreviewContent = ({
    title,
    content,
    formatMarkdown,
}) => {
    return (
        <div className="h-full overflow-y-auto bg-[#0b0911]">
            {/* Preview header */}
            <div className="sticky top-0 z-10 border-b border-white/[0.07] bg-[#0b0911]/90 px-4 py-3 backdrop-blur-xl sm:px-6">
                <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                    <Eye className="h-4 w-4 text-violet-400" />
                    <span>Preview Mode</span>

                    <span className="h-1 w-1 rounded-full bg-gray-700" />

                    <span className="text-gray-600">
                        Reader view
                    </span>
                </div>
            </div>

            {/* Reading area */}
            <div className="mx-auto max-w-4xl px-5 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
                {/* Chapter label */}
                <div className="mb-5 flex items-center gap-2">
                    <div className="h-px w-8 bg-gradient-to-r from-violet-500 to-fuchsia-500" />

                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-400">
                        Chapter
                    </span>

                    <div className="h-px w-8 bg-gradient-to-r from-fuchsia-500 to-transparent" />
                </div>

                {/* Title */}
                <h1 className="mb-10 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                    {title || "Untitled Chapter"}
                </h1>

                {/* Content */}
                <article
                    className="max-w-none"
                    style={{
                        fontFamily:
                            'Georgia, "Times New Roman", serif',
                        lineHeight: 1.8,
                    }}
                    dangerouslySetInnerHTML={{
                        __html: formatMarkdown(content),
                    }}
                />

                {/* End */}
                <div className="mt-14 flex items-center justify-center gap-3">
                    <div className="h-px w-12 bg-white/10" />
                    <Sparkles className="h-3.5 w-3.5 text-violet-500/60" />
                    <div className="h-px w-12 bg-white/10" />
                </div>
            </div>
        </div>
    );
};

// ============================================================
// STATUS ITEM
// ============================================================

const StatusItem = ({
    icon: Icon,
    label,
    value,
}) => {
    return (
        <div className="flex flex-shrink-0 items-center gap-2">
            <Icon className="h-3.5 w-3.5 text-gray-600" />

            <span className="text-[11px] text-gray-600">
                {label}
            </span>

            <span className="text-[11px] font-medium text-gray-400">
                {value}
            </span>
        </div>
    );
};

export default ChapterEditorTab;
