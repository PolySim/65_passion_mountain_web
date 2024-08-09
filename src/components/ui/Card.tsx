const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="shadow-md rounded-2xl overflow-hidden w-full h-fit bg-white hover:scale-105 transition duration-300 text-center">
      {children}
    </div>
  );
};

export default Card;
