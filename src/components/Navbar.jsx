import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

function Navbar() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <nav className="bg-blue-600 text-white flex justify-between items-center px-6 py-3 shadow-md">
      <h1 className="text-2xl font-bold">SignLearn</h1>

      <div className="flex items-center space-x-4">
        <Link to="/" className="hover:text-yellow-300">
          Home
        </Link>
        <Link to="/learn" className="hover:text-yellow-300">
          Learn
        </Link>
        <Link to="/progress" className="hover:text-yellow-300">
          Progress
        </Link>
        <Link to="/quiz" className="hover:text-yellow-300">
          Quiz
        </Link>
        <Link to="/about" className="hover:text-yellow-300">
          About
        </Link>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-white text-blue-600 font-semibold px-3 py-1 rounded-lg hover:opacity-80 transition"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        <button
          onClick={handleReset}
          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
        >
          Reset
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
