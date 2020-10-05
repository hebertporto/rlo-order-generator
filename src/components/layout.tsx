import React from "react";

const Layout: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-900">
      <main className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16 bg-white rounded-lg mt-10 shadow-xl">
        {children}
      </main>
    </div>
  );
};

export default Layout;
