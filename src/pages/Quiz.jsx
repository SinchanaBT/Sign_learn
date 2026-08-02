import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BackButton from "../components/BackButton";

const Quiz = () => {
  const categories = ["alphabets", "numbers", "colour", "familymembers"];
  const [category, setCategory] = useState("alphabets");
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [choices, setChoices] = useState([]);
  const [quizEnded, setQuizEnded] = useState(false);
  const [score, setScore] = useState(0);
  const [learnedItems, setLearnedItems] = useState({});
  const [imageSrc, setImageSrc] = useState("");

  // Load learned data from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("learnedItems")) || {};
    setLearnedItems(stored);
  }, []);

  // Shuffle helper function
  const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

  // Load quiz questions
  useEffect(() => {
    const learned = learnedItems[category] || [];
    if (learned.length === 0) {
      setQuestions([]);
      return;
    }

    const selected = shuffle(learned).slice(0, Math.min(5, learned.length));
    setQuestions(selected);
    setAnswers(Array(selected.length).fill(null));
    setCurrentIndex(0);
    setQuizEnded(false);
    setScore(0);
  }, [category, learnedItems]);

  // Load image & options for current question
  useEffect(() => {
    if (questions.length === 0) return;
    const correct = questions[currentIndex];
    const all = learnedItems[category] || [];
    const distractors = shuffle(all.filter((item) => item !== correct)).slice(0, 3);
    setChoices(shuffle([correct, ...distractors]));
    setImageSrc(`/signs/${category}/${correct.toLowerCase()}.jpeg`);
  }, [questions, currentIndex, category, learnedItems]);

  const handleSelect = (option) => {
    const updated = [...answers];
    updated[currentIndex] = option;
    setAnswers(updated);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const finishQuiz = () => {
    const correctAnswers = questions.filter((q, i) => q === answers[i]).length;
    setScore(correctAnswers);
    setQuizEnded(true);
  };

  const restartQuiz = () => {
    setQuizEnded(false);
    setCurrentIndex(0);
    setAnswers(Array(questions.length).fill(null));
    setScore(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-indigo-200 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white transition-all">
      <Navbar />
      <BackButton />

      <div className="flex flex-col items-center justify-center py-10 px-6">
        <h1 className="text-4xl font-extrabold text-indigo-700 dark:text-indigo-400 mb-8 drop-shadow-lg">
          ✋ Sign Language Quiz
        </h1>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2 rounded-lg font-semibold capitalize transition-all ${
                category === cat
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300"
              }`}
            >
              {cat === "familymembers"
                ? "Family Members"
                : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* No learned items */}
        {(!learnedItems[category] || learnedItems[category].length === 0) && (
          <div className="text-center mt-10 text-gray-700 dark:text-gray-300 bg-white/40 dark:bg-gray-700/40 backdrop-blur-md p-6 rounded-2xl shadow-xl">
            <p className="text-lg font-semibold">
              ⚠️ No learned {category} yet!
            </p>
            <p>Go to the Learn page and mark some signs first 😊</p>
          </div>
        )}

        {/* Quiz Section */}
        {questions.length > 0 && !quizEnded && (
          <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-md text-center transform hover:scale-[1.02] transition-all">
            <h2 className="text-lg font-bold mb-4 text-gray-700 dark:text-gray-300">
              Question {currentIndex + 1} / {questions.length}
            </h2>

            <img
              src={imageSrc}
              alt={questions[currentIndex]}
              className="mx-auto h-56 mb-4 rounded-xl object-contain border border-gray-300 dark:border-gray-600 bg-white shadow-md"
              onError={(e) => {
                e.target.src = `/signs/${category}/${questions[currentIndex]}.png`;
              }}
            />

            <p className="text-lg font-semibold mb-4">
              What does this sign represent?
            </p>

            <div className="grid grid-cols-2 gap-3">
              {choices.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  className={`px-4 py-2 rounded-lg font-semibold border-2 transition-all ${
                    answers[currentIndex] === opt
                      ? "bg-indigo-500 text-white border-indigo-600"
                      : "bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg font-semibold transition-all disabled:opacity-50"
              >
                ⬅ Previous
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-all"
              >
                {currentIndex === questions.length - 1 ? "Finish" : "Next ➡"}
              </button>
            </div>
          </div>
        )}

        {/* Result */}
        {quizEnded && (
          <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-lg shadow-2xl rounded-2xl p-10 w-full max-w-lg text-center">
            <h2 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">
              🎉 Quiz Completed!
            </h2>
            <p className="text-xl mb-2">
              You answered <b>{score}</b> out of <b>{questions.length}</b>{" "}
              correctly.
            </p>
            <p className="text-lg mb-6 text-gray-600 dark:text-gray-400">
              {Math.round((score / questions.length) * 100)}% correct answers
            </p>
            <button
              onClick={restartQuiz}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              🔄 Restart Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
