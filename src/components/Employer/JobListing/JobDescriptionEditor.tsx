"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import TextAlign from "@tiptap/extension-text-align";
import Blockquote from "@tiptap/extension-blockquote";

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Heading1 as TypeH1,
  Heading2 as TypeH2,
  Heading3 as TypeH3,
  Heading4 as TypeH4,
} from "lucide-react";

type JobDescriptionEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

const ToolbarButton = ({
  onClick,
  active,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`p-2 rounded-md border transition
      ${
        active
          ? "bg-violet-500 text-white border-violet-500"
          : "bg-white hover:bg-violet-50 border-gray-300"
      }
    `}
  >
    {children}
  </button>
);

const JobDescriptionEditor = ({
  value,
  onChange,
}: JobDescriptionEditorProps) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit, // disable built-in heading
      Underline,
      Heading.configure({ levels: [1, 2, 3, 4] }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Blockquote,
    ],
    content: value ? JSON.parse(value) : "",
    editorProps: {
      attributes: {
        class:
          "min-h-[160px] rounded-b-lg border border-t-0 border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 " +
          "[&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-6 [&_ol]:pl-6 " +
          "[&_blockquote]:border-l-2 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 " +
          "[&_h1]:text-4xl [&_h1]:mb-2 " +
          "[&_h2]:text-3xl [&_h2]:mb-2 " +
          "[&_h3]:text-2xl [&_h3]:mb-1 " +
          "[&_h4]:text-xl [&_h4]:mb-1",
      },
    },
    onUpdate({ editor }) {
      onChange(JSON.stringify(editor.getJSON()));
    },
  });

  if (!editor) return null;

  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">Job Description</label>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 border border-gray-300 rounded-t-lg p-1 bg-gray-50">
        {/* Text Formatting */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
        >
          <Bold className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
        >
          <Italic className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
        >
          <UnderlineIcon className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px bg-gray-300 mx-1" />

        {/* Headings */}
        {[1, 2, 3, 4].map((level) => (
          <ToolbarButton
            key={level}
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHeading({ level: level as 1 | 2 | 3 | 4 })
                .run()
            }
            active={editor.isActive("heading", {
              level: level as 1 | 2 | 3 | 4,
            })}
          >
            {level === 1 ? (
              <TypeH1 className="w-4 h-4" />
            ) : level === 2 ? (
              <TypeH2 className="w-4 h-4" />
            ) : level === 3 ? (
              <TypeH3 className="w-4 h-4" />
            ) : (
              <TypeH4 className="w-4 h-4" />
            )}
          </ToolbarButton>
        ))}

        <div className="w-px bg-gray-300 mx-1" />

        {/* Lists */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
        >
          <List className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
        >
          <ListOrdered className="w-4 h-4" />
        </ToolbarButton>

        <div className="w-px bg-gray-300 mx-1" />

        {/* Alignment */}
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          active={editor.isActive({ textAlign: "left" })}
        >
          <AlignLeft className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          active={editor.isActive({ textAlign: "center" })}
        >
          <AlignCenter className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          active={editor.isActive({ textAlign: "right" })}
        >
          <AlignRight className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          active={editor.isActive({ textAlign: "justify" })}
        >
          <AlignJustify className="w-4 h-4" />
        </ToolbarButton>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default JobDescriptionEditor;
