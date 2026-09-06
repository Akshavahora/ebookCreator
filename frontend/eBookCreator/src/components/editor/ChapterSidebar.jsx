import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Sparkles,
  Trash2,
  Plus,
  GripVertical,
  BookOpen,
  ChevronRight,
  FileText,
  Loader2,
} from "lucide-react";

import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import Button from "../ui/Button";

// ============================================================
// SORTABLE CHAPTER ITEM
// ============================================================

const SortableItem = ({
  chapter,
  index,
  selectedChapterIndex,
  onSelectChapter,
  onDeleteChapter,
  onGenerateChapterContent,
  isGenerating,
}) => {
  const chapterId = chapter._id || `new-${index}`;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: chapterId,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isSelected = selectedChapterIndex === index;
  const isCurrentlyGenerating = isGenerating === index;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative transition-all duration-200 ${isDragging ? "z-50 scale-[1.02] opacity-80" : ""
        }`}
    >
      <div
        className={`relative overflow-hidden rounded-2xl border transition-all duration-200 ${isSelected
            ? "border-violet-500/30 bg-gradient-to-r from-violet-500/15 via-fuchsia-500/[0.08] to-transparent shadow-lg shadow-violet-950/20"
            : "border-white/[0.07] bg-white/[0.025] hover:border-white/10 hover:bg-white/[0.05]"
          }`}
      >
        {/* Selected glow */}
        {isSelected && (
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1 rounded-full bg-gradient-to-b from-violet-400 via-fuchsia-400 to-indigo-400" />
        )}

        <div className="flex items-center">
          {/* Drag handle */}
          <button
            type="button"
            {...listeners}
            {...attributes}
            aria-label={`Drag ${chapter.title}`}
            className="flex h-full w-9 flex-shrink-0 cursor-grab items-center justify-center text-gray-600 transition hover:text-gray-300 active:cursor-grabbing"
          >
            <GripVertical className="h-4 w-4" />
          </button>

          {/* Chapter button */}
          <button
            type="button"
            onClick={() => onSelectChapter(index)}
            className="flex min-w-0 flex-1 items-center gap-3 py-3 pr-2 text-left"
          >
            {/* Chapter number */}
            <div
              className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl text-[11px] font-bold transition-all ${isSelected
                  ? "bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/20"
                  : "border border-white/[0.07] bg-white/[0.04] text-gray-500 group-hover:text-gray-300"
                }`}
            >
              {String(index + 1).padStart(2, "0")}
            </div>

            {/* Chapter info */}
            <div className="min-w-0 flex-1">
              <p
                className={`truncate text-sm font-medium transition-colors ${isSelected
                    ? "text-white"
                    : "text-gray-400 group-hover:text-gray-200"
                  }`}
              >
                {chapter.title || `Chapter ${index + 1}`}
              </p>

              <div className="mt-0.5 flex items-center gap-1.5">
                <FileText
                  className={`h-3 w-3 ${isSelected ? "text-violet-400" : "text-gray-600"
                    }`}
                />

                <span className="text-[10px] text-gray-600">
                  {chapter.content?.trim()
                    ? "Content added"
                    : "Ready to write"}
                </span>
              </div>
            </div>

            {/* Selected arrow */}
            <ChevronRight
              className={`h-4 w-4 flex-shrink-0 transition-all ${isSelected
                  ? "translate-x-0 text-violet-400 opacity-100"
                  : "-translate-x-1 text-gray-600 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                }`}
            />
          </button>

          {/* Actions */}
          <div
            className={`flex items-center gap-0.5 pr-2 transition-all duration-200 ${isSelected
                ? "opacity-100"
                : "pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100"
              }`}
          >
            {/* AI Generate */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onGenerateChapterContent(index);
              }}
              disabled={isCurrentlyGenerating}
              title="Generate content with AI"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition hover:bg-violet-500/10 hover:text-violet-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isCurrentlyGenerating ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin text-violet-400" />
              ) : (
                <Sparkles className="h-3.5 w-3.5" />
              )}
            </button>

            {/* Delete */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteChapter(index);
              }}
              title="Delete chapter"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 transition hover:bg-red-500/10 hover:text-red-400"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// CHAPTER SIDEBAR
// ============================================================

