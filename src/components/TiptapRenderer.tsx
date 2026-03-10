import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import TextAlign from "@tiptap/extension-text-align";
import Blockquote from "@tiptap/extension-blockquote";

const TiptapRenderer = ({ json }: { json: string }) => {
  let parsed: object | null = null;

  try {
    parsed = json ? JSON.parse(json) : null;
  } catch {
    parsed = null;
  }

  const editor = useEditor({
    immediatelyRender: false,
    editable: false,
    extensions: [
      StarterKit,
      Underline,
      Heading.configure({ levels: [1, 2, 3, 4] }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Blockquote,
    ],
    content: parsed ?? "",
    editorProps: {
      attributes: {
        class:
          "min-h-[160px] px-3 py-2 " +
          "[&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-6 [&_ol]:pl-6 " +
          "[&_blockquote]:border-l-2 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 " +
          "[&_h1]:text-4xl [&_h1]:mb-2 " +
          "[&_h2]:text-3xl [&_h2]:mb-2 " +
          "[&_h3]:text-2xl [&_h3]:mb-1 " +
          "[&_h4]:text-xl [&_h4]:mb-1",
      },
    },
  });

  return (
    <div className="tiptap-viewer">
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapRenderer;
