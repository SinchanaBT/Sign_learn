import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BackButton from "../components/BackButton";

const Progress = () => {
  const [learnedItems, setLearnedItems] = useState({});

  const categories = {
    alphabets: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
    numbers: "0123456789".split(""),
    colour: [
      "Black",
      "Blue",
      "Brown",
      "Green",
      "Orange",
      "Pink",
      "Purple",
      "Red",
      "White",
      "Yellow",
    ],
    familymembers: [
      "Aunty",
      "Brother",
      "Daughter",
      "Father",
      "Grandma",
      "Grandpa",
      "Mom",
      "Sister",
      "Son",
      "Uncle",
    ],
  };

  const icons = {
    alphabets: "🔠",
    numbers: "🔢",
    colour: "🎨",
    familymembers: "👨‍👩‍👧‍👦",
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("learnedItems")) || {};
    setLearnedItems(stored);
  }, []);

  const getProgress = (cat) => {
    const learned = learnedItems[cat]?.length || 0;
    const total = categories[cat].length;
    const percent = Math.round((learned / total) * 100);
    return { learned, total, percent };
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all progress?")) {
      localStorage.removeItem("learnedItems");
      setLearnedItems({});
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-blue-300 to-pink-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white transition-all">
      <Navbar />
      <BackButton />

      <div className="flex flex-col items-center justify-center px-6 py-12 w-full">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg mb-10 text-center">
          🌟 Your Learning Progress
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 w-full max-w-5xl">
          {Object.keys(categories).map((cat) => {
            const { learned, total, percent } = getProgress(cat);
            const displayName =
              cat === "familymembers"
                ? "Family Members"
                : cat.charAt(0).toUpperCase() + cat.slice(1);

            return (
              <div
                key={cat}
                className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl transform hover:scale-[1.03] transition-all overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-500"></div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    {icons[cat]} {displayName}
                  </h2>
                  <span className="text-xl font-bold text-green-600 dark:text-green-400">
                    {percent}%
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Learned{" "}
                  <span className="font-bold text-green-600 dark:text-green-400">
                    {learned}
                  </span>{" "}
                  out of {total} signs
                </p>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-5 rounded-full overflow-hidden shadow-inner">
                  <div
                    className={`h-5 rounded-full transition-all duration-700 ease-out ${
                      percent < 30
                        ? "bg-red-400"
                        : percent < 60
                        ? "bg-yellow-400"
                        : percent < 90
                        ? "bg-blue-500"
                        : "bg-green-500"
                    }`}
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>

                <p className="text-sm mt-3 italic text-gray-500 dark:text-gray-400">
                  {percent === 100
                    ? "🎉 Perfect! You’ve mastered this section!"
                    : percent > 0
                    ? "Keep going — you're doing amazing 👏"
                    : "Start learning to see your progress grow 🚀"}
                </p>
              </div>
            );
          })}
        </div>

        {/* Reset All Progress */}
        <div className="mt-12">
          <button
            onClick={handleReset}
            className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full shadow-lg transition-all transform hover:scale-105"
          >
            🔄 Reset All Progress
          </button>
        </div>

        {/* Motivation Footer */}
        <div className="mt-16 bg-white/30 dark:bg-gray-700/50 backdrop-blur-lg rounded-3xl p-8 w-full max-w-3xl text-center shadow-2xl border border-white/40">
          <h3 className="text-2xl font-semibold text-indigo-700 dark:text-indigo-300 mb-2">
            💪 Keep Going!
          </h3>
          <p className="text-gray-800 dark:text-gray-200 italic text-lg">
            “Learning sign language is not just about gestures — it’s about
            understanding, empathy, and inclusion.”
          </p>
        </div>
      </div>
    </div>
  );
};

export default Progress;