const ChapterSidebar = ({
  book,
  selectedChapterIndex,
  onSelectChapter,
  onAddChapter,
  onDeleteChapter,
  onGenerateChapterContent,
  isGenerating,
  onRecorderChapters,
}) => {
  const navigate = useNavigate();

  const chapters = book?.chapters || [];

  const chapterIds = chapters.map(
    (chapter, index) => chapter._id || `new-${index}`
  );

  // ==========================================================
  // DRAG END
  // ==========================================================

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = chapterIds.indexOf(active.id);
    const newIndex = chapterIds.indexOf(over.id);

    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    onRecorderChapters(oldIndex, newIndex);
  };

  return (
    <aside className="flex h-full w-full flex-col bg-[#0b0911] text-white">
      {/* ================================================== */}
      {/* HEADER */}
      {/* ================================================== */}

      <div className="relative overflow-hidden border-b border-white/[0.07] px-4 py-4">
        {/* Header glow */}
        <div className="pointer-events-none absolute -right-16 -top-20 h-40 w-40 rounded-full bg-violet-600/10 blur-3xl" />

        {/* Back button */}
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="group mb-5 flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-xs font-medium text-gray-500 transition-all hover:border-white/10 hover:bg-white/[0.06] hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          Back to Dashboard
        </button>

        {/* Book identity */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/20">
            <BookOpen className="h-5 w-5 text-white" />

            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#0b0911] bg-indigo-400">
              <Sparkles className="h-2 w-2 text-white" />
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-violet-400">
              Your Book
            </p>

            <h2
              className="truncate text-sm font-semibold text-white"
              title={book?.title}
            >
              {book?.title || "Untitled Book"}
            </h2>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.025] px-2.5 py-1.5">
            <FileText className="h-3 w-3 text-gray-500" />
            <span className="text-[10px] font-medium text-gray-400">
              {chapters.length}{" "}
              {chapters.length === 1 ? "Chapter" : "Chapters"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 rounded-lg border border-emerald-500/10 bg-emerald-500/[0.04] px-2.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/40" />
            <span className="text-[10px] font-medium text-emerald-400/80">
              Autosaved
            </span>
          </div>
        </div>
      </div>

      {/* ================================================== */}
      {/* CHAPTER LIST */}
      {/* ================================================== */}

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="px-4 pb-4 pt-5">
          {/* Section title */}
          <div className="mb-3 flex items-center justify-between px-1">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-600">
                Chapters
              </p>
            </div>

            <span className="rounded-md bg-white/[0.04] px-1.5 py-0.5 text-[10px] font-medium text-gray-600">
              Drag to reorder
            </span>
          </div>

          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={chapterIds}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2">
                {chapters.map((chapter, index) => (
                  <SortableItem
                    key={chapter._id || `new-${index}`}
                    chapter={chapter}
                    index={index}
                    selectedChapterIndex={selectedChapterIndex}
                    onSelectChapter={onSelectChapter}
                    onDeleteChapter={onDeleteChapter}
                    onGenerateChapterContent={onGenerateChapterContent}
                    isGenerating={isGenerating}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>

          {/* Empty state */}
          {chapters.length === 0 && (
            <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-5 py-10 text-center">
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.04]">
                <FileText className="h-5 w-5 text-gray-600" />
              </div>

              <p className="text-sm font-medium text-gray-400">
                No chapters yet
              </p>

              <p className="mt-1 text-xs leading-5 text-gray-600">
                Add your first chapter to start writing.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ================================================== */}
      {/* BOTTOM ACTION */}
      {/* ================================================== */}

      <div className="border-t border-white/[0.07] bg-[#0b0911] p-4">
        <button
          type="button"
          onClick={onAddChapter}
          className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl border border-violet-500/20 bg-gradient-to-r from-violet-500/15 to-fuchsia-500/10 px-4 py-3 text-sm font-semibold text-violet-200 transition-all duration-200 hover:border-violet-400/30 hover:from-violet-500/20 hover:to-fuchsia-500/15 hover:shadow-lg hover:shadow-violet-950/20"
        >
          {/* Button glow */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.05] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

          <span className="relative flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-md shadow-violet-500/20">
            <Plus className="h-3.5 w-3.5 text-white" />
          </span>

          <span className="relative">New Chapter</span>
        </button>

        {/* Tip */}
        <div className="mt-3 flex items-center justify-center gap-1.5">
          <Sparkles className="h-3 w-3 text-violet-500/60" />
          <p className="text-[10px] text-gray-600">
            Use AI to generate chapter content
          </p>
        </div>
      </div>
    </aside>
  );
};

export default ChapterSidebar;
