import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Share,
  Flag,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Filter,
  Award,
  BarChart2,
  User,
  MessageCircle,
  Clock,
  AlertTriangle,
} from "lucide-react";

const Discussion = () => {
  // States
  const [comments, setComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [filterBy, setFilterBy] = useState("all");
  const [currentArticle, setCurrentArticle] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const perspectiveColors = {
    Economic: {
      bg: "bg-emerald-100",
      text: "text-emerald-800",
      border: "border-emerald-200",
    },
    Political: {
      bg: "bg-blue-100",
      text: "text-blue-800",
      border: "border-blue-200",
    },
    International: {
      bg: "bg-purple-100",
      text: "text-purple-800",
      border: "border-purple-200",
    },
    Scientific: {
      bg: "bg-rose-100",
      text: "text-rose-800",
      border: "border-rose-200",
    },
  };

  // New component: Expert Badge
  const ExpertBadge = ({ badgeType }) => (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-blue-600 to-indigo-500 text-white">
      <Telescope className="w-3.5 h-3.5 mr-1.5" />
      {badgeType.replace(/-/g, " ")}
    </span>
  );

  // Enhanced comment header
  const CommentHeader = ({ comment }) => (
    <div className="flex items-start gap-3 mb-3 group">
      <div className="relative">
        <img
          src={comment.user.avatar}
          alt={comment.user.name}
          className="h-10 w-10 rounded-full ring-2 ring-white group-hover:ring-indigo-200 transition-all"
        />
        {comment.user.verified && (
          <CheckCircle2 className="absolute -bottom-1 -right-1 h-4 w-4 text-blue-500 bg-white rounded-full" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <h4 className="text-sm font-semibold text-gray-900 truncate">
            {comment.user.name}
          </h4>
          {comment.user.badge && <ExpertBadge badgeType={comment.user.badge} />}
        </div>
        <p className="text-xs text-gray-500 flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {formatDate(comment.timestamp)}
        </p>
      </div>
      <span
        className={`${perspectiveColors[comment.perspective].bg} ${
          perspectiveColors[comment.perspective].text
        } px-2.5 py-1 rounded-full text-xs font-medium`}
      >
        {comment.perspective}
      </span>
    </div>
  );

  // Enhanced bias indicator
  const BiasIndicator = ({ score }) => {
    const biasPercentage = Math.abs(score * 100);
    const biasDirection = score > 0 ? "right" : "left";

    // Mock user data
    const currentUser = {
      id: "user123",
      name: "Mayur Shah",
      avatar: "/appple-logo.svg",
      verified: true,
      perspectives: ["Economic", "Political"],
    };
  };

  // Mock article data
  useEffect(() => {
    // Simulate API call to get current article
    const fetchArticle = async () => {
      try {
        // In a real application, this would be an API call
        setTimeout(() => {
          setCurrentArticle({
            id: "article123",
            title: "Global Economic Impact of Recent Climate Policy Changes",
            source: "Economics Today",
            date: "2025-04-12T15:30:00Z",
            perspectives: ["Economic", "Political", "International"],
            bias: {
              score: 0.2, // -1 to 1 scale, 0 is neutral
              label: "Slightly Left-Leaning",
            },
            commentCount: 156,
          });
        }, 300);
      } catch (err) {
        setError("Failed to load article data");
      }
    };

    fetchArticle();
  }, []);

  // Fetch comments
  useEffect(() => {
    // Simulate API call to get comments
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        // In a real application, this would be an API call
        setTimeout(() => {
          const mockComments = [
            {
              id: "comment1",
              user: {
                id: "user456",
                name: "Priya Sharma",
                avatar: "/appple-logo.svg",
                verified: true,
                badge: "economist",
              },
              content:
                "While the article covers the potential economic benefits of these climate policies, it fails to address the short-term costs that developing economies might face during transition periods.",
              timestamp: "2025-04-13T09:15:00Z",
              likes: 42,
              dislikes: 5,
              replies: [
                {
                  id: "reply1",
                  user: {
                    id: "user789",
                    name: "Rajesh Kumar",
                    avatar: "/microsoft-logo.svg",
                    verified: false,
                  },
                  content:
                    "Great point. The article seems to overlook this critical aspect, which could lead to misconceptions about implementation timelines.",
                  timestamp: "2025-04-13T10:30:00Z",
                  likes: 18,
                  dislikes: 2,
                },
              ],
              sentiment: "neutral",
              perspective: "Economic",
            },
            {
              id: "comment2",
              user: {
                id: "user567",
                name: "Arjun Patel",
                avatar: "/instagram-logo.svg",
                verified: true,
                badge: "political-analyst",
              },
              content:
                "This analysis presents an overly optimistic view of international cooperation. Historical patterns suggest that regional interests will likely create implementation gaps in these proposed policies.",
              timestamp: "2025-04-12T22:45:00Z",
              likes: 37,
              dislikes: 12,
              replies: [],
              sentiment: "negative",
              perspective: "International",
            },
            {
              id: "comment3",
              user: {
                id: "user678",
                name: "Kavita Desai",
                avatar: "/facebook-messenger-logo.svg",
                verified: true,
                badge: "climate-expert",
              },
              content:
                "The data presented in the third paragraph actually contradicts the World Climate Council's latest report. Their projections for carbon reduction are significantly more conservative than what's suggested here.",
              timestamp: "2025-04-13T08:20:00Z",
              likes: 56,
              dislikes: 3,
              replies: [],
              sentiment: "factual",
              perspective: "Scientific",
            },
          ];
          setComments(mockComments);
          setFilteredComments(mockComments);
          setIsLoading(false);
        }, 500);
      } catch (err) {
        setError("Failed to load comments");
        setIsLoading(false);
      }
    };

    if (currentArticle) {
      fetchComments();
    }
  }, [currentArticle]);

  // Handle comment submission
  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;

    const newCommentObj = {
      id: `comment${comments.length + 1}`,
      user: currentUser,
      content: newComment,
      timestamp: new Date().toISOString(),
      likes: 0,
      dislikes: 0,
      replies: [],
      sentiment: "neutral",
      perspective: currentUser.perspectives[0],
    };

    setComments([newCommentObj, ...comments]);
    setFilteredComments([newCommentObj, ...filteredComments]);
    setNewComment("");
  };

  // Handle reply submission
  const handleSubmitReply = (commentId) => {
    if (replyText.trim() === "") return;

    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        const newReply = {
          id: `reply${Math.random().toString(36).substr(2, 9)}`,
          user: currentUser,
          content: replyText,
          timestamp: new Date().toISOString(),
          likes: 0,
          dislikes: 0,
        };
        return {
          ...comment,
          replies: [...comment.replies, newReply],
        };
      }
      return comment;
    });

    setComments(updatedComments);
    setFilteredComments(updatedComments);
    setReplyTo(null);
    setReplyText("");
  };

  // Handle sort change
  const handleSortChange = (sortType) => {
    setSortBy(sortType);
    let sorted = [...filteredComments];

    if (sortType === "recent") {
      sorted.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    } else if (sortType === "popular") {
      sorted.sort((a, b) => b.likes - b.dislikes - (a.likes - a.dislikes));
    } else if (sortType === "controversial") {
      sorted.sort((a, b) => b.dislikes - a.dislikes);
    }

    setFilteredComments(sorted);
  };

  // Handle filter change
  const handleFilterChange = (filterType) => {
    setFilterBy(filterType);

    if (filterType === "all") {
      setFilteredComments(comments);
    } else {
      const filtered = comments.filter(
        (comment) =>
          comment.perspective.toLowerCase() === filterType.toLowerCase()
      );
      setFilteredComments(filtered);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Loading state
  if (isLoading || !currentArticle) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </div>
          <div className="ml-3">
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 mt-16">
      {/* Article Info Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {currentArticle.title}
        </h1>
        <div className="flex flex-wrap items-center text-sm text-gray-600 space-x-4 mb-4">
          <span className="flex items-center">
            <span className="font-medium mr-1">Source:</span>{" "}
            {currentArticle.source}
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {formatDate(currentArticle.date)}
          </span>
          <div className="flex items-center">
            <span className="font-medium mr-1">Bias:</span>
            <span
              className={`px-2 py-1 rounded-full text-xs ${
                currentArticle.bias.score < -0.3
                  ? "bg-blue-100 text-blue-800"
                  : currentArticle.bias.score > 0.3
                  ? "bg-red-100 text-red-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {currentArticle.bias.label}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {currentArticle.perspectives.map((perspective) => (
            <span
              key={perspective}
              className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium"
            >
              {perspective}
            </span>
          ))}
        </div>
      </div>

      {/* Discussion Header */}
      <div className="border-b pb-4 mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Discussion ({currentArticle.commentCount})
          </h2>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center text-white hover:text-green-500 transition-colors duration-200 bg-gray-800 rounded-full px-4 py-2"
          >
            <Filter className="text-white mr-1" />
            Filters
            {showFilters ? (
              <ChevronUp className="h-4 w-4 ml-1" />
            ) : (
              <ChevronDown className="h-4 w-4 ml-1" />
            )}
          </button>
        </div>

        {/* Filters and Sorting */}
        {showFilters && (
          <div className="mt-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-200 ease-out">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Sort Section */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Sort By
                  <span className="ml-1 text-indigo-500">•</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "Most Recent", value: "recent", icon: "🕒" },
                    { label: "Most Popular", value: "popular", icon: "🔥" },
                    {
                      label: "Controversial",
                      value: "controversial",
                      icon: "⚡",
                    },
                  ].map(({ label, value, icon }) => (
                    <button
                      key={value}
                      onClick={() => handleSortChange(value)}
                      className={`px-3 py-1.5 rounded-md text-sm border transition-all ${
                        sortBy === value
                          ? "text-white shadow-sm border-transparent"
                          : "text-gray-600 bg-white border-gray-200 hover:border-gray-300"
                      }`}
                      style={{
                        backgroundColor:
                          sortBy === value
                            ? {
                                recent: "#2563eb",
                                popular: "#059669",
                                controversial: "#dc2626",
                              }[value]
                            : "inherit",
                      }}
                    >
                      <span className="mr-1">{icon}</span>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter Section */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Filter Perspectives
                  <span className="ml-1 text-indigo-500">•</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleFilterChange("all")}
                    className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                      filterBy === "all"
                        ? "bg-indigo-600 text-white shadow-sm hover:bg-indigo-700"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    All Perspectives
                  </button>
                  {["Economic", "Political", "International", "Scientific"].map(
                    (perspective) => (
                      <button
                        key={perspective}
                        onClick={() => handleFilterChange(perspective)}
                        className={`px-3 py-1.5 rounded-md text-sm border transition-all ${
                          filterBy === perspective
                            ? "text-white shadow-sm border-transparent"
                            : "text-gray-600 bg-white border-gray-200 hover:border-gray-300"
                        }`}
                        style={{
                          backgroundColor:
                            filterBy === perspective
                              ? {
                                  Economic: "#059669",
                                  Political: "#2563eb",
                                  International: "#9333ea",
                                  Scientific: "#dc2626",
                                }[perspective]
                              : "inherit",
                        }}
                      >
                        {perspective}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Advanced Options (optional) */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <button className="text-sm text-gray-500 hover:text-indigo-600 flex items-center">
                <span className="mr-1">⚙️</span>
                Advanced Filters
                <ChevronRight className="w-4 h-4 ml-1.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Comment Form */}
      <div className="bg-white rounded-lg border p-4 mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-3">
          Join the Discussion
        </h3>
        <form onSubmit={handleSubmitComment}>
          <div className="mb-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your perspective or insights..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              rows="4"
            ></textarea>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Please keep discussions respectful and factual.
            </div>
            <button
              type="submit"
              disabled={newComment.trim() === ""}
              className={`px-4 py-2 rounded-md text-white ${
                newComment.trim() === ""
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              Post Comment
            </button>
          </div>
        </form>
      </div>

      {/* Comments List */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Discussion ({filteredComments.length})
        </h3>

        {filteredComments.length === 0 ? (
          <div className="text-center py-8">
            <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">
              No comments match your current filters.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredComments.map((comment) => (
              <div key={comment.id} className="bg-white rounded-lg border p-4">
                {/* Comment Header */}
                <div className="flex items-start mb-3">
                  <img
                    src={comment.user.avatar}
                    alt={comment.user.name}
                    className="h-10 w-10 rounded-full mr-3"
                  />
                  <div>
                    <div className="flex items-center">
                      <h4 className="font-medium text-gray-900">
                        {comment.user.name}
                      </h4>
                      {comment.user.verified && (
                        <span className="ml-1 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                          Verified
                        </span>
                      )}
                      {comment.user.badge && (
                        <span className="ml-1 bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full flex items-center">
                          <Award className="h-3 w-3 mr-1" />
                          {comment.user.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      {formatDate(comment.timestamp)}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        comment.sentiment === "positive"
                          ? "bg-green-100 text-green-800"
                          : comment.sentiment === "negative"
                          ? "bg-red-100 text-red-800"
                          : comment.sentiment === "factual"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {comment.perspective}
                    </span>
                  </div>
                </div>

                {/* Comment Content */}
                <div className="prose prose-sm max-w-none mb-3">
                  <p>{comment.content}</p>
                </div>

                {/* Comment Actions */}
                <div className="flex items-center space-x-4 text-sm">
                  <button className="flex items-center text-gray-500 hover:text-indigo-600">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    {comment.likes}
                  </button>
                  <button className="flex items-center text-gray-500 hover:text-indigo-600">
                    <ThumbsDown className="h-4 w-4 mr-1" />
                    {comment.dislikes}
                  </button>
                  <button
                    onClick={() =>
                      setReplyTo(replyTo === comment.id ? null : comment.id)
                    }
                    className="flex items-center text-gray-500 hover:text-indigo-600"
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Reply
                  </button>
                  <button className="flex items-center text-gray-500 hover:text-indigo-600">
                    <Share className="h-4 w-4 mr-1" />
                    Share
                  </button>
                  <button className="flex items-center text-gray-500 hover:text-indigo-600">
                    <Flag className="h-4 w-4 mr-1" />
                    Report
                  </button>
                </div>

                {/* Reply Form */}
                {replyTo === comment.id && (
                  <div className="mt-4 pl-4 border-l-2 border-gray-200">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write a reply..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 mb-2"
                      rows="2"
                    ></textarea>
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setReplyTo(null)}
                        className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSubmitReply(comment.id)}
                        disabled={replyText.trim() === ""}
                        className={`px-3 py-1 rounded-md text-sm text-white ${
                          replyText.trim() === ""
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-700"
                        }`}
                      >
                        Post Reply
                      </button>
                    </div>
                  </div>
                )}

                {/* Replies */}
                {comment.replies.length > 0 && (
                  <div className="mt-4 pl-4 border-l-2 border-gray-200 space-y-4">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="pt-3">
                        <div className="flex items-start mb-2">
                          <img
                            src={reply.user.avatar}
                            alt={reply.user.name}
                            className="h-8 w-8 rounded-full mr-2"
                          />
                          <div>
                            <div className="flex items-center">
                              <h5 className="font-medium text-gray-900 text-sm">
                                {reply.user.name}
                              </h5>
                              {reply.user.verified && (
                                <span className="ml-1 bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5 rounded-full">
                                  Verified
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500">
                              {formatDate(reply.timestamp)}
                            </p>
                          </div>
                        </div>
                        <div className="prose prose-sm max-w-none mb-2">
                          <p>{reply.content}</p>
                        </div>
                        <div className="flex items-center space-x-4 text-xs">
                          <button className="flex items-center text-gray-500 hover:text-indigo-600">
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            {reply.likes}
                          </button>
                          <button className="flex items-center text-gray-500 hover:text-indigo-600">
                            <ThumbsDown className="h-3 w-3 mr-1" />
                            {reply.dislikes}
                          </button>
                          <button className="flex items-center text-gray-500 hover:text-indigo-600">
                            <Flag className="h-3 w-3 mr-1" />
                            Report
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {filteredComments.length > 3 && (
          <div className="mt-8 text-center">
            <button className="px-4 py-2 border border-gray-300 rounded-md text-indigo-600 hover:bg-indigo-50 transition-colors">
              Load More Comments
            </button>
          </div>
        )}
      </div>

      {/* Community Guidelines */}
      <div className="mt-12 bg-indigo-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-indigo-800 mb-2">
          Community Guidelines
        </h3>
        <p className="text-sm text-indigo-700 mb-3">
          At NewsMania, we're committed to fostering a respectful environment
          for productive discussions:
        </p>
        <ul className="text-sm text-indigo-700 space-y-1 list-disc pl-5">
          <li>Focus on facts and reasoned arguments.</li>
          <li>Respect diverse perspectives and engage courteously.</li>
          <li>Cite sources when possible to enhance the conversation.</li>
          <li>Avoid personal attacks, hate speech, or offensive language.</li>
          <li>Help us maintain a space for thoughtful, balanced discourse.</li>
        </ul>
      </div>
    </div>
  );
};

export default Discussion;
