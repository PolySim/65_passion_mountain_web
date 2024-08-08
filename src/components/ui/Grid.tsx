const Grid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid gap-8 md:gap-12 grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto w-full">
      {children}
    </div>
  );
};

export default Grid;
