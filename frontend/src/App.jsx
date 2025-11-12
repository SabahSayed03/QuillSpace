import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import ReadPost from "./pages/ReadPost";

// Navigation items configuration
const NAV_ITEMS = [
  { path: "/", label: "Home" },
  //{ path: "/create", label: "Create Post" },
];

// Navigation component with active state
const Navigation = () => {
  const location = useLocation();
  
  return (
    <nav className="flex items-center gap-6">
      {NAV_ITEMS.map(({ path, label }) => (
        <Link
          key={path}
          to={path}
          className={`text-sm font-medium transition-colors duration-200 ${
            location.pathname === path
              ? "text-indigo-600 dark:text-indigo-400"
              : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
          }`}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Global Header */}
        <header className="sticky top-0 z-30 w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo Section */}
              <div className="flex items-center gap-3">
                <div className="flex items-center">
                  <img 
                    src="/quill.png" 
                    alt="QuillSpace"
                    className="w-8 h-8 object-contain drop-shadow-md rotate-[-15deg]"
                  />
                  <h1 className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
                    QuillSpace
                  </h1>
                </div>
                <div className="hidden sm:block h-6 w-px bg-gray-200 dark:bg-gray-700" />
                <Navigation />
              </div>

             
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/post/:id" element={<ReadPost />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-4 text-center text-sm text-gray-500 dark:text-gray-400">
              Built with React + Vite • {new Date().getFullYear()} QuillSpace
            </div>
          </div>
        </footer>

        {/* Toast Notifications */}
        <ToastContainer 
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </Router>
  );
}

export default App;
