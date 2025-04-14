const API_KEY = "import.meta.env.NEWS_API_KEY";
const BASE_URL = "https://newsapi.org/v2/everything?q=";

export const fetchNews = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}${encodeURIComponent(query)}&apiKey=${API_KEY}`
    );

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    if (!data.articles || data.articles.length === 0) return [];

    return data.articles.filter(
      (article) => article.urlToImage && article.title && article.description
    );
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};

// ed7b24b1b6624297bd2835652a553e1c
