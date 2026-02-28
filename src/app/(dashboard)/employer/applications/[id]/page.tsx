import ViewApplicationPage from "@/components/Employer/JobApplication/ViewApplicationPage";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <ViewApplicationPage id={id} />;
};

export default Page;
