export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="border-2 border-red-500">
      <div className="border border-green-500 p-2 rounded">STATISTICS CARD</div>
      {children}
    </div>
  );
}
