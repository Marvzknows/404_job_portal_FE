import ViewApplicationPage from "@/components/Employer/JobApplication/ViewApplicationPage";
import PageHeader from "@/components/PageHeader";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        headerTitle="Application"
        subHeaderTitle="Manage applicant's application here"
      />
      <ViewApplicationPage id={id} />
    </div>
  );
};

export default Page;
