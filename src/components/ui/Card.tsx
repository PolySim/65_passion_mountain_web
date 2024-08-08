const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="shadow-md rounded-2xl overflow-hidden w-full h-full bg-white hover:scale-105 transition duration-300">
      {children}
    </div>
  );
};

export default Card;
