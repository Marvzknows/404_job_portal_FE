import UpdateJobPage from "@/components/Employer/JobListing/UpdateJobPage ";
import { use } from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <UpdateJobPage id={id} />;
}
