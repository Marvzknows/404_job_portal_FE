"use client";

import { useState } from "react";
import { KeyRound, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import PasswordInput from "./PasswordInput";
import { useChangePassword, useLogout } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type PasswordField = "current" | "new" | "confirm";

export type PasswordInputProps = {
  id: string;
  label: string;
  name: string;
  //   field: PasswordField;
  placeholder?: string;
  value: string;
  show: boolean;
  onToggleShow: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type ChangePasswordDialogProps = {
  open: boolean;
  onOpenChange: (val: boolean) => void;
};

export default function ChangePasswordDialog({
  open,
  onOpenChange,
}: ChangePasswordDialogProps) {
  const router = useRouter();
  const { mutate: changePasswrodAction, isPending } = useChangePassword();
  const { mutate: logoutAction } = useLogout();

  const [form, setForm] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  const [show, setShow] = useState<Record<PasswordField, boolean>>({
    current: false,
    new: false,
    confirm: false,
  });

  const [error, setError] = useState<string | null>(null);

  const toggleShow = (field: PasswordField) =>
    setShow((prev) => ({ ...prev, [field]: !prev[field] }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!form.current_password) {
      setError("Current password is required.");
      return;
    }

    if (form.new_password.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }

    if (form.new_password !== form.new_password_confirmation) {
      setError("New passwords do not match.");
      return;
    }

    if (form.new_password === form.current_password) {
      setError("New password must be different from your current password.");
      return;
    }

    changePasswrodAction(
      {
        current_password: form.current_password,
        new_password: form.new_password,
        new_password_confirmation: form.new_password_confirmation,
      },
      {
        onSuccess: () => {
          toast.success("Password updated. Logging you out...");

          setTimeout(() => {
            logoutAction(undefined, {
              onSuccess: () => {
                localStorage.clear();
                router.replace("/login");
              },
              onError: () => toast.error("Logout failed"),
            });
          }, 2000);
        },
        onError: (error) => {
          const message =
            error.response?.data?.message || "Updating password failed.";
          setError(message);
        },
      },
    );
  };

  const handleClose = (val: boolean) => {
    if (!val) {
      setForm({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      });
      setError(null);
    }
    onOpenChange(val);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-violet-100 rounded-lg">
              <KeyRound className="w-5 h-5 text-violet-600" />
            </div>
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Change Password
            </DialogTitle>
          </div>
          <DialogDescription className="text-sm text-gray-500">
            Enter your current password and choose a new one.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <PasswordInput
            id="current_password"
            label="Current Password"
            name="current_password"
            // field="current"
            value={form.current_password}
            show={show.current}
            onToggleShow={() => toggleShow("current")}
            onChange={handleChange}
          />
          <PasswordInput
            id="new_password"
            label="New Password"
            name="new_password"
            // field="new"
            placeholder="Min. 8 characters"
            value={form.new_password}
            show={show.new}
            onToggleShow={() => toggleShow("new")}
            onChange={handleChange}
          />
          <PasswordInput
            id="new_password_confirmation"
            label="Confirm New Password"
            name="new_password_confirmation"
            // field="confirm"
            value={form.new_password_confirmation}
            show={show.confirm}
            onToggleShow={() => toggleShow("confirm")}
            onChange={handleChange}
          />

          {error && (
            <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              <X className="w-4 h-4 mt-0.5 shrink-0" />
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-1">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              disabled={isPending}
              onClick={() => handleClose(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="flex-1 bg-violet-600 hover:bg-violet-700 text-white"
            >
              {isPending ? "Saving... " : "Update Password"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
