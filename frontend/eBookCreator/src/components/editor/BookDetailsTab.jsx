
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import { BookOpen, ImagePlus, UploadCloud, UserRound } from "lucide-react";
import { BASE_URL } from "../../utils/apiPath";

const BookDetailsTab = ({
    book,
    onBookChange,
    onCoverUpload,
    isUploading,
    fileInputRef,
}) => {
    const coverImageUrl = book?.coverImage
        ? book.coverImage.startsWith("http")
            ? book.coverImage
            : `${BASE_URL}/backend/${book.coverImage}`.replace(/\\/g, "/")
        : null;

    return (
        <div className="relative mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
            {/* Background glow */}
            <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-violet-600/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-fuchsia-600/10 blur-3xl" />

            <div className="relative space-y-6">
                {/* Page Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10">
                                <BookOpen className="h-4 w-4 text-violet-400" />
                            </div>

                            <span className="text-xs font-semibold uppercase tracking-wider text-violet-400">
                                Book Settings
                            </span>
                        </div>

                        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                            Book Details
                        </h2>

                        <p className="mt-1 max-w-xl text-sm leading-6 text-gray-500">
                            Update your book information and customize the cover before
                            publishing.
                        </p>
                    </div>
                </div>

                {/* Book Information Card */}
                <section
                    className="
            relative overflow-hidden rounded-2xl
            border border-white/10
            bg-[#0d0b14]
            shadow-[0_20px_60px_rgba(0,0,0,0.25)]
          "
                >
                    {/* Card glow */}
                    <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-violet-600/10 blur-3xl" />

                    {/* Header */}
                    <div className="relative border-b border-white/10 px-5 py-5 sm:px-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 ring-1 ring-white/10">
                                <BookOpen className="h-5 w-5 text-violet-400" />
                            </div>

                            <div>
                                <h3 className="font-semibold text-white">
                                    Basic Information
                                </h3>

                                <p className="text-xs text-gray-500">
                                    Tell readers what your book is about
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="relative p-5 sm:p-6">
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <InputField
                                label="Title"
                                name="title"
                                value={book.title || ""}
                                onChange={onBookChange}
                                placeholder="Enter your book title"
                                icon={BookOpen}
                            />

                            <InputField
                                label="Author"
                                name="author"
                                value={book.author || ""}
                                onChange={onBookChange}
                                placeholder="Enter author name"
                                icon={UserRound}
                            />

                            <div className="md:col-span-2">
                                <InputField
                                    label="Subtitle"
                                    name="subtitle"
                                    value={book.subtitle || ""}
                                    onChange={onBookChange}
                                    placeholder="Add an optional subtitle"
                                />
                            </div>
                        </div>

                        {/* Character hints */}
                        <div className="mt-5 flex flex-col gap-2 border-t border-white/5 pt-4 text-[11px] text-gray-600 sm:flex-row sm:items-center sm:justify-between">
                            <span>
                                Keep your title clear and memorable.
                            </span>

                            <span>
                                Changes are saved when you save the book.
                            </span>
                        </div>
                    </div>
                </section>

                {/* Cover Image Card */}
                <section
                    className="
            relative overflow-hidden rounded-2xl
            border border-white/10
            bg-[#0d0b14]
            shadow-[0_20px_60px_rgba(0,0,0,0.25)]
          "
                >
                    {/* Ambient glow */}
                    <div className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-fuchsia-600/10 blur-3xl" />

                    {/* Header */}
                    <div className="relative border-b border-white/10 px-5 py-5 sm:px-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-violet-500/20 ring-1 ring-white/10">
                                <ImagePlus className="h-5 w-5 text-fuchsia-400" />
                            </div>

                            <div>
                                <h3 className="font-semibold text-white">
                                    Cover Image
                                </h3>

                                <p className="text-xs text-gray-500">
                                    Give your book a strong visual identity
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Cover Content */}
                    <div className="relative p-5 sm:p-6">
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                            {/* Cover Preview */}
                            <div className="group relative mx-auto shrink-0 sm:mx-0">
                                <div
                                    className="
                    absolute -inset-2 rounded-2xl
                    bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20
                    opacity-0 blur-xl
                    transition-opacity duration-300
                    group-hover:opacity-100
                  "
                                />

                                <div
                                    className="
                    relative overflow-hidden rounded-xl
                    border border-white/10
                    bg-white/[0.03]
                    shadow-2xl shadow-black/30
                  "
                                >
                                    {coverImageUrl ? (
                                        <img
                                            src={coverImageUrl}
                                            alt={`${book.title || "Book"} cover`}
                                            className="
                        h-64 w-48
                        object-cover
                        transition-transform duration-500
                        group-hover:scale-[1.03]
                        sm:h-72 sm:w-52
                      "
                                        />
                                    ) : (
                                        <div
                                            className="
                        flex h-64 w-48 flex-col items-center
                        justify-center gap-3
                        bg-gradient-to-br
                        from-violet-950/40
                        via-[#15111f]
                        to-fuchsia-950/30
                        sm:h-72 sm:w-52
                      "
                                        >
                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5">
                                                <BookOpen className="h-6 w-6 text-gray-600" />
                                            </div>

                                            <span className="text-xs text-gray-600">
                                                No cover yet
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Preview badge */}
                                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-[#15121e] px-3 py-1 text-[10px] font-medium text-gray-400 shadow-lg">
                                    Book Cover
                                </div>
                            </div>

                            {/* Upload Area */}
                            <div className="flex min-w-0 flex-1 flex-col justify-center pt-2 sm:pt-4">
                                <h4 className="text-base font-semibold text-white">
                                    Customize your cover
                                </h4>

                                <p className="mt-2 max-w-lg text-sm leading-6 text-gray-500">
                                    Upload a high-quality image to make your book stand out.
                                    For the best result, use a vertical cover image.
                                </p>

                                {/* Recommendation */}
                                <div className="mt-4 rounded-xl border border-white/5 bg-white/[0.03] p-3">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-500/10">
                                            <ImagePlus className="h-3.5 w-3.5 text-violet-400" />
                                        </div>

                                        <div>
                                            <p className="text-xs font-medium text-gray-300">
                                                Recommended
                                            </p>

                                            <p className="mt-0.5 text-[11px] leading-5 text-gray-600">
                                                600 × 800px · JPG, PNG or WebP
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Hidden input */}
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={onCoverUpload}
                                    className="hidden"
                                    accept="image/*"
                                />

                                {/* Upload Button */}
                                <div className="mt-5">
                                    <Button
                                        variant="secondary"
                                        onClick={() => fileInputRef.current?.click()}
                                        isLoading={isUploading}
                                        icon={UploadCloud}
                                    >
                                        {isUploading ? "Uploading..." : "Upload New Cover"}
                                    </Button>
                                </div>

                                <p className="mt-3 text-[11px] text-gray-600">
                                    Choose an image from your device. Your current cover will be
                                    replaced after upload.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Bottom Tip */}
                <div className="rounded-2xl border border-violet-500/10 bg-violet-500/[0.03] px-5 py-4">
                    <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-500/10">
                            <BookOpen className="h-3.5 w-3.5 text-violet-400" />
                        </div>

                        <div>
                            <p className="text-xs font-semibold text-gray-300">
                                Pro tip
                            </p>

                            <p className="mt-1 text-xs leading-5 text-gray-600">
                                A clear title, recognizable author name, and high-quality
                                cover help create a more professional-looking eBook.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetailsTab;
