import { useLogout } from "@/hooks/useAuth";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const MobileLogoutButton = () => {
  const router = useRouter();
  const { mutate: logoutAction, isPending } = useLogout();

  const handleLogout = () => {
    logoutAction(undefined, {
      onSuccess: () => {
        localStorage.clear();
        router.push("/login");
      },
      onError: () => toast.error("Logout failed"),
    });
  };

  return (
    <button
      disabled={isPending}
      onClick={handleLogout}
      className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
    >
      <LogOut className="w-5 h-5" />
      Logout
    </button>
  );
};

export default MobileLogoutButton;
