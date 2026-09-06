import { useState, useRef, useEffect } from "react";
import {
  Plus,
  Sparkles,
  Trash2,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Hash,
  Lightbulb,
  Palette,
  WandSparkles,
  Check,
  GripVertical,
} from "lucide-react";

import Modal from "../ui/Modal";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import Button from "../ui/Button";

import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const CreateBookModal = ({
  isOpen,
  onClose,
  onBookCreated,
}) => {
  const { user } = useAuth();

  const [step, setStep] = useState(1);
  const [bookTitle, setBookTitle] = useState("");
  const [numChapters, setNumChapters] = useState(5);
  const [aiTopic, setAiTopic] = useState("");
  const [aiStyle, setAiStyle] = useState("Informative");
  const [chapters, setChapters] = useState([]);

  const [isGeneratingOutline, setIsGeneratingOutline] =
    useState(false);
  const [isFinalizingBook, setIsFinalizingBook] =
    useState(false);

  const chaptersContainerRef = useRef(null);

  /* =========================================================
     RESET MODAL
  ========================================================= */
  const resetModal = () => {
    setStep(1);
    setBookTitle("");
    setNumChapters(5);
    setAiTopic("");
    setAiStyle("Informative");
    setChapters([]);
    setIsGeneratingOutline(false);
    setIsFinalizingBook(false);
  };

  /* =========================================================
     CLOSE MODAL
  ========================================================= */
  const handleClose = () => {
    onClose();
    resetModal();
  };

  /* =========================================================
     GENERATE OUTLINE
  ========================================================= */
  const handleGenerateOutline = async () => {
    const trimmedTitle = bookTitle.trim();

    if (!trimmedTitle) {
      toast.error("Please enter a book title.");
      return;
    }

    if (
      !numChapters ||
      numChapters < 1 ||
      numChapters > 20
    ) {
      toast.error("Chapters must be between 1 and 20.");
      return;
    }

    setIsGeneratingOutline(true);

    try {
      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_OUTLINE,
        {
          topic: trimmedTitle,
          description: aiTopic.trim(),
          style: aiStyle,
          numChapters: Number(numChapters),
        }
      );

      setChapters(response.data.outline || []);
      setStep(2);

      toast.success(
        "Outline generated! Review and customize your chapters."
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to generate outline."
      );
    } finally {
      setIsGeneratingOutline(false);
    }
  };

  /* =========================================================
     CHAPTER CHANGE
  ========================================================= */
  const handleChapterChange = (
    index,
    field,
    value
  ) => {
    setChapters((prevChapters) =>
      prevChapters.map((chapter, i) =>
        i === index
          ? {
            ...chapter,
            [field]: value,
          }
          : chapter
      )
    );
  };

  /* =========================================================
     DELETE CHAPTER
  ========================================================= */
  const handleDeleteChapter = (index) => {
    if (chapters.length <= 1) {
      toast.error("Your book must have at least one chapter.");
      return;
    }

    setChapters((prevChapters) =>
      prevChapters.filter((_, i) => i !== index)
    );
  };

  /* =========================================================
     ADD CHAPTER
  ========================================================= */
  const handleAddChapter = () => {
    const newChapter = {
      title: `Chapter ${chapters.length + 1}`,
      description: "",
    };

    setChapters((prevChapters) => [
      ...prevChapters,
      newChapter,
    ]);

    setTimeout(() => {
      if (chaptersContainerRef.current) {
        chaptersContainerRef.current.scrollTo({
          top: chaptersContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  /* =========================================================
     FINALIZE BOOK
  ========================================================= */
  const handleFinalizeBook = async () => {
    const trimmedTitle = bookTitle.trim();

    if (!trimmedTitle) {
      toast.error("Book title is required.");
      return;
    }

    if (chapters.length === 0) {
      toast.error(
        "Please add at least one chapter."
      );
      return;
    }

    const hasEmptyChapter = chapters.some(
      (chapter) => !chapter.title?.trim()
    );

    if (hasEmptyChapter) {
      toast.error(
        "Every chapter must have a title."
      );
      return;
    }

    setIsFinalizingBook(true);

    try {
      const response = await axiosInstance.post(
        API_PATHS.BOOKS.CREATE_BOOK,
        {
          title: trimmedTitle,
          author: user?.name || "Unknown Author",
          chapters,
        }
      );

      toast.success(
        "eBook created successfully!"
      );

      onBookCreated(response.data._id);

      onClose();
      resetModal();
    } catch (error) {
      console.error(
        "Create book error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to create eBook."
      );
    } finally {
      setIsFinalizingBook(false);
    }
  };

  /* =========================================================
     AUTO SCROLL
  ========================================================= */
  useEffect(() => {
    if (
      step === 2 &&
      chaptersContainerRef.current &&
      chapters.length > 0
    ) {
      const container =
        chaptersContainerRef.current;

      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chapters.length, step]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={
        step === 1
          ? "Create New eBook"
          : "Review Your eBook"
      }
    >
      <div className="w-full">

        {/* =====================================================
            STEP INDICATOR
        ===================================================== */}
        <div className="mb-7 flex items-center">
          {/* Step 1 */}
          <div className="flex items-center gap-2">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-all ${step >= 1
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                  : "bg-slate-100 text-slate-400"
                }`}
            >
              {step > 1 ? (
                <Check className="h-4 w-4" />
              ) : (
                "1"
              )}
            </div>

            <span
              className={`hidden text-xs font-semibold sm:block ${step >= 1
                  ? "text-slate-900"
                  : "text-slate-400"
                }`}
            >
              Book details
            </span>
          </div>

          {/* Connector */}
          <div
            className={`mx-3 h-0.5 flex-1 transition-all ${step === 2
                ? "bg-indigo-600"
                : "bg-slate-200"
              }`}
          />

          {/* Step 2 */}
          <div className="flex items-center gap-2">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-all ${step === 2
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                  : "bg-slate-100 text-slate-400"
                }`}
            >
              2
            </div>

            <span
              className={`hidden text-xs font-semibold sm:block ${step === 2
                  ? "text-slate-900"
                  : "text-slate-400"
                }`}
            >
              Review outline
            </span>
          </div>
        </div>

        {/* =====================================================
            STEP 1 — BOOK DETAILS
        ===================================================== */}
        {step === 1 && (
          <div className="space-y-5">

            {/* Intro */}
            <div className="mb-6 rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-purple-50 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                  <WandSparkles className="h-5 w-5 text-indigo-600" />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Let AI build your outline
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Give us a title and some direction.
                    AI will generate a structured chapter
                    outline that you can edit before creating
                    your eBook.
                  </p>
                </div>
              </div>
            </div>

            {/* Book title */}
            <InputField
              icon={BookOpen}
              label="Book Title"
              placeholder="e.g. The Future of Artificial Intelligence"
              value={bookTitle}
              onChange={(e) =>
                setBookTitle(e.target.value)
              }
            />

            {/* Number of chapters */}
            <InputField
              icon={Hash}
              label="Number of Chapters"
              type="number"
              placeholder="5"
              value={numChapters}
              onChange={(e) =>
                setNumChapters(
                  Math.min(
                    20,
                    Math.max(
                      1,
                      parseInt(e.target.value) || 1
                    )
                  )
                )
              }
              min="1"
              max="20"
            />

            {/* Topic */}
            <InputField
              icon={Lightbulb}
              label="Topic / Direction"
              placeholder="What should the book focus on?"
              value={aiTopic}
              onChange={(e) =>
                setAiTopic(e.target.value)
              }
            />

            {/* Writing style */}
            <SelectField
              icon={Palette}
              label="Writing Style"
              value={aiStyle}
              onChange={(e) =>
                setAiStyle(e.target.value)
              }
              options={[
                "Informative",
                "Storytelling",
                "Casual",
                "Professional",
                "Humorous",
              ]}
            />

            {/* Generate */}
            <div className="border-t border-slate-100 pt-5">
              <Button
                onClick={handleGenerateOutline}
                isLoading={isGeneratingOutline}
                icon={Sparkles}
                className="w-full"
              >
                {isGeneratingOutline
                  ? "Generating your outline..."
                  : "Generate Outline with AI"}
              </Button>

              <p className="mt-2 text-center text-[11px] text-slate-400">
                You can review and edit everything before
                creating the final eBook.
              </p>
            </div>
          </div>
        )}

        {/* =====================================================
            STEP 2 — REVIEW CHAPTERS
        ===================================================== */}
        {step === 2 && (
          <div className="space-y-5">

            {/* Header */}
            <div className="flex items-end justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Review Chapters
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Customize your outline before creating
                  the eBook.
                </p>
              </div>

              <div className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600">
                {chapters.length}{" "}
                {chapters.length === 1
                  ? "chapter"
                  : "chapters"}
              </div>
            </div>

            {/* Book summary */}
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm">
                <BookOpen className="h-4 w-4 text-indigo-600" />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                  Book title
                </p>

                <p className="truncate text-sm font-semibold text-slate-800">
                  {bookTitle}
                </p>
              </div>
            </div>

            {/* Chapter list */}
            <div
              ref={chaptersContainerRef}
              className="max-h-[380px] space-y-3 overflow-y-auto pr-1"
            >
              {chapters.length === 0 ? (
                <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-sm">
                    <BookOpen className="h-7 w-7 text-slate-300" />
                  </div>

                  <p className="mt-4 text-sm font-medium text-slate-700">
                    No chapters yet
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Add a chapter to get started.
                  </p>
                </div>
              ) : (
                chapters.map(
                  (chapter, index) => (
                    <div
                      key={index}
                      className="group rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:border-indigo-200 hover:shadow-sm"
                    >
                      {/* Chapter header */}
                      <div className="flex items-start gap-3">

                        {/* Drag handle */}
                        <div className="mt-1 hidden cursor-grab text-slate-300 sm:block">
                          <GripVertical className="h-4 w-4" />
                        </div>

                        {/* Number */}
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-xs font-bold text-indigo-600">
                          {index + 1}
                        </div>

                        {/* Title */}
                        <div className="min-w-0 flex-1">
                          <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                            Chapter title
                          </label>

                          <input
                            type="text"
                            value={
                              chapter.title || ""
                            }
                            onChange={(e) =>
                              handleChapterChange(
                                index,
                                "title",
                                e.target.value
                              )
                            }
                            placeholder="Enter chapter title..."
                            className="w-full border-0 bg-transparent p-0 text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-300 focus:ring-0"
                          />
                        </div>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteChapter(
                              index
                            )
                          }
                          className="rounded-lg p-2 text-slate-300 opacity-100 transition hover:bg-red-50 hover:text-red-500 sm:opacity-0 sm:group-hover:opacity-100"
                          title="Delete chapter"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Description */}
                      <div className="ml-11 mt-3">
                        <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                          Description
                        </label>

                        <textarea
                          value={
                            chapter.description ||
                            ""
                          }
                          onChange={(e) =>
                            handleChapterChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          placeholder="Briefly describe what this chapter will cover..."
                          rows={2}
                          className="w-full resize-none rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-xs leading-5 text-slate-600 outline-none transition focus:border-indigo-200 focus:bg-white focus:ring-2 focus:ring-indigo-50 placeholder:text-slate-300"
                        />
                      </div>
                    </div>
                  )
                )
              )}
            </div>

            {/* Add chapter */}
            <button
              type="button"
              onClick={handleAddChapter}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-indigo-200 bg-indigo-50/50 py-3 text-xs font-semibold text-indigo-600 transition hover:border-indigo-300 hover:bg-indigo-50"
            >
              <Plus className="h-4 w-4" />
              Add another chapter
            </button>

            {/* Footer */}
            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <Button
                variant="ghost"
                onClick={() => setStep(1)}
                icon={ArrowLeft}
                className="w-full sm:w-auto"
              >
                Back
              </Button>

              <Button
                onClick={handleFinalizeBook}
                isLoading={isFinalizingBook}
                icon={ArrowRight}
                className="w-full sm:w-auto"
              >
                {isFinalizingBook
                  ? "Creating eBook..."
                  : "Create eBook"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CreateBookModal;

