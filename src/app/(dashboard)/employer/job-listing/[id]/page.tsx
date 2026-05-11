import ViewJobDetails from "@/components/Employer/JobListing/ViewJobDetails";
import PageHeader from "@/components/PageHeader";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        headerTitle="Job Details"
        subHeaderTitle="Manage your job listing here"
      />

      <ViewJobDetails id={id} />
    </div>
  );
};

export default Page;
