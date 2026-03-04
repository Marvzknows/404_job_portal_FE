import ViewJobApplicationPage from "@/components/JobSeeker/JobApplication/ViewJobApplicationPage";
import PageHeader from "@/components/PageHeader";

const ViewApplicationPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        headerTitle="Application"
        subHeaderTitle="View your application here"
      />

      <ViewJobApplicationPage id={id} />
    </div>
  );
};

export default ViewApplicationPage;
