import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  showCancel?: boolean;
  cancelText?: string;
  onCancel?: () => void;
  showConfirm?: boolean;
  confirmText?: string;
  onConfirm?: () => void;
  confirmVariant?: "default" | "destructive";
};

const AppAlertDialog = ({
  open,
  onOpenChange,
  title,
  description,
  showCancel = true,
  cancelText = "Cancel",
  onCancel,
  showConfirm = true,
  confirmText = "Continue",
  onConfirm,
  confirmVariant = "default",
}: Props) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        className="rounded-2xl border border-violet-100 shadow-lg"
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {showCancel && (
            <AlertDialogCancel
              onClick={onCancel}
              className="rounded-lg border border-gray-200 text-sm"
            >
              {cancelText}
            </AlertDialogCancel>
          )}
          {showConfirm && (
            <AlertDialogAction
              onClick={onConfirm}
              className={
                confirmVariant === "destructive"
                  ? "rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm"
                  : "rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-sm"
              }
            >
              {confirmText}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AppAlertDialog;
