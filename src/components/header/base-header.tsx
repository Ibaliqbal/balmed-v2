const BaseHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <header className="w-full sticky top-0 z-[60] bg-black/55 backdrop-blur-md">
      {children}
    </header>
  );
};

export default BaseHeader;
