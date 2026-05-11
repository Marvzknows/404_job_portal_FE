import CreateJobForm from "@/components/Employer/JobListing/CreateJobForm";
import CreateJobHeader from "@/components/Employer/JobListing/CreateJobHeader";

const CreateJobPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <CreateJobHeader />
      <CreateJobForm />
    </div>
  );
};

export default CreateJobPage;
