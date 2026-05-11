type PageHeaderProps = {
  headerTitle: string;
  subHeaderTitle?: string;
  children?: React.ReactNode;
};

const PageHeader = ({
  headerTitle,
  subHeaderTitle,
  children,
}: PageHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl md:text-2xl font-semibold">{headerTitle}</h2>
        <p className="text-muted-foreground text-xs md:text-sm">
          {subHeaderTitle}
        </p>
      </div>

      {children}
    </div>
  );
};

export default PageHeader;
