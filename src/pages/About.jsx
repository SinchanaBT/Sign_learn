import Navbar from "../components/Navbar";

function About() {
  return (
    <div className="min-h-screen transition-all duration-500 bg-gray-50 dark:bg-gray-900 dark:text-white">
      {/* 🔹 Top Navbar */}
      <Navbar />

      {/* 🌈 Main Content */}
      <div className="flex flex-col items-center justify-center text-center p-8">
        <h1 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 mb-6">
          About SignLearn ✋
        </h1>

        <p className="max-w-3xl text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-8">
          <b>SignLearn</b> is an interactive learning platform designed to help
          users learn <b>Sign Language</b> in a fun and visual way.  
          It enables learners to explore alphabets, numbers, and common signs 
          through images and quizzes — helping bridge communication barriers 
          between hearing and non-hearing individuals.
        </p>

        {/* 💡 Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <div className="p-6 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-700 rounded-2xl shadow-md">
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-2">
              📘 Learn with Ease
            </h3>
            <p className="text-gray-700 dark:text-gray-200 text-sm">
              Access alphabet and number signs visually with structured learning
              sections and mark your progress.
            </p>
          </div>

          <div className="p-6 bg-gradient-to-br from-purple-100 to-pink-200 dark:from-purple-800 dark:to-pink-700 rounded-2xl shadow-md">
            <h3 className="text-xl font-bold text-purple-800 dark:text-pink-300 mb-2">
              🧠 Interactive Quizzes
            </h3>
            <p className="text-gray-700 dark:text-gray-200 text-sm">
              Test your knowledge with engaging quizzes that make sign learning
              more exciting and practical.
            </p>
          </div>

          <div className="p-6 bg-gradient-to-br from-green-100 to-emerald-200 dark:from-green-800 dark:to-emerald-700 rounded-2xl shadow-md">
            <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-2">
              📈 Track Progress
            </h3>
            <p className="text-gray-700 dark:text-gray-200 text-sm">
              Keep track of your learning journey with progress charts and visual stats.
            </p>
          </div>
        </div>

        {/* 💬 Developer Info */}
        <div className="mt-12 bg-gradient-to-r from-yellow-100 via-white to-pink-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-2xl shadow-lg p-6 w-11/12 sm:w-3/4">
          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500 mb-3">
            💻 Developer’s Note
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
            This project was developed  by<b> SINCHANA BT</b> as part of the <b>Mobile Application Development (MAD)</b> course.  
            The goal is to make sign language learning accessible and enjoyable for everyone.  
            <br />
            <br />
            <b>Technologies Used:</b> React, TailwindCSS, Chart.js, React Router.
          </p>
        </div>

        {/* 🪄 Footer */}
        <footer className="mt-12 text-gray-600 dark:text-gray-400 text-sm">
          © {new Date().getFullYear()} <b>SignLearn</b> | Built with ❤️ for inclusive communication 🤟
        </footer>
      </div>
    </div>
  );
}
export default About;
