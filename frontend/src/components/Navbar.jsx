import React from 'react';

// A simple SVG logo (you can replace later with your own game logo)
const Logo = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 128 128"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M64 0L128 64L64 128L0 64L64 0Z" fill="white" />
    <path d="M64 24L104 64L64 104L24 64L64 24Z" fill="black" />
  </svg>
);

const Navbar = () => {
  const navItems = ["How It Works", "Features", "AI Mentor", "Play Now"];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-sm border-b border-slate-800">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo + Brand */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="text-white font-bold text-xl">DopeNope</span>
          </div>

          {/* Nav Links */}
          <ul className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.replace(/\s+/g, "").toLowerCase()}`}
                  className="text-slate-400 hover:text-white transition-colors duration-300 text-sm font-medium"
                >
                  {item}
                  {item === "AI Mentor" && (
                    <span className="ml-2 text-xs bg-green-400/20 text-green-300 font-bold px-2 py-0.5 rounded-md">
                      New
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Buttons */}
        <div className="flex items-center gap-4">
          <a
            href="#demo"
            className="hidden sm:flex bg-slate-800 text-slate-300 font-medium py-2 px-4 rounded-lg border border-slate-700 items-center gap-2 transition-all duration-300 hover:border-slate-500 hover:text-white text-sm"
          >
            Try Demo
          </a>
          <a
            href="#play"
            className="hidden sm:inline-block bg-white text-slate-900 font-semibold py-2 px-4 rounded-lg transition-all duration-300 hover:bg-slate-200 text-sm"
          >
            Start Game
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
