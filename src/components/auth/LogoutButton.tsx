import { useLogout } from "@/hooks/useAuth";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LogoutButton = () => {
  const route = useRouter();
  const { mutate: logoutAction, isPending } = useLogout();

  const handleLogout = () => {
    logoutAction(undefined, {
      onSuccess: () => {
        localStorage.clear();
        route.push("/login");
      },
      onError: () => toast.error("Logout failed"),
    });
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
    >
      <LogOut className="w-4 h-4" />
      <span className="text-sm font-medium hidden lg:block">
        {isPending ? "Logging out..." : " Logout"}
      </span>
    </button>
  );
};

export default LogoutButton;
