import ViewJobPostedPage from "@/components/JobSeeker/JobListing/ViewJobPostedPage";
import PageHeader from "@/components/PageHeader";

const ViewJobPostingPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        headerTitle="View Job"
        subHeaderTitle="View job details here"
      />

      <ViewJobPostedPage id={id} />
    </div>
  );
};

export default ViewJobPostingPage;
