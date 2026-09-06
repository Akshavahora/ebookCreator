import { Type, Sparkles } from "lucide-react";
import MDEditor, { commands } from "@uiw/react-md-editor";

const SimpleMDEditor = ({ value, onChange, options }) => {
  return (
    <div
      className="
        group relative overflow-hidden
        rounded-2xl
        border border-white/10
        bg-[#0d0b14]
        shadow-[0_20px_60px_rgba(0,0,0,0.35)]
      "
      data-color-mode="dark"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-48 w-48 rounded-full bg-violet-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-fuchsia-600/10 blur-3xl" />

      {/* Header */}
      <div
        className="
          relative flex items-center justify-between
          border-b border-white/10
          bg-white/[0.03]
          px-4 py-3
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex h-8 w-8 items-center justify-center
              rounded-lg
              bg-gradient-to-br from-violet-500 to-fuchsia-500
              shadow-lg shadow-violet-500/20
            "
          >
            <Type className="h-4 w-4 text-white" />
          </div>

          <div>
            <p className="text-sm font-semibold text-white">
              Markdown Editor
            </p>
            <p className="text-[11px] text-gray-500">
              Write and format your chapter
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <Sparkles className="h-3.5 w-3.5 text-violet-400" />
          <span className="text-[11px] font-medium text-gray-500">
            AI-ready writing
          </span>
        </div>
      </div>

      {/* Editor */}
      <div className="relative overflow-hidden">
        <MDEditor
          value={value}
          onChange={onChange}
          height={400}
          preview="live"
          hideMenu={true}
          commands={[
            commands.bold,
            commands.italic,
            commands.strikethrough,
            commands.hr,
            commands.title,
            commands.divider,
            commands.link,
            commands.code,
            commands.image,
            commands.unorderedListCommand,
            commands.orderedListCommand,
            commands.checkedListCommand,
          ]}
          {...options}
        />
      </div>

      {/* Bottom hint */}
      <div
        className="
          flex items-center justify-between
          border-t border-white/10
          bg-white/[0.02]
          px-4 py-2.5
        "
      >
        <span className="text-[11px] text-gray-600">
          Markdown supported
        </span>

        <span className="text-[11px] text-gray-600">
          Write freely — AI can refine it later
        </span>
      </div>
    </div>
  );
};

export default SimpleMDEditor;
