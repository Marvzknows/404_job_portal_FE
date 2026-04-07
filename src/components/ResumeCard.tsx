import { FileText, Trash2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FilesT } from "@/types/files";
import { formatDate } from "@/helpers/helpers";

interface ResumeCardProps {
  resume: FilesT;
  onDelete: (id: string) => void;
  onDownload?: (resume: FilesT) => void;
  isDeleting?: boolean;
}

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const ResumeCard = ({
  resume,
  onDelete,
  onDownload,
  isDeleting,
}: ResumeCardProps) => {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border border-violet-200 bg-violet-50">
      <div className="w-9 h-9 rounded-md bg-violet-600 flex items-center justify-center shrink-0">
        <FileText className="w-4 h-4 text-white" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-800 truncate">
          {resume.file_name}
        </p>
        <p className="text-xs text-slate-400 mt-0.5">
          {formatFileSize(Number(resume.file_size))} · Uploaded{" "}
          {formatDate(resume.created_at)}
        </p>
      </div>

      <Badge className="text-xs bg-violet-100 text-violet-700 border-0">
        Resume
      </Badge>

      <div className="flex items-center gap-1">
        {onDownload && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-slate-400 hover:text-blue-500 hover:bg-blue-50"
            onClick={() => onDownload(resume)}
          >
            <Download className="w-4 h-4" />
          </Button>
        )}

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-50"
          disabled={isDeleting}
          onClick={() => onDelete(resume.id)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ResumeCard;
