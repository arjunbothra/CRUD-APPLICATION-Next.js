"use client";

import React, { useEffect, useState } from "react";

const NavBar: React.FC = () => {
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  
  if (!mounted) {
    return null;
  }

  return (
    <div className="navbar fixed top-0 w-full bg-black/40 backdrop-blur-lg shadow-lg z-50">
    <nav className="container mx-auto px-6 py-7 flex items-center justify-between">
      <h1 className="font-montserrat font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 drop-shadow-lg">
        CRUD APP
      </h1>
      <div>
        <p className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 drop-shadow-lg">
          Time: {time}
        </p>
      </div>
    </nav>
  </div>
  
  
  );
};

export default NavBar;
