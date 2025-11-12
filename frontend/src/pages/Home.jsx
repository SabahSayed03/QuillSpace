import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import { toast } from "react-toastify";

const Home = () => {
  const [posts, setPosts] = useState([]);
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5; // show 10 posts per page

  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts");
      setPosts(res.data);
    } catch (err) {
      toast.error("Failed to fetch posts");
    }
  };

  const deletePost = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await API.delete(`/posts/${id}`);
        toast.success("Post deleted");
        fetchPosts();
      } catch {
        toast.error("Error deleting post");
      }
    }
  };

  const exportCSV = async () => {
    try {
      window.location.href = "http://localhost:5000/api/posts/export/csv";
    } catch {
      toast.error("Failed to export CSV");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Clamp current page when posts change (e.g. after delete)
  const totalPages = Math.max(1, Math.ceil(posts.length / postsPerPage));
  useEffect(() => {
    if (posts.length === 0) {
      setCurrentPage(1);
    } else if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [posts, totalPages, currentPage]);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = posts.slice(indexOfFirst, indexOfLast);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 lg:p-8 transition-all duration-300">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 border-b border-gray-200 dark:border-gray-700 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900 rounded-xl shadow-inner">
              <span className="text-2xl" role="img" aria-label="notes">📝</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-100">
              All Posts
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link
              to="/create"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
              </svg>
              <span>Create Post</span>
            </Link>
            <button
              onClick={exportCSV}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
              <span>Export CSV</span>
            </button>
          </div>
        </div>

      {/* Responsive Table/Card Layout */}
        <div className="max-w-7xl mx-auto">
          {/* Desktop Table View */}
          <div className="hidden md:block">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50">
              <table className="w-full table-auto text-left border-collapse">
                <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">Title</th>
                    <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">Author</th>
                    <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">Created At</th>
                    <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {posts.length > 0 ? (
                    currentPosts.length > 0 ? (
                      currentPosts.map((p) => (
                        <tr
                          key={p.id}
                          className="group hover:bg-indigo-50/50 dark:hover:bg-gray-700/50 transition-all duration-200"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="text-gray-900 dark:text-gray-100 font-medium group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                                {p.title}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-gray-600 dark:text-gray-300">{p.author}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-gray-600 dark:text-gray-300">
                              {new Date(p.created_at).toLocaleString()}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2 opacity-80 group-hover:opacity-100 transition-opacity duration-200">
                              <Link
                                to={`/post/${p.id}`}
                                className="inline-flex items-center px-3 py-1.5 rounded-lg bg-sky-500 text-white hover:bg-sky-600 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                              >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                </svg>
                                Read
                              </Link>
                              <Link
                                to={`/edit/${p.id}`}
                                className="inline-flex items-center px-3 py-1.5 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                              >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                </svg>
                                Edit
                              </Link>
                              <button
                                onClick={() => deletePost(p.id)}
                                className="inline-flex items-center px-3 py-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                              >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                </svg>
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                          <div className="flex flex-col items-center gap-3">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                            </svg>
                            <p className="text-lg font-medium">No posts on this page</p>
                            <p className="text-sm text-gray-400">Try a different page</p>
                          </div>
                        </td>
                      </tr>
                    )
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                      >
                        <div className="flex flex-col items-center gap-3">
                          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                          </svg>
                          <p className="text-lg font-medium">No posts found</p>
                          <p className="text-sm text-gray-400">Create your first post to get started</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile View */}
          <div className="md:hidden grid gap-4 sm:grid-cols-2">
            {posts.length > 0 ? (
              currentPosts.length > 0 ? (
                currentPosts.map((p) => (
                  <div
                    key={p.id}
                    className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                        {p.title}
                      </h3>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                          </svg>
                          {p.author}
                        </div>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                          </svg>
                          {new Date(p.created_at).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 flex gap-2">
                      <Link
                        to={`/post/${p.id}`}
                        className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600 transition-all duration-200 shadow hover:shadow-md"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                        </svg>
                        Read
                      </Link>
                      <Link
                        to={`/edit/${p.id}`}
                        className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition-all duration-200 shadow hover:shadow-md"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                        Edit
                      </Link>
                      <button
                        onClick={() => deletePost(p.id)}
                        className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all duration-200 shadow hover:shadow-md"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-xl p-8 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                    </svg>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100">No posts on this page</h3>
                    <p className="text-gray-500 dark:text-gray-400">Try a different page</p>
                  </div>
                </div>
              )
            ) : (
              <div className="col-span-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-xl p-8 text-center">
                <div className="flex flex-col items-center gap-3">
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                  </svg>
                  <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100">No posts found</h3>
                  <p className="text-gray-500 dark:text-gray-400">Create your first post to get started</p>
                </div>
              </div>
            )}
          </div>

          {/* Pagination controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-sm font-medium ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300 dark:hover:bg-gray-600'}`}
            >
              Previous
            </button>
            <div className="text-sm text-gray-600 dark:text-gray-300">Page {currentPage} of {totalPages}</div>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-sm font-medium ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300 dark:hover:bg-gray-600'}`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
