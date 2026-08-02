import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

function Home() {
  const [darkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const quotes = [
    "Every sign you learn is one step closer to connection. 🤟",
    "Keep learning, keep signing — progress begins with practice!",
    "Your hands have a voice — let them speak! ✋",
    "Learning sign language breaks barriers, not hearts. ❤️",
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  const cards = [
    { title: "Learn", color: "from-blue-500 to-blue-700", link: "/learn", emoji: "📘" },
    { title: "Progress", color: "from-green-500 to-emerald-600", link: "/progress", emoji: "📈" },
    { title: "Quiz", color: "from-purple-500 to-pink-500", link: "/quiz", emoji: "🧠" },
    { title: "About", color: "from-orange-400 to-red-500", link: "/about", emoji: "ℹ️" },
  ];

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <Navbar />

      <main className="flex flex-col items-center justify-center mt-14 text-center">
        <h2 className="text-4xl font-extrabold mb-10 text-blue-600 dark:text-blue-400 tracking-wide">
          Welcome to SignLearn 👋
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {cards.map((card, i) => (
            <Link
              key={i}
              to={card.link}
              className={`flex flex-col items-center justify-center bg-gradient-to-r ${card.color} text-white w-48 h-48 rounded-2xl shadow-xl font-semibold text-lg transform hover:scale-105 transition duration-300`}
            >
              <span className="text-4xl mb-2">{card.emoji}</span>
              {card.title}
            </Link>
          ))}
        </div>

        <div
          className={`mt-16 w-11/12 sm:w-2/3 text-center p-6 rounded-2xl shadow-lg transition ${
            darkMode
              ? "bg-gradient-to-r from-gray-800 to-gray-700 text-gray-200"
              : "bg-gradient-to-r from-yellow-100 via-white to-pink-100 text-gray-800"
          }`}
        >
          <h3 className="text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500">
            🌟 Motivational Board
          </h3>
          <p className="text-lg italic font-medium">{randomQuote}</p>
        </div>

        <footer className="mt-14 text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} <b>SignLearn</b> | Empowering Communication Through Signs 🤟
        </footer>
      </main>
    </div>
  );
}

export default Home;
