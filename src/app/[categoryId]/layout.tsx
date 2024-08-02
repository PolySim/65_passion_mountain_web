export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-1 bg-yellow-light py-16 px-4 md:px-8">
      {children}
    </main>
  );
}
