import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import BackButton from "../components/BackButton";

const categories = ["alphabets", "numbers", "colour", "familymembers"];

const Learn = () => {
  const [category, setCategory] = useState("alphabets");
  const [items, setItems] = useState([]);
  const [learned, setLearned] = useState({});

  const getItems = (cat) => {
    switch (cat) {
      case "numbers":
        return "0123456789".split("");

      case "colour":
        return [
          "black",
          "blue",
          "brown",
          "green",
          "orange",
          "pink",
          "purple",
          "red",
          "white",
          "yellow",
        ];

      case "familymembers":
        return [
          "aunty",
          "brother",
          "daughter",
          "father",
          "grandma",
          "grandpa",
          "mom",
          "sister",
          "son",
          "uncle",
        ];

      default:
        return "abcdefghijklmnopqrstuvwxyz".split("");
    }
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("learnedItems")) || {};
    setLearned(stored);
  }, []);

  useEffect(() => {
    setItems(getItems(category));
  }, [category]);

  const markAsLearned = (item) => {
    const updated = { ...learned };

    if (!updated[category]) {
      updated[category] = [];
    }

    if (!updated[category].includes(item)) {
      updated[category].push(item);
    }

    setLearned(updated);
    localStorage.setItem("learnedItems", JSON.stringify(updated));
  };

  const resetCategory = () => {
    if (window.confirm(`Reset all learned signs for ${category}?`)) {
      const updated = { ...learned };
      updated[category] = [];
      setLearned(updated);
      localStorage.setItem("learnedItems", JSON.stringify(updated));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white">
      <Navbar />
      <BackButton />

      <div className="p-8 text-center">
        <h1 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-6">
          Learn Sign Language 📖
        </h1>

        {/* Category Buttons */}
        <div className="flex justify-center flex-wrap gap-4 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-6 py-2 rounded-lg font-semibold capitalize transition-all ${
                category === cat
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300"
              }`}
            >
              {cat === "familymembers"
                ? "Family Members"
                : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Reset Button */}
        <button
          onClick={resetCategory}
          className="mb-8 px-5 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-all"
        >
          🔄 Reset {category === "familymembers" ? "Family" : category}
        </button>

        {/* Items Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 justify-items-center">
          {items.map((item) => (
            <div
              key={item}
              onClick={() => markAsLearned(item)}
              className={`cursor-pointer rounded-xl p-4 bg-white dark:bg-gray-800 shadow-md hover:scale-105 transform transition-all border-4 ${
                learned[category]?.includes(item)
                  ? "border-green-500"
                  : "border-transparent"
              }`}
            >
            <img
              src={`/signs/${category}/${item}.jpeg`}
              alt={item}
              className="h-32 w-32 object-contain mx-auto"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
              <p className="mt-2 font-semibold">
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </p>

              {learned[category]?.includes(item) && (
                <p className="text-green-500 font-medium text-sm">
                  ✔ Learned
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Learn;