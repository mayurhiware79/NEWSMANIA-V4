import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Globe, BarChart2, BookOpen, TrendingUp } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [rotatingText, setRotatingText] = useState("diverse perspectives");
  const [isLoading, setIsLoading] = useState(false);

  // Rotating text effect for the headline
  useEffect(() => {
    const phrases = [
      "diverse perspectives",
      "unbiased reporting",
      "balanced viewpoints",
      "comprehensive coverage",
      "global insights",
    ];

    const interval = setInterval(() => {
      const currentIndex = phrases.indexOf(rotatingText);
      const nextIndex = (currentIndex + 1) % phrases.length;
      setRotatingText(phrases[nextIndex]);
    }, 3000);

    return () => clearInterval(interval);
  }, [rotatingText]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate search delay
    setTimeout(() => {
      setIsLoading(false);
      // Here you would typically navigate to search results
      console.log(`Searching for: ${searchQuery}`);
    }, 800);
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 to-indigo-800 text-white">
      {/* Background animations */}
      <motion.div
        className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur-3xl opacity-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-3xl opacity-20"
        animate={{ rotate: -360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      />

      <div className="container mx-auto px-4 py-16 pt-24 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center mb-10"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8"
            variants={itemVariants}
          >
            Discover News With{" "}
            <motion.span
              className="text-yellow-400 inline-block min-w-32 md:min-w-48"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [1, 1, 1],
              }}
              transition={{
                duration: 1.5,
                times: [0, 0.5, 1],
                repeat: Infinity,
                repeatDelay: 1.5,
              }}
            >
              {rotatingText}
            </motion.span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8"
            variants={itemVariants}
          >
            NewsMannia aggregates multiple credible sources to provide you a
            360° view of today's news
          </motion.p>

          {/* Enhanced Search bar with animation */}
          <motion.form
            onSubmit={handleSearchSubmit}
            className="flex items-center max-w-2xl mx-auto bg-white rounded-full overflow-hidden p-2 shadow-lg transform transition-transform duration-300 hover:scale-105"
            variants={itemVariants}
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for news, topics, or articles..."
              className="flex-grow px-4 py-3 focus:outline-none text-gray-800 text-sm md:text-base placeholder-gray-500"
            />
            <button
              type="submit"
              className={`bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-full flex items-center font-semibold transition-all duration-300 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
              style={{ borderRadius: "999px" }} // Ensures the button matches the rounded style of the search box
            >
              {isLoading ? (
                <span className="flex items-center">
                  <div className="animate-spin mr-2 h-5 w-5 border-t-2 border-white rounded-full"></div>
                  Searching...
                </span>
              ) : (
                <span className="flex items-center">
                  <Search className="mr-2" size={16} />
                  Search
                </span>
              )}
            </button>
          </motion.form>
        </motion.div>
        {/* Trending topics */}
        <motion.div
          className="max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="flex items-center justify-center space-x-2 text-sm">
            <TrendingUp size={16} className="text-yellow-400" />
            <span className="font-semibold">Trending:</span>
            <div className="flex flex-wrap justify-center gap-2">
              {["Politics", "Technology", "Climate", "Health", "Economy"].map(
                (topic, index) => (
                  <motion.button
                    key={index}
                    className="px-3 py-1 bg-blue-800 bg-opacity-40 hover:bg-blue-700 rounded-full text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {topic}
                  </motion.button>
                )
              )}
            </div>
          </div>
        </motion.div>
        {/* News preview mockup */}
        <motion.div
          className="max-w-5xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.div
            className="bg-gray-900 bg-opacity-50 rounded-xl p-4 shadow-2xl overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <div className="relative w-full h-64 md:h-80">
              <img
                src="/news_homecard.webp"
                alt="News Preview"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 rounded-lg" />
              <div className="absolute bottom-0 left-0 p-6">
                <div className="flex space-x-2 mb-3">
                  <span className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
                    FEATURED
                  </span>
                  <span className="bg-blue-600 px-2 py-1 rounded text-xs font-bold">
                    CRICKET
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  See multiple perspectives on breaking stories
                </h2>
                <p className="text-gray-300 text-sm md:text-base">
                  Compare viewpoints from sources across the different spectrum
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
        {/* Feature highlights */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          {[
            {
              icon: <Globe size={48} className="text-yellow-300" />,
              title: "Multi-source Aggregation",
              description:
                "News from diverse global sources for a comprehensive understanding",
            },
            {
              icon: <BarChart2 size={48} className="text-yellow-300" />,
              title: "Credibility Rating",
              description: "AI-powered fact-checking and source verification",
            },
            {
              icon: <BookOpen size={48} className="text-yellow-300" />,
              title: "AI Summarization",
              description:
                "Quick insights with smart, balanced article summaries",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-blue-800 bg-opacity-50 rounded-lg p-6 text-center"
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <motion.div
                className="flex justify-center mb-4"
                animate={{
                  rotateY: [0, 360],
                  transition: {
                    delay: index * 0.5,
                    duration: 1,
                    repeat: 0,
                  },
                }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
        {/* Stats counter */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          {[
            { value: "100+", label: "News Sources" },
            { value: "15K+", label: "Daily Articles" },
            { value: "5", label: "Perspectives" },
            { value: "12", label: "Languages" },
          ].map((stat, index) => (
            <motion.div key={index} variants={itemVariants}>
              <motion.div
                className="text-4xl font-bold text-yellow-400"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.1 * index,
                  duration: 0.5,
                }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 bg-gradient-to-r from-blue-800 via-indigo-800 to-purple-800 rounded-lg p-8 shadow-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-center text-2xl font-bold mb-6 text-yellow-400">
            Trusted Sources
          </h2>
          <div className="flex justify-center space-x-8 items-center flex-wrap gap-y-6">
            {[
              "The Hindu",
              "Times of India",
              "BBC",
              "Al Jazeera",
              "Dainik Bhaskar",
            ].map((source, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0.8 }}
                whileHover={{
                  opacity: 1,
                  scale: 1.15,
                  boxShadow: "0 8px 20px rgba(255, 255, 255, 0.3)",
                }}
                className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-full text-sm shadow-md transform transition-transform duration-300"
              >
                {source}
              </motion.div>
            ))}
          </div>
        </motion.div>
        {/* CTA Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Experience news from every angle 📐
          </h2>
          <Link to="/Ai-summary">
            <Button className="px-3 py-1 bg-blue-800 bg-opacity-40 hover:bg-blue-700 rounded-full text-sm">
              Get Started Now 🚀
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
