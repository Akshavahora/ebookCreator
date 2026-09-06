
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Plus,
  BookOpen,
  Sparkles,
  Library,
  ArrowRight,
} from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPath";
import BookCard from "../components/cards/BookCard";
import CreateBookModal from "../components/modals/CreateBookModal";

/*BOOK CARD SKELETON*/
const BookCardSkeleton = () => (
  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div className="aspect-[16/25] animate-pulse bg-slate-200" />

    <div className="space-y-3 p-4">
      <div className="h-5 w-3/4 animate-pulse rounded-md bg-slate-200" />
      <div className="h-4 w-1/2 animate-pulse rounded-md bg-slate-200" />

      <div className="flex gap-2 pt-2">
        <div className="h-8 flex-1 animate-pulse rounded-lg bg-slate-200" />
        <div className="h-8 w-8 animate-pulse rounded-lg bg-slate-200" />
      </div>
    </div>
  </div>
);

/* 
   CONFIRMATION MODAL
 */
const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
          <BookOpen className="h-6 w-6 text-red-500" />
        </div>

        <h3 className="text-xl font-bold text-slate-900">
          {title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          {message}
        </p>

        <div className="mt-7 flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>

          <Button
            onClick={onConfirm}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            Delete eBook
          </Button>
        </div>
      </div>
    </div>
  );
};

/* 
   DASHBOARD PAGE
 */
const DashboardPage = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  const { User } = useAuth();
  const navigate = useNavigate();

  /* 
     FETCH BOOKS
   */
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axiosInstance.get(
          API_PATHS.BOOKS.GET_BOOKS
        );

        setBooks(response.data);
      } catch (error) {
        toast.error("Failed to fetch your eBooks.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  /* 
     DELETE BOOK
   */
  const handleDeleteBook = async () => {
    if (!bookToDelete) return;

    try {
      await axiosInstance.delete(
        `${API_PATHS.BOOKS.DELETE_BOOK}/${bookToDelete}`
      );

      setBooks((prevBooks) =>
        prevBooks.filter((book) => book._id !== bookToDelete)
      );

      toast.success("eBook deleted successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to delete eBook."
      );
    } finally {
      setBookToDelete(null);
    }
  };

  /* 
     CREATE BOOK
   */
  const handleCreateBookClick = () => {
    setIsCreateModalOpen(true);
  };

  const handleBookCreated = (bookId) => {
    setIsCreateModalOpen(false);
    navigate(`/editor/${bookId}`);
  };

  /* 
     USER NAME
   */
  const userName =
    User?.name ||
    User?.fullName ||
    User?.username ||
    "Creator";

  return (
    <DashboardLayout>
      <div className="min-h-full bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

          {/* =================================================
              HERO HEADER
          ================================================= */}
          <section className="relative mb-8 overflow-hidden rounded-3xl bg-slate-900 px-6 py-8 shadow-lg sm:px-8">
            {/* Decorative elements */}
            <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-purple-500/20 blur-3xl" />

            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur">
                  <Sparkles className="h-3.5 w-3.5 text-indigo-300" />
                  AI eBook Studio
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Welcome back, {userName} 👋
                </h1>

                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
                  Create, edit, and manage your AI-generated eBooks
                  from one simple workspace.
                </p>
              </div>

              <Button
                onClick={handleCreateBookClick}
                className="group w-full bg-white text-slate-900 shadow-lg hover:bg-slate-100 sm:w-auto"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create new eBook
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </section>

          {/* =================================================
              STATS
          ================================================= */}
          <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {/* Total Books */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Total eBooks
                  </p>

                  {isLoading ? (
                    <div className="mt-2 h-8 w-16 animate-pulse rounded bg-slate-200" />
                  ) : (
                    <p className="mt-1 text-3xl font-bold text-slate-900">
                      {books.length}
                    </p>
                  )}
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
                  <Library className="h-5 w-5 text-indigo-600" />
                </div>
              </div>
            </div>

            {/* Workspace */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Workspace
                  </p>

                  <p className="mt-1 text-lg font-bold text-slate-900">
                    eBook Studio
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </div>

            {/* Quick Action */}
            <button
              onClick={handleCreateBookClick}
              className="group rounded-2xl border border-dashed border-indigo-200 bg-indigo-50/50 p-5 text-left transition hover:border-indigo-300 hover:bg-indigo-50"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-indigo-600">
                    Start something new
                  </p>

                  <p className="mt-1 text-lg font-bold text-slate-900">
                    Create an eBook
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm">
                  <Plus className="h-5 w-5 text-indigo-600 transition-transform group-hover:rotate-90" />
                </div>
              </div>
            </button>
          </section>

          {/* =================================================
              BOOK SECTION HEADER
          ================================================= */}
          <section>
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-indigo-600" />

                  <h2 className="text-xl font-bold text-slate-900">
                    Your eBooks
                  </h2>
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  Browse and manage all your created books.
                </p>
              </div>

              {!isLoading && books.length > 0 && (
                <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  {books.length}{" "}
                  {books.length === 1 ? "book" : "books"}
                </span>
              )}
            </div>

            {/* =================================================
                LOADING
            ================================================= */}
            {isLoading ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <BookCardSkeleton key={index} />
                ))}
              </div>
            ) : books.length === 0 ? (
              /* ===============================================
                 EMPTY STATE
              =============================================== */
              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm sm:px-10">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500" />

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-50">
                  <BookOpen className="h-9 w-9 text-indigo-500" />
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-900">
                  Your library is empty
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  You haven't created an eBook yet. Start your first
                  project and turn your ideas into a beautiful book.
                </p>

                <div className="mt-7">
                  <Button
                    onClick={handleCreateBookClick}
                    icon={Plus}
                  >
                    Create Your First eBook
                  </Button>
                </div>
              </div>
            ) : (
              /* ===============================================
                 BOOK GRID
              =============================================== */
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {books.map((book) => (
                  <BookCard
                    key={book._id}
                    book={book}
                    onDelete={() =>
                      setBookToDelete(book._id)
                    }
                  />
                ))}
              </div>
            )}
          </section>
        </div>

        {/* ===================================================
            DELETE MODAL
        =================================================== */}
        <ConfirmationModal
          isOpen={!!bookToDelete}
          onClose={() => setBookToDelete(null)}
          onConfirm={handleDeleteBook}
          title="Delete eBook?"
          message="Are you sure you want to delete this eBook? This action cannot be undone and all of its data will be permanently removed."
        />

        {/* ===================================================
            CREATE BOOK MODAL
        =================================================== */}
        <CreateBookModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onBookCreated={handleBookCreated}
        />
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;

