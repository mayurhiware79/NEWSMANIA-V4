import React, { useState, useEffect } from "react";
import { fetchNews } from "./newsApi";
import { generatePerspectives, generateSummary } from "./geminiApi";
import {
  Search,
  Clock,
  ChevronDown,
  ChevronUp,
  X,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const NewsHomepage = () => {
  const [activeNav, setActiveNav] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [summary, setSummary] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const categories = [
    "Trending",
    "Politics",
    "Technology",
    "Climate",
    "Health",
    "Economy",
    "Sports",
    "Entertainment",
  ];

  useEffect(() => {
    loadNews("Trending");
  }, []);

  const loadNews = async (query) => {
    try {
      setIsLoading(true);
      const data = await fetchNews(query);
      if (data.length === 0) {
        setError(`No articles found for "${query}".`);
        setArticles([]);
      } else {
        setArticles(data);
        setError("");
      }
    } catch (err) {
      setError("Failed to load news. Please try again later.");
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavClick = (category) => {
    setActiveNav(category.toLowerCase());
    loadNews(category);
  };

  const handleSearch = async (e) => {
    e?.preventDefault();
    if (!searchQuery.trim() || isLoading) return;

    try {
      setIsLoading(true);
      const data = await fetchNews(searchQuery);
      if (data.length === 0) {
        setError(`No articles found for "${searchQuery}".`);
        setArticles([]);
      } else {
        setArticles(data);
        setError("");
      }
    } catch (err) {
      setError("Failed to load news. Please try again later.");
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handleGenerateSummary = async (article) => {
    try {
      setIsGenerating(true);
      setSelectedArticle(article);
      setSummary("Generating summary...");

      const summaryText = await generateSummary(article);
      if (summaryText.startsWith("Unable to generate")) {
        setError(summaryText);
        setSummary("");
      } else {
        setSummary(summaryText);
      }
    } catch (error) {
      console.error("Error generating summary:", error);
      setError("Failed to generate summary. Please try again.");
      setSummary("");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGeneratePerspective = async (article) => {
    try {
      console.log("Generating perspectives...");
      const perspectives = await generatePerspectives(article);
      console.log("Perspectives:", perspectives);
    } catch (error) {
      console.error("Error generating perspectives:", error);
    }
  };

  const searchVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    hover: { scale: 1.02 },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-r from-blue-900 to-indigo-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Stay Informed with
            <span className="text-blue-300"> 360° News</span>
          </h1>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Unbiased reporting from multiple credible sources. Discover the full
            story behind every headline.
          </p>

          {/* Enhanced Search */}
          <motion.div
            initial="initial"
            animate="animate"
            className="relative max-w-2xl mx-auto mt-8"
          >
            <motion.form
              onSubmit={handleSearch}
              className="flex shadow-lg rounded-full bg-white"
              variants={searchVariants}
              whileHover="hover"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search news, topics, or articles..."
                className="w-full py-4 px-8 rounded-full focus:outline-none text-lg text-gray-800 placeholder-gray-400 flex-grow"
              />

              <motion.button
                type="submit"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className={`bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-4 rounded-full m-1 flex items-center transition-all ${
                  isLoading
                    ? "opacity-75 cursor-not-allowed"
                    : "hover:bg-blue-700"
                }`}
                disabled={isLoading}
                style={{ borderRadius: "999px" }}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin mr-2 h-5 w-5 border-t-2 border-white rounded-full"></div>
                    Searching...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Search className="mr-2" size={16} />
                    Search
                  </div>
                )}
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </section>

      {/* Category Navigation */}
      <div className=" top-16 z-20 bg-gradient-to-r from-blue-900 to-indigo-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto py-3 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleNavClick(category)}
                className={`px-6 py-3 mx-2 whitespace-nowrap text-sm font-bold rounded-full transition-transform transform hover:scale-105 shadow-md ${
                  activeNav === category.toLowerCase()
                    ? "bg-white text-blue-600"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          {error && (
            <div className="text-center py-12">
              <div className="text-2xl text-red-500 mb-4">🚨 {error}</div>
              <button
                onClick={() => loadNews("Trending")}
                className="text-blue-600 hover:underline"
              >
                Try reloading with trending news
              </button>
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <motion.div
                  key={index}
                  className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col"
                >
                  <img
                    src={article.urlToImage || "/placeholder.jpeg"}
                    alt={article.title}
                    className="w-full h-56 object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder.jpeg";
                    }}
                  />

                  <div className="p-6 flex-grow flex flex-col relative z-20">
                    <div className="flex items-center mb-4">
                      <span className="inline-block bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                        {article.source?.name || "Unknown Source"}
                      </span>
                      <span className="ml-2 text-sm text-gray-500 flex items-center">
                        <Clock size={14} className="mr-1" />
                        {formatDate(article.publishedAt)}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">
                      {article.title || "No Title Available"}
                    </h3>

                    <p className="text-gray-600 line-clamp-3 mb-4 flex-grow">
                      {article.description || "No description available."}
                    </p>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleGenerateSummary(article);
                          handleGeneratePerspective(article);
                        }}
                        className={`w-full px-4 py-2 rounded-lg flex items-center justify-center ${
                          isGenerating && selectedArticle === article
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                        } text-white transition-colors`}
                        disabled={isGenerating && selectedArticle === article}
                      >
                        <Sparkles className="mr-2" size={16} />
                        {isGenerating && selectedArticle === article
                          ? "Generating..."
                          : "Generate AI Summary"}
                      </button>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                      >
                        Read Full Story
                      </a>
                    </div>

                    {/* AI Summary Section */}
                    {selectedArticle === article && summary && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <h4 className="text-sm font-semibold text-blue-700 mb-2">
                          AI Summary:
                        </h4>
                        <p className="text-gray-700 text-sm whitespace-pre-line">
                          {summary}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default NewsHomepage;
