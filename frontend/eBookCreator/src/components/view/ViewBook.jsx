import { useState } from "react";
import { ChevronLeft, Menu } from "lucide-react";  
import ViewChapterSidebar from "./ViewChapterSidebar";


const ViewBook = ({book}) => {

  const [ selectedChapterIndex, SetSelectedChapterIndex ] = useState(0);
  const [ sidebarOpen, setSidebarOpen ] = useState(false);
  const [ fontSize, setFontSize ] = useState(18);

  const selectedChapter = book.chapters[SetSelectedChapterIndex];

  // Format content with proper paragraphs and styling
  const formatContent = (content) => {
    return content
    .split('\n\n')
    .filter(paragraph => paragraph.trim())
    .map(paragraph => paragraph.trim())
    .map(paragraph => {
      paragraph = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      paragraph =  paragraph.replace(/(?<!\*)\*(?!\*)(.*?)\*(?!\*)/g, '<em>$1</em>');
      return `<p>${paragraph}</p>`;
    })
      .join('');
  };

  

  return (
    <div className="flex h-[calc(100vh-64px)] bg-white text-gray-900">
      <ViewChapterSidebar
        book={book}
        selectedChapterIndex={selectedChapterIndex}
        onSelectedChapter={SetSelectedChapterIndex}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100  rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-semibold text-base ms:text-lg truncate">{book.title}</h1>
              <p className="text-gray-500 text-sm">by {book.author}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Font Size Controls */}
            <div className="flex items-center gap-2 mr-4">
              <button
              onClick={() => setFontSize(Math.max(14, fontSize - 2))}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-sm font-bold"
            >
              A-
            </button>
            <span className="text-sm text-gray-500">{fontSize}px</span>
            <button
              onClick={() => setFontSize(Math.min(24, fontSize + 2))}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-lg font-bold"
            >
              A+
            </button>
          </div>

          </div>
        </header>


      </main>


    </div>
  )
}

export default ViewBook