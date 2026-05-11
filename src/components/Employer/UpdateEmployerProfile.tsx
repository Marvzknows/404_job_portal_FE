import { ArrowRight, UserCog } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const UpdateEmployerProfile = () => {
  return (
    <div className="bg-white rounded-xl border p-10 flex flex-col items-center justify-center text-center space-y-5 min-h-80">
      <div className="bg-violet-50 rounded-full p-4">
        <UserCog className="w-8 h-8 text-violet-500" />
      </div>
      <div className="space-y-2 max-w-sm">
        <h3 className="text-lg font-semibold text-gray-900">
          Complete Your Employer Profile First
        </h3>
        <p className="text-sm text-gray-500">
          You need to set up your employer profile before you can post a job
          listing. This helps candidates learn more about your company.
        </p>
      </div>
      <Button asChild className="bg-violet-600 hover:bg-violet-700 gap-2 mt-2">
        <Link href="/employer/profile">
          Update Profile
          <ArrowRight className="w-4 h-4" />
        </Link>
      </Button>
    </div>
  );
};

export default UpdateEmployerProfile;
