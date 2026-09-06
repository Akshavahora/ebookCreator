import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Sparkles,
  FileDown,
  Save,
  Menu,
  X,
  Edit,
  NotebookText,
  ChevronDown,
  FileText,
  BookOpen,
  WandSparkles,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { arrayMove } from "@dnd-kit/sortable";

import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPath";
import Dropdown, { DropdownItem } from "../components/ui/Dropdown";
import Button from "../components/ui/Button";
import ChapterSidebar from "../components/editor/ChapterSidebar";
import ChapterEditorTab from "../components/editor/ChapterEditorTab";
import BookDetailsTab from "../components/editor/BookDetailsTab";

const EditorPage = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);

  const [activeTab, setActiveTab] = useState("editor");

  const fileInputRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // AI state
  const [aiStyle] = useState("Informative");
  const [isGenerating, setIsGenerating] = useState(false);

  // --------------------------------------------------
  // FETCH BOOK
  // --------------------------------------------------

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axiosInstance.get(
          `${API_PATHS.BOOKS.GET_BOOK_BY_ID}/${bookId}`
        );

        setBook(response.data);
      } catch (error) {
        toast.error("Failed to load book details.");
        navigate("/dashboard");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBook();
  }, [bookId, navigate]);

  // --------------------------------------------------
  // BOOK CHANGE
  // --------------------------------------------------

  const handleBookChange = (e) => {
    const { name, value } = e.target;

    setBook((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // --------------------------------------------------
  // CHAPTER CHANGE
  // --------------------------------------------------

  const handleChapterChange = (e) => {
    const { name, value } = e.target;

    const updatedChapters = [...book.chapters];

    updatedChapters[selectedChapterIndex] = {
      ...updatedChapters[selectedChapterIndex],
      [name]: value,
    };

    setBook((prev) => ({
      ...prev,
      chapters: updatedChapters,
    }));
  };

  // --------------------------------------------------
  // ADD CHAPTER
  // --------------------------------------------------

  const handleAddChapter = () => {
    const newChapter = {
      title: `Chapter ${book.chapters.length + 1}`,
      content: "",
    };

    const updatedChapters = [...book.chapters, newChapter];

    setBook((prev) => ({
      ...prev,
      chapters: updatedChapters,
    }));

    setSelectedChapterIndex(updatedChapters.length - 1);

    toast.success("New chapter added");
  };

  // --------------------------------------------------
  // DELETE CHAPTER
  // --------------------------------------------------

  const handleDeleteChapter = (index) => {
    if (book.chapters.length <= 1) {
      toast.error("A book must have at least one chapter.");
      return;
    }

    const updatedChapters = book.chapters.filter((_, i) => i !== index);

    setBook((prev) => ({
      ...prev,
      chapters: updatedChapters,
    }));

    setSelectedChapterIndex((prevIndex) =>
      prevIndex >= index ? Math.max(0, prevIndex - 1) : prevIndex
    );

    toast.success("Chapter deleted");
  };

  // --------------------------------------------------
  // REORDER CHAPTERS
  // --------------------------------------------------

  const handleReorderChapters = (oldIndex, newIndex) => {
    setBook((prev) => ({
      ...prev,
      chapters: arrayMove(prev.chapters, oldIndex, newIndex),
    }));

    setSelectedChapterIndex(newIndex);
  };

  // --------------------------------------------------
  // SAVE
  // --------------------------------------------------

  const handleSaveChanges = async (bookToSave = book, showToast = true) => {
    setIsSaving(true);

    try {
      await axiosInstance.put(
        `${API_PATHS.BOOKS.UPDATE_BOOK}/${bookId}`,
        bookToSave
      );

      if (showToast) {
        toast.success("Changes saved successfully");
      }
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save changes.");
    } finally {
      setIsSaving(false);
    }
  };

  // --------------------------------------------------
  // COVER IMAGE
  // --------------------------------------------------

  const handleCoverImageUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("coverImage", file);

    setIsUploading(true);

    try {
      const response = await axiosInstance.put(
        `${API_PATHS.BOOKS.UPDATE_COVER}/${bookId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setBook(response.data);

      toast.success("Cover image updated!");
    } catch (error) {
      console.error("Cover upload error:", error);
      toast.error("Failed to upload cover image.");
    } finally {
      setIsUploading(false);
    }
  };

  // --------------------------------------------------
  // AI CHAPTER GENERATION
  // --------------------------------------------------

  const handleGenerateChapterContent = async (index) => {
    const chapter = book.chapters[index];

    if (!chapter || !chapter.title?.trim()) {
      toast.error("Chapter title is required to generate content.");
      return;
    }

    setIsGenerating(index);

    try {
      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_CHAPTER_CONTENT,
        {
          chapterTitle: chapter.title,
          chapterDescription: chapter.description || "",
          style: aiStyle,
        }
      );

      const updatedChapters = [...book.chapters];

      updatedChapters[index] = {
        ...updatedChapters[index],
        content: response.data.content,
      };

      const updatedBook = {
        ...book,
        chapters: updatedChapters,
      };

      setBook(updatedBook);

      toast.success(`Content for "${chapter.title}" generated!`);

      await handleSaveChanges(updatedBook, false);
    } catch (error) {
      console.error("AI generation error:", error);
      toast.error("Failed to generate chapter content.");
    } finally {
      setIsGenerating(false);
    }
  };

  // --------------------------------------------------
  // EXPORT PDF
  // --------------------------------------------------

  const handleExportPDF = async () => {
    const loadingToast = toast.loading("Generating your PDF...");

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPORT.PDF}/${bookId}/pdf`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(response.data);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${book.title}.pdf`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);

      toast.dismiss(loadingToast);
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("PDF export error:", error);

      toast.dismiss(loadingToast);
      toast.error("Failed to export PDF.");
    }
  };

  // --------------------------------------------------
  // EXPORT DOCX
  // --------------------------------------------------

  const handleExportDoc = async () => {
    const loadingToast = toast.loading("Generating your document...");

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPORT.DOCX}/${bookId}/docx`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(response.data);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${book.title}.docx`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);

      toast.dismiss(loadingToast);
      toast.success("Document downloaded successfully!");
    } catch (error) {
      console.error("DOCX export error:", error);

      toast.dismiss(loadingToast);
      toast.error("Failed to export document.");
    }
  };

  // --------------------------------------------------
  // PREMIUM LOADING SCREEN
  // --------------------------------------------------

  if (isLoading || !book) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[#08070d] text-white">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[140px]" />

          <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-fuchsia-600/10 blur-[120px]" />

          <div className="absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-indigo-600/10 blur-[120px]" />
        </div>

        {/* Grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
          <div className="flex flex-col items-center text-center">
            {/* Animated icon */}
            <div className="relative mb-8">
              <div className="absolute inset-0 animate-ping rounded-3xl bg-violet-500/20" />

              <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.06] shadow-2xl shadow-violet-950/40 backdrop-blur-xl">
                <BookOpen className="h-8 w-8 text-violet-300" />

                <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/30">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>

            <div className="mb-3 flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-violet-400" />

              <span className="text-sm font-medium text-violet-300">
                Preparing your workspace
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Loading your book
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
                ...
              </span>
            </h1>

            <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
              We're getting your chapters, content and writing tools ready.
            </p>

            {/* Loading bar */}
            <div className="mt-8 h-1.5 w-64 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-1/2 animate-[loading_1.5s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500" />
            </div>

            <style>
              {`
                @keyframes loading {
                  0% {
                    transform: translateX(-100%);
                  }
                  50% {
                    transform: translateX(100%);
                  }
                  100% {
                    transform: translateX(250%);
                  }
                }
              `}
            </style>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // MAIN UI
  // --------------------------------------------------

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#08070d] font-sans text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[15%] top-[10%] h-[400px] w-[400px] rounded-full bg-violet-600/[0.05] blur-[130px]" />

        <div className="absolute right-[5%] top-[30%] h-[350px] w-[350px] rounded-full bg-fuchsia-600/[0.04] blur-[120px]" />

        <div className="absolute bottom-0 left-[40%] h-[300px] w-[300px] rounded-full bg-indigo-600/[0.04] blur-[120px]" />
      </div>

      {/* Grid */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* ------------------------------------------------ */}
      {/* MOBILE SIDEBAR */}
      {/* ------------------------------------------------ */}

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-[100] flex md:hidden"
          role="dialog"
          aria-modal="true"
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />

          {/* Sidebar */}
          <div className="relative z-10 flex h-full w-[86%] max-w-sm flex-col border-r border-white/10 bg-[#0d0b14] shadow-2xl shadow-black">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/20">
                  <BookOpen className="h-4 w-4 text-white" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Book Chapters
                  </p>
                  <p className="text-xs text-gray-500">
                    {book.chapters?.length || 0} chapters
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsSidebarOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-gray-400 transition hover:bg-white/[0.08] hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto">
              <ChapterSidebar
                book={book}
                selectedChapterIndex={selectedChapterIndex}
                onSelectChapter={(index) => {
                  setSelectedChapterIndex(index);
                  setIsSidebarOpen(false);
                }}
                onAddChapter={handleAddChapter}
                onDeleteChapter={handleDeleteChapter}
                onGenerateChapterContent={handleGenerateChapterContent}
                isGenerating={isGenerating}
                onRecorderChapters={handleReorderChapters}
              />
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------ */}
      {/* DESKTOP SIDEBAR */}
      {/* ------------------------------------------------ */}

      <div className="relative z-20 hidden md:fixed md:inset-y-0 md:left-0 md:flex md:w-[280px] md:flex-shrink-0 md:border-r md:border-white/10 md:bg-[#0b0911]">
        <div className="w-full overflow-y-auto">
          <ChapterSidebar
            book={book}
            selectedChapterIndex={selectedChapterIndex}
            onSelectChapter={(index) => {
              setSelectedChapterIndex(index);
              setIsSidebarOpen(false);
            }}
            onAddChapter={handleAddChapter}
            onDeleteChapter={handleDeleteChapter}
            onGenerateChapterContent={handleGenerateChapterContent}
            isGenerating={isGenerating}
            onRecorderChapters={handleReorderChapters}
          />
        </div>
      </div>

      {/* ------------------------------------------------ */}
      {/* MAIN CONTENT */}
      {/* ------------------------------------------------ */}

      <main className="relative z-10 min-h-screen md:pl-[280px]">
        {/* HEADER */}
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#08070d]/80 px-3 py-3 backdrop-blur-2xl sm:px-5">
          <div className="flex min-h-12 items-center justify-between gap-3">
            {/* Left */}
            <div className="flex min-w-0 items-center gap-3">
              {/* Mobile menu */}
              <button
                type="button"
                onClick={() => setIsSidebarOpen(true)}
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-gray-400 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white md:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>

              {/* Book name - desktop */}
              <div className="hidden min-w-0 items-center gap-3 lg:flex">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-gray-400 transition hover:bg-white/[0.08] hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>

                <div className="min-w-0">
                  <p className="max-w-[260px] truncate text-sm font-semibold text-white">
                    {book.title || "Untitled Book"}
                  </p>

                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50" />
                    <span className="text-[11px] text-gray-500">
                      Editing workspace
                    </span>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex items-center rounded-xl border border-white/10 bg-white/[0.035] p-1">
                <button
                  onClick={() => setActiveTab("editor")}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-all sm:px-4 sm:text-sm ${activeTab === "editor"
                      ? "bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 text-white shadow-lg shadow-violet-950/20"
                      : "text-gray-500 hover:text-gray-300"
                    }`}
                >
                  <Edit className="h-4 w-4" />
                  <span>Editor</span>
                </button>

                <button
                  onClick={() => setActiveTab("details")}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-all sm:px-4 sm:text-sm ${activeTab === "details"
                      ? "bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 text-white shadow-lg shadow-violet-950/20"
                      : "text-gray-500 hover:text-gray-300"
                    }`}
                >
                  <NotebookText className="h-4 w-4" />
                  <span className="hidden sm:inline">Book Details</span>
                  <span className="sm:hidden">Details</span>
                </button>
              </div>
            </div>

            {/* Right */}
            <div className="flex flex-shrink-0 items-center gap-2">
              {/* Export */}
              <Dropdown
                trigger={
                  <Button
                    variant="secondary"
                    icon={FileDown}
                    className="!border-white/10 !bg-white/[0.05] !text-gray-300 hover:!bg-white/[0.09]"
                  >
                    <span className="hidden sm:inline">Export</span>
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                }
              >
                <DropdownItem onClick={handleExportPDF}>
                  <FileText className="mr-2 h-4 w-4 text-violet-400" />
                  Export as PDF
                </DropdownItem>

                <DropdownItem onClick={handleExportDoc}>
                  <FileText className="mr-2 h-4 w-4 text-fuchsia-400" />
                  Export as Document
                </DropdownItem>
              </Dropdown>

              {/* Save */}
              <Button
                onClick={() => handleSaveChanges()}
                isLoading={isSaving}
                icon={Save}
              >
                <span className="hidden sm:inline">Save Changes</span>
                <span className="sm:hidden">Save</span>
              </Button>
            </div>
          </div>
        </header>

        {/* MOBILE BOOK TITLE */}
        <div className="border-b border-white/5 bg-white/[0.015] px-4 py-3 lg:hidden">
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500">
              <BookOpen className="h-4 w-4 text-white" />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                {book.title || "Untitled Book"}
              </p>

              <p className="text-[11px] text-gray-500">
                {book.chapters?.length || 0} chapters
              </p>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="relative w-full">
          {/* Top glow */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[70%] -translate-x-1/2 rounded-full bg-violet-600/[0.025] blur-[100px]" />

          <div className="relative">
            {activeTab === "editor" ? (
              <ChapterEditorTab
                book={book}
                selectedChapterIndex={selectedChapterIndex}
                onChapterChange={handleChapterChange}
                onGenerateChapterContent={handleGenerateChapterContent}
                isGenerating={isGenerating}
              />
            ) : (
              <BookDetailsTab
                book={book}
                onBookChange={handleBookChange}
                onCoverUpload={handleCoverImageUpload}
                isUploading={isUploading}
                fileInputRef={fileInputRef}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditorPage;
